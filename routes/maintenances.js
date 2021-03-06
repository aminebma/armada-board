const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const xlsx = require('xlsx')
const moment = require('moment')
const configIndex = require('../config/index')
const Maintenance = require('../modules/Maintenance')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()
const fs = require('fs')
const excelToJson = require('convert-excel-to-json')
const multer = require('multer')

//Configuring multer for file upload
const storageManager = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './lib/files')
    },
    filename: function(req, file, callback){
        callback(null,file.originalname)
    }
})

const fileUpload =multer({
    storage: storageManager
})

const motorInfo = [],
    brakesInfo = [],
    gearInfo = [],
    clutchInfo = [],
    suspensionInfo = [],
    tiresInfo = [],
    weightInfo = [],
    diversInfo = [],
    refMotor = [
    'Courroie',
    'Vidange',
    'Capacité en huile',
    'Huile moteur'
],
    refBrakes = [
    'Frein de service',
    'Frein à parcage',
    'Frein de secours',
    'Liquide',
    'Plaquettes'
],
    refGear = [
    'Vidange',
    'Capacité en huile'
],
    refClutch = [
    'Kit'
],
    refSuspension = [
    'Amortisseur'
],
    refTires = [
    'Dimensions',
    'Changement Pneu'
],
    refWeight = [
        'Poids Total Autorisé en charge du tracteur (PTAC)'
    ],
    refDivers = [
        'Ampoules'
    ]
