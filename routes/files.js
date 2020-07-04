const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const multer = require('multer')
const fs = require('fs')
const excelToJson = require('convert-excel-to-json')
//Configuring multer for file upload
const storageManager = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './lib/files')
    },
    filename: function(req, file, callback){
        callback(null,file.originalname)
    }
})

const fileUpload = multer({
    storage: storageManager
})

const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

//This will add a new Fiche Technique to the database in the xml format. The req body should include the Excel file of
//a Fiche technique in a file attribute
router.post('/fiche-technique', fileUpload.single('file'),async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    await readFicheTechnique(req.file.path)
        .then(async ficheTechnique => {
            let data = await xmlConverter.json2xml(ficheTechnique,{compact: true, spaces: '\t'})
            const text = "INSERT INTO Fichier(type, contenu) VALUES('FT',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result=>{
                    console.log(`Fiche technique added successfully added. id: ${result.rows[0].id}`)
                    fs.unlink(`${req.file.path}`, function (err) {
                        if (err) throw err
                        console.log(`File ${req.file.path} deleted!`)
                    })
                    res.send(result.rows[0].id)
                })
                .catch(e => {
                    console.error(e.message)
                    res.send(e.message)
                })
        })
})

//This will add a new Fiche de Controle des Couts to the database in the xml format. The req body should include the
//Excel file of a Fiche de Controle des couts in a file attribute
router.post('/fiche-controle-couts', fileUpload.single('file') ,async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    await readFicheControleCouts(req.file.path)
        .then(async ficheControleCouts => {
            let data = await xmlConverter.json2xml(ficheControleCouts,{compact: true, spaces: '\t'})
            const text = "INSERT INTO Fichier(type, contenu) VALUES('FCC',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result=>{
                    console.log(`Fiche de controle des couts added successfully added. id: ${result.rows[0].id}`)
                    fs.unlink(`${req.file.path}`, function (err) {
                        if (err) throw err
                        console.log(`File ${req.file.path} deleted!`)
                    })
                    res.send(result.rows[0].id)
                })
                .catch(e => {
                    console.error(e.message)
                    res.send(e.message)
                })
        })
})

//This will add a new Carnet de Bord to the database in the xml format. The req body should include the
//Excel file of a Carnet de bord in a file attribute
router.post('/carnet-de-bord', fileUpload.single('file') ,async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    await readCarnetDeBord(req.file.path)
        .then(async carnetDeBord => {
            let data = await xmlConverter.json2xml(carnetDeBord,{compact: true, spaces: '\t'})
            const text = "INSERT INTO Fichier(type, contenu) VALUES('CB',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result=>{
                    console.log(`Carnet de bord successfully added. id: ${result.rows[0].id}`)
                    fs.unlink(`${req.file.path}`, function (err) {
                        if (err) throw err
                        console.log(`File ${req.file.path} deleted!`)
                    })
                    res.send(result.rows[0].id)
                })
                .catch(e => {
                    console.error(e.message)
                    res.send(e.message)
                })
        })
})

//This will add a new Guide Constructeur to the database in the xml format. The req body should include the
//Excel file of a Guide constructeur in a file attribute
router.post('/guide-constructeur', fileUpload.single('file') ,async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    await readGuideConstructeur(req.file.path)
        .then(async guideConstructeur => {
            let data = await xmlConverter.json2xml(guideConstructeur,{compact: true, spaces: '\t'})
            const text = "INSERT INTO Fichier(type, contenu) VALUES('GC',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result=>{
                    console.log(`Guide constructeur added successfully added. id: ${result.rows[0].id}`)
                    fs.unlink(`${req.file.path}`, function (err) {
                        if (err) throw err
                        console.log(`File ${req.file.path} deleted!`)
                    })
                    res.send(result.rows[0].id)
                })
                .catch(e => {
                    console.error(e.message)
                    res.send(e.message)
                })
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

async function readCarnetDeBord(url) {
    return new Promise(async (resolve, reject)=>{
        try {
            let result = {
                "_declaration": {
                    "_attributes": {
                        "version": "1.0",
                        "encoding": "utf-8"
                    }
                }
            }
            let data = excelToJson({
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
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

async function readFicheControleCouts(url) {
    return new Promise(async (resolve, reject)=>{
        try {
            let result = {
                "_declaration": {
                    "_attributes": {
                        "version": "1.0",
                        "encoding": "utf-8"
                    }
                }
            }
            let data = excelToJson({
                sourceFile: url,
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'date',
                    B: 'numero_note',
                    C: 'affectation',
                    D: 'type',
                    E: 'marque',
                    F: 'modele',
                    G: 'compteur_debut',
                    H: 'compteur_fin',
                    I: 'description',
                    J: 'quantite_carburant',
                    K: 'cout_carburant',
                    L: 'cout_consommables',
                    M: 'autres_couts'
                }
            })
            result.contenu = {}
            result.contenu.sortie = data['Fiche de controle des couts']
            console.log(result)
            console.log(result.contenu)
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

async function readFicheTechnique(url){
    return new Promise(async (resolve, reject)=>{
        try {
            let result = {
                "_declaration": {
                    "_attributes": {
                        "version": "1.0",
                        "encoding": "utf-8"
                    }
                }
            }
            let data = excelToJson({
                sourceFile: url,
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'categorie',
                    B: 'sous_categorie',
                    C: 'type',
                    D: 'label',
                    E: 'mesure',
                    F: 'informations'
                }
            })
            result.contenu = {}
            result.contenu.sortie = data['Fiche technique']
            console.log(result)
            console.log(result.contenu)
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

async function readGuideConstructeur(url){
    return new Promise(async (resolve, reject)=>{
        try {
            let result = {
                "_declaration": {
                    "_attributes": {
                        "version": "1.0",
                        "encoding": "utf-8"
                    }
                }
            }
            let data = excelToJson({
                sourceFile: url,
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'categorie',
                    B: 'piece',
                    C: 'consignes',
                }
            })
            result.contenu = {}
            result.contenu.sortie = data['Guide constructeur']
            console.log(result)
            console.log(result.contenu)
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = router