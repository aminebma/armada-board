const express = require('express')
const router = express.Router()
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()


//This will get all vehicules from the database.
router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
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

//This will get all the vehicules of a specified unity from the database. the url should contain the unity id
router.get('/:id', async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const text = "SELECT * FROM Vehicule WHERE affectation=$1"
    const values = [req.params.id]
    await pool.query(text, values)
        .then(result =>{
            res.send(result.rows)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will add a new vehicule to the database. The request body should include the type, brand, model, internal matricule,
//external matricule, and unity id
router.post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
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

module.exports = router