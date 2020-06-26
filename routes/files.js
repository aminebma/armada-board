const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

router.post('/fiche-suivi', async(req,res)=>{
    //TODO Upload d'une fiche de suivi
})

router.post('/fiche-technique', async(req,res)=>{
    //TODO Upload d'une fiche technique
})

router.post('/fiche-controle-couts', async(req,res)=>{
    //TODO Upload d'une fiche de controle des couts
})

router.post('/carnet-de-bord', async(req,res)=>{
    let xml = xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
    const text = "INSERT INTO Fichier(type, contenu) VALUES('Carnet de bord',$1) RETURNING id"
    const values = [xml]
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

router.post('/guide-constructeur', async(req,res)=>{
    //TODO Upload d'un guide constructeur
})

router.get('/fiche-suivi', async(req,res)=>{
    //TODO Download des fiches de suivi
})

router.get('/fiche-technique', async(req,res)=>{
    //TODO Download des fiches technique
})

router.get('/fiche-controle-couts', async(req,res)=>{
    //TODO Download des fiches de controle des couts
})

router.get('/carnet-de-bord', async(req,res)=>{
    //TODO Download d'un carnet de bord
})

router.get('/guide-constructeur', async(req,res)=>{
    //TODO Download des guides constructeur
})

module.exports = router