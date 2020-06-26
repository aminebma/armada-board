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

router.post('/reset-password', async(req,res)=>{
    //TODO Mot de passe oublié
})

module.exports = router