const express = require('express')
const router = express.Router()
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

router.get('/', async (req, res) => {
    const text = "SELECT * FROM Vehicule"
    await pool.query(text)
        .then(result =>{
            res.send(result.rows)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.post('/', async (req, res) => {
    const text = "INSERT INTO Vehicule(type, marque, modele, matricule_interne, matricule_externe, affectation) VALUES($1, $2, $3, $4, $5, $6) RETURNING id"
    const values = [req.body.type, req.body.marque, req.body.modele, req.body.matricule_interne, req.body.matricule_externe, req.body.affectation]
    await pool.query(text, values)
        .then(result =>{
            console.log(`New vehicule added successfully. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.get('/piece-de-rechange', async (req, res) => {
    const text = "SELECT * FROM PieceRechange"
    await pool.query(text)
        .then(result =>{
            res.send(result.rows)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.post('/piece-de-rechange', async (req, res) => {
    const text = "INSERT INTO PieceRechange(marque, modele, quantite) VALUES($1, $2, $3) RETURNING id"
    const values = [req.body.marque, req.body.modele, req.body.quantite]
    await pool.query(text, values)
        .then(result =>{
            console.log(`New change piece added successfully. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

module.exports = router