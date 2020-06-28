const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

router.post('/fiche-technique', async(req,res)=>{
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
        .then(async ()=> {
            const text = "INSERT INTO Fichier(type, contenu) VALUES('FT',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result => {
                    console.log(`Fiche technique successfully added. id: ${result.rows[0].id}`)
                    res.send(result.rows[0].id)
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

router.post('/fiche-controle-couts', async(req,res)=>{
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
        .then(async ()=> {
            const text = "INSERT INTO Fichier(type, contenu) VALUES('FCC',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result => {
                    console.log(`Fiche de controle des couts successfully added. id: ${result.rows[0].id}`)
                    res.send(result.rows[0].id)
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

router.post('/carnet-de-bord', async(req,res)=>{
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
        .then(async ()=> {
            const text = "INSERT INTO Fichier(type, contenu) VALUES('CB',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result => {
                    console.log(`Carnet de bord successfully added. id: ${result.rows[0].id}`)
                    res.send(result.rows[0].id)
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

router.post('/guide-constructeur', async(req,res)=>{
    let data = await xmlConverter.json2xml(req.body,{compact: true, spaces: '\t'})
        .then(async ()=> {
            const text = "INSERT INTO Fichier(type, contenu) VALUES('GC',$1) RETURNING id"
            const values = [data]
            await pool.query(text, values)
                .then(result => {
                    console.log(`Guide constructeur successfully added. id: ${result.rows[0].id}`)
                    res.send(result.rows[0].id)
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

router.get('/fiche-technique', async(req,res)=>{
    const text = "SELECT * FROM Fichier WHERE type = 'FT'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send('No such file found.')
            const data = xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'})
            res.send(files)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.get('/fiche-controle-couts', async(req,res)=>{
    const text = "SELECT * FROM Fichier WHERE type = 'FCC'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send('No such file found.')
            const data = xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'})
            res.send(files)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.get('/carnet-de-bord', async(req,res)=>{
    const text = "SELECT * FROM Fichier WHERE type = 'CB'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send('No such file found.')
            const data = xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'})
            res.send(data)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.get('/guide-constructeur', async(req,res)=>{
    const text = "SELECT * FROM Fichier WHERE type = 'GC'"
    await pool.query(text)
        .then(files=>{
            if(files.rows.length === 0) return res.status(404).send('No such file found.')
            const data = xmlConverter.xml2json(files.rows[0].contenu,{compact: true, spaces: '\t'})
            res.send(files)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

module.exports = router