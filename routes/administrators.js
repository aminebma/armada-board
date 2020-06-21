const express = require('express')
const router = express.Router()
const configIndex = require('../config/index')
const bCrypt = require('bcrypt')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})

router.post('/chauffeurs', async(req,res)=>{
    const text = "INSERT INTO \"Chauffeur\"(\"Nom\", \"Prenom\", \"DateNaiss\", \"Adresse\", \"Sexe\", \"Affectation\") VALUES($1, $2, $3, $4, $5, $6) RETURNING id"
    const values = [req.body.nom, req.body.prenom, req.body.dateNaiss, req.body.adresseResidence, req.body.sexe, req.body.affectation]

    await pool.connect().then(
        pool.query(text, values).then(result =>{
            console.log(`New driver added successfully. id: ${result.rows[0].id}`)
            pool.end()
            res.send(result.rows[0].id)
        }).catch(e => {
            console.error(e.message)
            pool.end()
        })
    ).catch(err => console.log(new Error(err.message)))
})

router.post('/users', async(req,res)=>{
    const salt = await bCrypt.genSalt(10)
    const pass = await bCrypt.hash(req.body.password,salt)

    const text = "INSERT INTO \"Utilisateur\"(\"Type\", \"Username\", \"Password\", \"Nom\", \"Prenom\", \"DateNaiss\", \"Adresse\", \"Sexe\", \"Affectation\") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id"
    const values = [req.body.type, req.body.username, pass, req.body.nom, req.body.prenom, req.body.dateNaiss, req.body.adresseResidence, req.body.sexe, req.body.affectation]

    pool.connect().then(
        pool.query(text, values).then(result =>{
            console.log(`New user added successfully. id: ${result.rows[0].id}`)
            pool.end()
            res.send(result.rows[0].id)
        }).catch(e => {
            console.error(e.message)
            pool.end()
        })
    ).catch(err => console.log(new Error(err.message)))
})

router.delete('/users', async(req,res)=>{

    const text = "DELETE FROM Utilisateur WHERE \"id\"=$1"
    const values = [req.body.id]

    pool.connect().then(
        pool.query(text, values).then(() =>{
            console.log(`UserId: ${req.body.id} deleted successfully`)
            pool.end()
            res.send()
        }).catch(e => {
            console.error(e.message)
            pool.end()
        })
    ).catch(err => console.log(new Error(err.message)))
})

module.exports = router