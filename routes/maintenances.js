const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()
const moment = require('moment')
const ref_motor = [
    'Carburant',
    'Refroidissement',
    'Capacité en huile'
]

//This will add a new maintainance to the database. the request body should include the type, level, echelon, start date,
//end date, vehicule id, unity id and the need in this format:
// {
//     "_declaration":{
//     "_attributes":{
//         "version": "1.0",
//             "encoding": "utf-8"
//     }
// },
//     "contenu":{
//     "piece":[
//         {
//             "id": 1,
//             "quantite": 2
//         }
//     ]
// }
// }
router.post('/', async(req,res)=>{
    const besoin = await xmlConverter.json2xml( req.body.besoin, {compact: true, spaces: '\t'})
    const text = "INSERT INTO Maintenance(type, niveau,echelon, date_debut, date_fin, vehicule, affectation, besoin) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id"
    const values = [req.body.type,req.body.niveau, req.body.echelon, req.body.date_debut, req.body.date_fin, req.body.vehicule, req.body.affectation, besoin]
    await pool.query(text, values)
        .then(result=> {
            console.log(`Maintenance successfully added. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will get a planning from the database that will be between a date range and for a specific unity. The request body
//should include the start date, end date and unity's id
router.get('/planning', async(req,res)=>{
    const text = "SELECT * FROM Maintenance WHERE affectation=$1 and date_debut>=$2 and date_fin<=$3"
    const values = [req.body.affectation, req.body.date_debut, req.body.date_fin]
    await pool.query(text, values)
        .then(async planning => {
            if(planning.rows.length === 0) return res.status(404).send(new Error('Empty planning.'))
            for(let [index, maintenance] of planning.rows.entries()){
                if(maintenance.besoin) {
                    planning.rows[index].besoin = await xmlConverter.xml2json(maintenance.besoin, {compact: true, spaces: '\t'})
                    console.log(planning.rows[index].besoin)
                }
            }
            res.send(planning.rows)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will generate a new planning
router.post('/planning', async(req,res)=>{
    let planning = []
    let text = "SELECT distinct on (m.type) m.type, m.date_debut as date, v.id as id_vehicule, v.type as type_vehicule, v.marque, v.modele\n" +
        "FROM Maintenance as m\n" +
        "JOIN Vehicule as v ON v.id=m.vehicule\n" +
        "WHERE v.matricule_interne=$1 and m.affectation=$2\n" +
        "ORDER BY m.type, m.date_debut DESC"
    let values = [req.body.matricule_interne, req.body.affectation]

    //Retrieving all maintainances
    await pool.query(text, values)
        .then(async maintenances => {
            text =`SELECT xpath('/contenu', contenu) as fichier, type FROM Fichier
            WHERE xpath_exists('/contenu[type="${maintenances.rows[0].type_vehicule}" 
            and marque="${maintenances.rows[0].marque}" and modele="${maintenances.rows[0].modele}"]', contenu) 
            AND type IN ('FT', 'GC')`

            //Retrieving the Fiche Technique and Guide Constructeur related to the vehicule
            await pool.query(text)
                .then(async files => {
                    //Converting the files to JSON format
                    let jsonFiles = []
                    for(file of files.rows){
                        file.fichier = file.fichier.replace(/[{}"]/g, '')
                        jsonFiles.push(await JSON.parse(xmlConverter.xml2json(file.fichier, {compact: true, spaces: '\t'})))
                    }

                    //Retrieving the needed motor info from Fiche Technique
                    const motorInfo = await jsonFiles[0].contenu.donnee
                        .filter(ligne => ligne.categorie._text === 'Moteur' && ref_motor.includes(ligne.sous_categorie._text))
                    const sorties = req.body.carnet_de_bord.contenu.sortie

                    //Checking for the next oil appointment
                    if(motorInfo[0].type._text === 'Essence'){
                        //Average distance per day in kilometers
                        let avgKm = 0.0
                        for(let sortie of sorties)
                            avgKm += (sortie.compteur_fin - sortie.compteur_debut)
                        let nbDays = (moment(sorties[sorties.length-1].date).diff(moment(sorties[0].date), 'days'))
                        avgKm/=((nbDays===0) ? 1 : nbDays)
                        //Calculating the remaining distance before the next checkup
                        const remKm= 10000-(sorties[sorties.length-1].compteur_fin % 10000)
                        const nextAppointment = moment().add(Math.floor(remKm/avgKm),'days')
                        //If there is no oil appointment coming
                        if(moment(maintenances.rows.filter(maintenance => maintenance.type === 'Vidange')[0].date).isBefore(nextAppointment)){
                            text = "SELECT date_fin as date FROM Maintenance WHERE date_debut::text like $1 ORDER BY date_fin DESC LIMIT(1)"
                            values = [nextAppointment.format('YYYY-MM-DD')+'%']
                            //Checking for the next free appointment date
                            await pool.query(text, values)
                                .then(async dates => {
                                    //If there is no appointment that day
                                    if(dates.rows.length ===0)
                                        nextAppointment.set({'hour':8, 'minutes':0, 'seconds':0})
                                    else {
                                        if(moment(dates.rows[0].date).hour() === 17) {
                                            //Avoiding week ends (Friday and Saturday)
                                            nextAppointment.add(1*(2*nextAppointment.day()/5), 'day')
                                            nextAppointment.set({'hour': 8, 'minutes':0, 'seconds': 0})
                                        }
                                        else
                                            nextAppointment.set({'hour': moment(dates.rows[0].date).hour() + 1, 'minutes': 0, 'seconds': 0})
                                    }
                                    //Getting the needed level and echelon
                                    text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Vidange'"
                                    await pool.query(text)
                                        .then(async reference => {
                                            let besoin = {
                                                "_declaration":{
                                                    "_attributes":{
                                                        "version": "1.0",
                                                        "encoding": "utf-8"
                                                    }
                                                },
                                                "contenu":{
                                                    "piece":[
                                                        {
                                                            "modele":"Huile",
                                                            "quantite": parseInt(motorInfo[2].mesure._text)
                                                        }
                                                    ]
                                                }
                                            }
                                            besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                            const appointment = {
                                                type: "Vidange",
                                                niveau: reference.rows[0].niveau,
                                                echelon: reference.rows[0].echelon,
                                                date_debut: nextAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                                date_fin: nextAppointment.hour(nextAppointment.hour()+1).format('YYYY-MM-DD HH:mm:ss'),
                                                vehicule: maintenances.rows[0].id_vehicule,
                                                besoin: besoin
                                            }
                                            planning.push(appointment)
                                        })
                                        .catch(e => {
                                            console.error(e.message)
                                            res.send(e.message)
                                        })
                                })
                                .catch(e => {
                                    console.error(e.message)
                                    res.send(e.message)
                                })
                        }
                    }
                    console.log(motorInfo)
                    res.send({ Message: 'Done'})
                })
                .catch(e => {
                    console.error(e.message)
                    res.send(e.message)
                })
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will delete a maintainance from the database. The request body should include the maintainance id
router.delete('/', async(req,res)=>{
    const text = "DELETE FROM Maintenance WHERE id=$1"
    const values = [req.body.id]
    await pool.query(text, values)
        .then(()=>{
            console.log(`Maintenance deleted successfully. id: ${req.body.id}`)
            res.send({ Message: 'Maintainance deleted successfully.'})
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will update a maintainance to the database. the request body should include the id, and the new infos: type,
// level, echelon, start date, end date, vehicule id, unity id and the need in this format:
// {
//     "_declaration":{
//     "_attributes":{
//         "version": "1.0",
//             "encoding": "utf-8"
//     }
// },
//     "contenu":{
//     "piece":[
//         {
//             "id": 1,
//             "quantite": 2
//         }
//     ]
// }
// }
router.put('/', async(req,res)=>{
    const besoin = await xmlConverter.json2xml( req.body.besoin, {compact: true, spaces: '\t'})
    const text = "UPDATE Maintenance SET type=$2, niveau=$3, echelon=$4, date_debut=$5, date_fin=$6, vehicule=$7, affectation=$8, besoin=$9 WHERE id=$1"
    const values = [req.body.id, req.body.type,req.body.niveau, req.body.echelon, req.body.date_debut, req.body.date_fin, req.body.vehicule, req.body.affectation, besoin]
    await pool.query(text, values)
        .then(()=>{
            console.log(`Maintenance updated successfully. id: ${req.body.id}`)
            res.send({ Message: 'Maintainance updated successfully'})
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

module.exports = router