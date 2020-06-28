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
    const besoin = await xmlConverter.json2xml( req.body.besoin, {compact: true, spaces: '\t'})
        .then(async ()=>{
            const text = "INSERT INTO Maintenance(type, niveau,echelon, date_debut, date_fin, vehicule, besoin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id"
            const values = [req.body.type,req.body.niveau, req.body.echelon, req.body.date_debut, req.body.date_fin, req.body.vehicule, besoin]
            await pool.query(text, values)
                .then(result=>{
                    console.log(`Maintenance successfully added. id: ${result.rows[0].id}`)
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

router.get('/planning', async(req,res)=>{
    const text = "SELECT * FROM Maintenance WHERE "
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