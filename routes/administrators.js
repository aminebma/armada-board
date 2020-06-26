const express = require('express')
const router = express.Router()
const configIndex = require('../config/index')
const bCrypt = require('bcrypt')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

router.post('/chauffeurs', async (req,res) => {
    let text = "SELECT id FROM Chauffeur WHERE nom =$1 and prenom =$2 and dateNaiss=$3"
    let values = [req.body.nom, req.body.prenom, req.body.dateNaiss]
    await pool.query(text,values)
        .then(async chauffeur=>{
            if(!chauffeur.rows.length ==== 0) return res.status(400).send('Driver already registered.')
            text = "INSERT INTO Chauffeur(nom, prenom, dateNaiss, adresse, sexe, affectation) VALUES($1, $2, $3, $4, $5, $6) RETURNING id"
            values = [req.body.nom, req.body.prenom, req.body.dateNaiss, req.body.adresseResidence, req.body.sexe, req.body.affectation]
            await pool.query(text, values)
                .then(result =>{
                    console.log(`New driver added successfully. id: ${result.rows[0].id}`)
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

router.post('/users', async (req,res) => {
    let text = "SELECT id FROM Utilisateur WHERE username =$1"
    let values = [req.body.username]
    await pool.query(text,values)
        .then(async user=>{
            if(!user.rows.length === 0) return res.status(400).send('User already registered')
            const salt = await bCrypt.genSalt(10)
            const pass = await bCrypt.hash(req.body.password,salt)

            text = "INSERT INTO Utilisateur(type, username, password, nom, prenom, dateNaiss, adresse, numTel, mail, sexe, affectation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id"
            values = [req.body.type, req.body.username, pass, req.body.nom, req.body.prenom, req.body.dateNaiss, req.body.adresseResidence, req.body.numTel, req.body.mail, req.body.sexe, req.body.affectation]
            await pool.query(text, values)
                .then(result => {
                    console.log(`New user added successfully. id: ${result.rows[0].id}`)
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

router.delete('/users', async (req,res) => {

    const text = "DELETE FROM Utilisateur WHERE id=$1"
    const values = [req.body.id]
    await pool.query(text, values)
        .then(() =>{
            console.log(`UserId: ${req.body.id} deleted successfully`)
            res.send()
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.put('/users/reset-password', async(req,res)=>{
    let text = "SELECT id, password FROM Utilisateur WHERE username=$1"
    let values = [req.body.username]
    await pool.query(text, values)
        .then(async user =>{
            const validPass =  await bCrypt.compare(req.body.password, user.rows[0].password)
            if(!validPass) return res.status(400).send('Invalid password.')

            const salt = await bCrypt.genSalt(10)
            const pass = await bCrypt.hash(req.body.password,salt)

            text = "UPDATE Utilisateur SET password=$1 WHERE id=$2"
            values = [pass, user.id]
            await pool.query(text,values)
                .then(()=>{
                    res.send('Password changed successfuly.')
                })
                .catch(e =>{
                    console.error(e.message)
                    res.send(e.message)
                })
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.put('/users', async(req,res)=>{
    //TODO Modifier un utilisateur
})

module.exports = router