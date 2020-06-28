const express = require('express')
const router = express.Router()
const xmlConverter = require('xml-js')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

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

router.post('/planning', async(req,res)=>{
    //TODO Generer un planning
})

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