const references = [
    {
        name: "Moteur",
        ref: refMotor,
        info: motorInfo
    },
    {
        name: "Freins",
        ref: refBrakes,
        info: brakesInfo
    },
    {
        name: "Boite à vitesses",
        ref: refGear,
        info: gearInfo
    },
    {
        name: "Embrayage",
        ref: refClutch,
        info: clutchInfo
    },
    {
        name: "Suspension",
        ref: refSuspension,
        info: suspensionInfo
    },
    {
        name: "Pneumatique",
        ref: refTires,
        info: tiresInfo
    },
    {
        name: "Poids",
        ref: refWeight,
        info: weightInfo
    },
    {
        name: "Divers",
        ref: refDivers,
        info: diversInfo
    }
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
    const text = "INSERT INTO Maintenance(type, niveau, echelon, date_debut, date_fin, vehicule, affectation, besoin)" +
        " VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id"
    const values = [
        req.body.title,
        req.body.niveau,
        req.body.echelon,
        req.body.startDate,
        req.body.endDate,
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
router.post('/planning/export', async(req,res)=>{
    const text = "SELECT id, type as title, niveau, echelon, date_debut as \"startDate\", date_fin as \"endDate\", vehicule, affectation," +
        "besoin FROM Maintenance WHERE affectation=$1 and date_debut>=$2 and date_fin<=$3 and niveau=ANY($4::int[])"
    const values = [
        req.body.affectation,
        req.body.date_debut,
        req.body.date_fin,
        req.body.niveau
    ]
    await pool.query(text, values)
        .then(async planning => {
            if(planning.rows.length === 0) return res.status(404).send(new Error('Empty planning.'))
            for(let [index, maintenance] of planning.rows.entries()){
                if(maintenance.besoin) {
                    planning.rows[index].besoin = await JSON.parse(xmlConverter.xml2json(maintenance.besoin, {compact: true, spaces: '\t'}))
                }
            }
            const columns = []
            for(row in planning.rows){
                columns.push(planning.rows[row])
            }

            const newWB = xlsx.utils.book_new()
            const newWS = xlsx.utils.json_to_sheet(columns)

            xlsx.utils.book_append_sheet(newWB,newWS,"Planning de maintenances")
            xlsx.writeFile(newWB,"Planning.xlsx")

            const buf = xlsx.write(newWB, {type:'buffer', bookType: "xlsx"})
            res.setHeader('Content-type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            res.send(buf)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will get a planning from the database. The request body
//should include the unity's id
router.get('/planning/all/:id', async(req,res)=>{
    const text = "SELECT m.id, m.type as title, m.niveau, m.echelon, m.date_debut as \"startDate\", m.date_fin as \"endDate\", v.matricule_interne as vehicule, m.affectation," +
        "m.besoin FROM Maintenance as m JOIN Vehicule as v ON m.vehicule = v.id WHERE m.affectation=$1"
    const values = [
      req.params.id
    ]
    await pool.query(text,values)
        .then(async planning => {
            if(planning.rows.length === 0) return res.status(404).send(new Error('Empty planning.'))
            for(let [index, maintenance] of planning.rows.entries()){
                if(maintenance.besoin) {
                    planning.rows[index].besoin = await JSON.parse(xmlConverter.xml2json(maintenance.besoin, {compact: true, spaces: '\t'}))
                }
            }
            res.send(planning.rows)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will generate a new planning. The request body should include the Carnet de Bord Excel file in a file attribute
//of a FormData body
router.post('/planning', fileUpload.single('file'),async(req,res)=>{
    await readCarnetDeBord(req.file.path)
        .then(async carnetDeBord => {
            let text = "SELECT distinct on (m.type) m.type, m.affectation, m.date_debut as date, v.id as id_vehicule, v.type as type_vehicule, v.marque, v.modele\n" +
                "FROM Maintenance as m\n" +
                "JOIN Vehicule as v ON v.id=m.vehicule\n" +
                "WHERE v.matricule_interne=$1 and m.affectation=$2\n" +
                "ORDER BY m.type, m.date_debut DESC"
            let values = [
                carnetDeBord.contenu.sortie[0].matricule_interne,
                carnetDeBord.contenu.sortie[0].affectation
            ]

            //Retrieving all maintainances
            await pool.query(text, values)
                .then(async maintenances => {
                    text =`SELECT xpath('/contenu', contenu) as fichier, type 
                    FROM Fichier
                    WHERE xpath_exists('/contenu[type="${carnetDeBord.contenu.sortie[0].type}" 
                    and marque="${carnetDeBord.contenu.sortie[0].marque}" and modele="${carnetDeBord.contenu.sortie[0].modele}"]', contenu) 
                    AND type IN ('FT', 'GC')
                    ORDER BY type ASC`

                    //Retrieving the Fiche Technique and Guide Constructeur related to the vehicule
                    await pool.query(text)
                        .then(async files => {
                            //Converting the files to JSON format
                            let jsonFiles = []
                            for(file of files.rows){
                                file.fichier = file.fichier.replace(/[{}"]/g, '')
                                jsonFiles.push(await JSON.parse(xmlConverter.xml2json(file.fichier, {compact: true, spaces: '\t'})))
                            }

                            //Retrieving the needed vehicule info from Fiche Technique and Guide Constructeur
                            let fileData
                            for(jsonFile of jsonFiles){
                                for(reference of references){
                                    fileData = await jsonFile.contenu.donnee
                                        .filter(ligne =>
                                            ligne.categorie._text === reference.name
                                            && reference.ref.includes(ligne.sous_categorie._text))
                                    fileData.forEach(data => reference.info.push(data))
                                }
                            }

                            const sorties = carnetDeBord.contenu.sortie

                            //Average distance per day in kilometers
                            let avgKm = 0.0
                            for (let sortie of sorties)
                                avgKm += (sortie.compteur_fin - sortie.compteur_debut)
                            let nbDays = (moment(sorties[sorties.length - 1].date).diff(moment(sorties[0].date), 'days'))
                            avgKm /= ((nbDays === 0) ? 1 : nbDays)

                            const vehiculeInfo = {}
                            if(maintenances.rows.length === 0 ){
                                text = "SELECT id FROM Vehicule WHERE matricule_interne = $1"
                                values = [carnetDeBord.contenu.sortie[0].matricule_interne]
                                await pool.query(text,values)
                                    .then(async idVehicule => vehiculeInfo.id_vehicule = idVehicule.rows[0].id)
                                    .catch(e => {
                                        console.error(e.message)
                                        return res.send(e.message)
                                    })
                            } else vehiculeInfo.id_vehicule = maintenances.rows[0].id_vehicule
                            vehiculeInfo.affectation = carnetDeBord.contenu.sortie[0].affectation

                            //Checking for the next oil appointment
                            const motorAppointments = await Maintenance.generateMotorAppointments(sorties, avgKm, maintenances, motorInfo, vehiculeInfo)
                            const brakesAppointments = await Maintenance.generateBrakesAppointments(sorties, avgKm, maintenances, brakesInfo, vehiculeInfo)
                            const gearAppointment = await Maintenance.generateGearAppointment(sorties, avgKm, maintenances, gearInfo, vehiculeInfo)
                            const clutchAppointment = await Maintenance.generateClutchAppointment(sorties, avgKm, maintenances, clutchInfo, vehiculeInfo)
                            const suspensionAppointment = await Maintenance.generateSuspensionAppointment(sorties, avgKm, maintenances, suspensionInfo, vehiculeInfo)
                            const tiresAppointment = await Maintenance.generateTiresAppointment(sorties, avgKm, maintenances, tiresInfo, vehiculeInfo)
                            const parallelismAppointment = await Maintenance.generateParallelismAppointment(maintenances, weightInfo, vehiculeInfo)
                            const diversAppointment = await Maintenance.generateDiversAppointment(maintenances, diversInfo, vehiculeInfo)

                            text = `SELECT unnest(xpath('//sortie[position()=1]/date/text()', contenu))::text as date
                            FROM Fichier
                            WHERE type='CB' and xpath_exists('//sortie[matricule_interne=${carnetDeBord.contenu.sortie[0].matricule_interne}]', contenu)`

                            //Getting the latest Carnet de Bord to avoid adding it again if it exists
                            await pool.query(text)
                                .then(async latestCB => {
                                    if(latestCB.rows.length!=0 && moment(latestCB.rows[0].date).isSame(carnetDeBord.contenu.sortie[0].date))
                                        console.error('Carnet de bord already registered.')
                                    else {
                                        let xmlFile = await xmlConverter.json2xml(carnetDeBord, {compact: true, spaces: '\t'})
                                        text = "INSERT INTO Fichier(type, contenu) VALUES('CB',$1) RETURNING id"
                                        values = [xmlFile]
                                        await pool.query(text, values)
                                            .then(async result => {
                                                console.log(`Carnet de bord successfully added. id: ${result.rows[0].id}`)
                                            })
                                            .catch(e => {
                                                console.error(e.message)
                                                return res.send(e.message)
                                            })
                                    }
                                    //Inserting generated appointments to the database
                                    Promise.all([
                                        motorAppointments,
                                        brakesAppointments,
                                        gearAppointment,
                                        clutchAppointment,
                                        suspensionAppointment,
                                        tiresAppointment,
                                        parallelismAppointment,
                                        diversAppointment
                                    ])
                                        .then(async result => {
                                            text = "INSERT INTO Maintenance(type, niveau, echelon, date_debut, date_fin, vehicule," +
                                                "affectation,besoin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id"
                                            for (let [resultIndex, appointments] of result.entries()) {
                                                for (let [appointmentIndex, appointment] of appointments.appointments.entries()) {
                                                    values = [
                                                        appointment.title,
                                                        appointment.niveau,
                                                        appointment.echelon,
                                                        appointment.startDate,
                                                        appointment.endDate,
                                                        appointment.vehicule,
                                                        appointment.affectation,
                                                        appointment.besoin
                                                    ]
                                                    await pool.query(text, values)
                                                        .then(newAppointment => {
                                                            console.log(`New appointment added successfully. id: ${newAppointment.rows[0].id}`)
                                                            result[resultIndex].appointments[appointmentIndex].id = newAppointment.rows[0].id
                                                        })
                                                        .catch(e => {
                                                            console.error(e.message)
                                                            return res.send(e.message)
                                                        })
                                                }
                                            }
                                            res.send(result)
                                        })
                                        .catch(e => {
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
                            return res.send(e.message)
                        })
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
        req.body.title,
        req.body.niveau,
        req.body.echelon,
        req.body.startDate,
        req.body.endDate,
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

//This will get all the maintainance references
router.get('/info', async (req, res)=>{
    const text = "SELECT * FROM Ref_maintenance"
    await pool.query(text)
        .then(references => {
            if(references.rows.length === 0) return res.status(404).send(new Error('No reference found.'))
            res.send(references.rows)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will add a maintainance reference to the database. The request body should include the type, level and echelon of
//the new reference
router.post('/info', async (req, res)=>{
    let text = "SELECT * FROM Ref_maintenance WHERE type=$1"
    let values = [
        req.body.type
    ]
    await pool.query(text, values)
        .then(async result => {
            if(result.rows.length!=0) return res.status(400).send(new Error('Reference already registered.'))
            text = "INSERT INTO Ref_maintenance(type, niveau, echelon) VALUES($1,$2,$3) RETURNING id"
            values = [
                req.body.type,
                req.body.niveau,
                req.body.echelon
            ]
            await pool.query(text, values)
                .then(result => {
                    console.log(`New reference added successfully. id: ${result.rows[0].id}`)
                    res.send({Message: 'Success'})
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

//This will delete a reference from the database. The request body should include the id of the reference to delete
router.delete('/info', async(req,res)=>{
    const text = "DELETE FROM Ref_maintenance WHERE id=$1"
    const values = [
        req.body.id
    ]
    await pool.query(text, values)
        .then(()=>{
            console.log(`Reference successfully deleted. id: ${req.body.id}`)
            res.send({ Message: 'Reference successfully deleted.'})
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will update a reference in the database. The request body should include the new type, level and echelon
router.put('/info', async (req, res)=>{
    const text = "UPDATE Ref_maintenance SET type=$1, niveau=$2, echelon=$3"
    const values = [
        req.body.type,
        req.body.niveau,
        req.body.echelon
    ]
    await pool.query(text, values)
        .then(()=>{
            console.log(`Reference successfully updated. id: ${req.body.id}`)
            res.send({ Message: 'Reference successfully updated.'})
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

async function readCarnetDeBord(url) {
    return new Promise(async (resolve, reject)=>{
        let result = {
            "_declaration": {
                "_attributes": {
                    "version": "1.0",
                    "encoding": "utf-8"
                }
            }
        }
        let data
        try{
            data =excelToJson({
                sourceFile: url,
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'date',
                    B: 'affectation',
                    C: 'matricule_interne',
                    D: 'type',
                    E: 'marque',
                    F: 'modele',
                    G: 'description',
                    H: 'chauffeur',
                    I: 'autorisation',
                    J: 'compteur_debut',
                    K: 'compteur_fin'
                }
            })
            result.contenu = {}
            result.contenu.sortie = data['Carnet de bord']
            console.log(result)
            console.log(result.contenu)
            fs.unlink(`${url}`, function (err) {
                if (err) throw err
                console.log(`File ${url} deleted!`)
            })
            resolve(result)
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = router