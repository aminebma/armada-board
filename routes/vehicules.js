const express = require('express')
const router = express.Router()
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

router.post('/', async(req, res)=>{
    const text = "INSERT INTO \"Vehicule\"(\"Type\", \"Marque\", \"Modele\", \"Matricule_interne\", \"Matricule_externe\", \"Affectation\") VALUES($1, $2, $3, $4, $5, $6) RETURNING id"
    const values = [req.body.nom, req.body.prenom, req.body.dateNaiss, req.body.adresseResidence, req.body.sexe, req.body.affectation]
    await pool.query(text, values)
        .then(result =>{
            console.log(`New driver added successfully. id: ${result.rows[0].id}`)
            res.send(result.rows[0].id)
        })
        .catch(e => console.error(e.message))
})

module.exports = router