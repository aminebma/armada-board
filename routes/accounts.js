const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')
const config = require('config')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()


//This will be used from a manager to sign in. the request body should have both the username and password.
router.post('/sign-in', async(req, res)=>{
    const text = "SELECT * FROM Utilisateur WHERE username=$1"
    const values = [req.body.username]

    await pool.query(text, values)
        .then(async user =>{
            if(user.rows.length === 0) return res.status(400).send(new Error('Invalid username or password.'))

            const validPass =  await bCrypt.compare(req.body.password, user.rows[0].password)
            if(!validPass) return res.status(400).send(new Error('Invalid username or password.'))

            const token = jwt.sign({_id: user.rows[0].id}, config.get('auth.jwtPK'))
            const result = {
                jwtToken: token,
                type: user.rows[0].type,
                affectation: user.rows[0].affectation,
                username: user.rows[0].username,
                nom: user.rows[0].nom,
                prenom: user.rows[0].prenom,
                dateNaiss: user.rows[0].datenaiss,
                sexe: user.rows[0].sexe,
                adresse: user.rows[0].adresse,
                mail: user.rows[0].mail,
                numTel: user.rows[0].numtel
            }
            res.send(result)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

//This will display the contact information of the unity's administrators to contact them for reseting a manager's
//password. The request body should have the username of the manager.
router.get('/reset-password', async(req, res)=>{
    let text = "SELECT nom, prenom, numTel, mail " +
        "FROM (SELECT affectation as userAff FROM Utilisateur WHERE username=$1) as rechAff, Utilisateur as u " +
        "WHERE u.affectation=rechAff.userAff and type=1"
    let values = [req.body.username]

    await pool.query(text, values)
        .then(async admins =>{
            if(admins.rows.length === 0) return res.status(404).send(new Error('No administrator available.'))
            res.send(admins.rows)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

module.exports = router