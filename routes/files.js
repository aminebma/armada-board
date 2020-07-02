const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

//This will add a new Fiche Technique to the database in the xml format. The req body should be in this format:
//{
//     "_declaration":{
//         "_attributes":{
//             "version": "1.0",
//             "encoding": "utf-8"
//         }
//      "contenu":{
//          //your data here
//      }
//}
router.post('/fiche-technique', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
    const text = "INSERT INTO Fichier(type, contenu) VALUES('FT',$1) RETURNING id"
    const values = [data]
    await pool.query(text, values)
        .then(result=>{
            console.log(`Fiche technique successfully added. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will add a new Fiche de Controle des Couts to the database in the xml format. The req body should be in this format:
//{
//     "_declaration":{
//         "_attributes":{
//             "version": "1.0",
//             "encoding": "utf-8"
//         }
//      "contenu":{
//          //your data here
//      }
//}
router.post('/fiche-controle-couts', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
    const text = "INSERT INTO Fichier(type, contenu) VALUES('FCC',$1) RETURNING id"
    const values = [data]
    await pool.query(text, values)
        .then(result=>{
            console.log(`Fiche de controle des couts successfully added. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will add a new Carnet de Bord to the database in the xml format. The req body should be in this format:
//{
//     "_declaration":{
//         "_attributes":{
//             "version": "1.0",
//             "encoding": "utf-8"
//         }
//      "contenu":{
//          //your data here
//      }
//}
router.post('/carnet-de-bord', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
    const text = "INSERT INTO Fichier(type, contenu) VALUES('CB',$1) RETURNING id"
    const values = [data]
    await pool.query(text, values)
        .then(result=>{
            console.log(`Carnet de bord successfully added. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will add a new Guide Constructeur to the database in the xml format. The req body should be in this format:
//{
//     "_declaration":{
//         "_attributes":{
//             "version": "1.0",
//             "encoding": "utf-8"
//         }
//      "contenu":{
//          //your data here
//      }
//}
router.post('/guide-constructeur', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
    const text = "INSERT INTO Fichier(type, contenu) VALUES('GC',$1) RETURNING id"
    const values = [data]
    await pool.query(text, values)
        .then(result=>{
            console.log(`Guide constructeur successfully added. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will get all Fiches Techniques from the database
router.get('/fiche-technique', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const text = "SELECT * FROM Fichier WHERE type = 'FT'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send(new Error('No such file found.'))
            const data = JSON.parse(xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'}))
            res.send(data)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will get all Fiches de Controle des Couts from the database
router.get('/fiche-controle-couts', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const text = "SELECT * FROM Fichier WHERE type = 'FCC'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send(new Error('No such file found.'))
            const data = JSON.parse(xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'}))
            res.send(data)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will get all Carnets de Bord from the database
router.get('/carnet-de-bord', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const text = "SELECT * FROM Fichier WHERE type = 'CB'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send(new Error('No such file found.'))
            const data = JSON.parse(xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'}))
            res.send(data)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will get all Guides Constructeur from the database
router.get('/guide-constructeur', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const text = "SELECT * FROM Fichier WHERE type = 'GC'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send(new Error('No such file found.'))
            const data = JSON.parse(xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'}))
            res.send(data)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

const excelToJson = require('convert-excel-to-json')

readCarnetDeBord()
function readCarnetDeBord() {
    let result = {
        "_declaration": {
            "_attributes": {
                "version": "1.0",
                "encoding": "utf-8"
            }
        }
    }
    let data = excelToJson({
        sourceFile: 'lib/files/Carnet_de_bord.xlsx',
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
}

module.exports = router