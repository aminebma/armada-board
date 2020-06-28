const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

router.post('/maintenance', async(req,res)=>{
    const text = "INSERT INTO Maintenance(type, contenu) VALUES('FT',$1) RETURNING id"
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

router.get('/planning', async(req,res)=>{
    //TODO Exporter un planning de maintenance
})

router.post('/planning', async(req,res)=>{
    //TODO Generer un planning
})

router.delete('/maintenance', async(req,res)=>{
    //TODO Supprimer une maintenance
})

router.put('/maintenance', async(req,res)=>{
    //TODO Modifier une maintenance
})

module.exports = router