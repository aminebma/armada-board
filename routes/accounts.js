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

router.post('/sign-in', async(req, res)=>{

    const text = "SELECT * FROM Utilisateur WHERE username=$1"
    const values = [req.body.username]
    await pool.query(text, values)
        .then(async user =>{
            if(user.rows.length === 0) return res.status(400).send('Invalid username or password')

            const validPass =  await bCrypt.compare(req.body.password, user.rows[0].password)
            if(!validPass) return res.status(400).send('Invalid username or password.')

            const token = jwt.sign({_id: user.rows[0].id}, config.get('auth.jwtPK'))
            res.send(token)
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

router.post('/reset-password', async(req, res)=>{
    let text = "SELECT affiliation FROM Utilisateur WHERE username = $1"
    let values = [req.body.username]
    await pool.query(text, values)
        .then(async user =>{
            if(user.rows.length === 0) return res.status(400).send('Invalid username')

            text = "SELECT nom, prenom, numTel, mail FROM Utilisateur where affiliation = $1"
            values = [user.rows[0].affiliation]
            await pool.query(text, values)
                .then(async admins =>{
                    if(admins.rows.length === 0) return res.status(404).send('Aucun administrateur n\'est disponible.')
                    res.send(admins.rows)
                })
        })
        .catch(e => {
            console.error(e.message)
            res.send(e.message)
        })
})

module.exports = router