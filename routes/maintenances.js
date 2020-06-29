const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
const moment = require('moment')
pool.connect()
const ref_motor = [
    'Carburant',
    'Refroidissement',
    'Capacité en huile'
]

const Maintenance = require('../modules/Maintenance')

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
    const text = "INSERT INTO Maintenance(type, niveau, echelon, date_debut, date_fin, vehicule, affectation, besoin)" +
        " VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id"
    const values = [
        req.body.type,
        req.body.niveau,
        req.body.echelon,
        req.body.date_debut,
        req.body.date_fin,
        req.body.vehicule,
        req.body.affectation,
        besoin
    ]
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
    const values = [
        req.body.affectation,
        req.body.date_debut,
        req.body.date_fin
    ]
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
    let text = "SELECT distinct on (m.type) m.type, m.affectation, m.date_debut as date, v.id as id_vehicule, v.type as type_vehicule, v.marque, v.modele\n" +
        "FROM Maintenance as m\n" +
        "JOIN Vehicule as v ON v.id=m.vehicule\n" +
        "WHERE v.matricule_interne=$1 and m.affectation=$2\n" +
        "ORDER BY m.type, m.date_debut DESC"
    let values = [
        req.body.matricule_interne,
        req.body.affectation
    ]

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
                    const oilAppointment = await Maintenance.generateOilAppointment(sorties, maintenances, motorInfo)
                    Promise.all([oilAppointment])
                        .then(async result=>{
                            text = "INSERT INTO Maintenance(type, niveau, echelon, date_debut, date_fin, vehicule," +
                                "affectation,besoin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id"
                            for(let [index, maintenance] of result.entries()){
                                values = [
                                    maintenance.type,
                                    maintenance.niveau,
                                    maintenance.echelon,
                                    maintenance.date_debut,
                                    maintenance.date_fin,
                                    maintenance.vehicule,
                                    maintenance.affectation,
                                    maintenance.besoin
                                ]
                                await pool.query(text, values)
                                    .then(newMaintenance => result[index].id = newMaintenance.rows[0].id)
                                    .catch(e => {
                                        console.error(e.message)
                                        return res.send(e.message)
                                    })
                            }
                            res.send(result)
                        })
                        .catch(e=> {
                            console.error(e.message)
                            return res.send(e.message)
                        })
                })
                .catch(e => {
                    console.error(e.message)
                    return res.send(e.message)
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
    const values = [
        req.body.id
    ]
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
    const text = "UPDATE Maintenance SET type=$2, niveau=$3, echelon=$4, date_debut=$5, date_fin=$6, vehicule=$7, " +
        "affectation=$8, besoin=$9 WHERE id=$1"
    const values = [
        req.body.id,
        req.body.type,
        req.body.niveau,
        req.body.echelon,
        req.body.date_debut,
        req.body.date_fin,
        req.body.vehicule,
        req.body.affectation,
        besoin
    ]
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