const express = require('express')
const router = express.Router()
const config = require('config')
const configIndex = require('../config/index')
const { Client } = require('pg')
const client = new Client({
    connectionString: configIndex.getDbConnectionString()
})
const multer = require('multer')

const storageManager = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './lib/reports')
    },
    filename: function(req, file, callback){
        callback(null,file.originalname)
    }
})

const reportUpload =multer({
    storage: storageManager
})

const jasper = require('node-jasper')({
    path: '../lib/jasperreports-5.6.0',
    drivers: {
        pg:{
            path: '../lib/drivers/postgresql-42.2.14.jar',
            class: 'org.postgresql.Driver',
            type: 'postgresql'
        }
    },
    conns: {
        db_armada: {
            host: config.get('database.ip'),
            port: config.get('database.port'),
            dbname: config.get('database.name'),
            user: config.get('database.username'),
            pass: config.get('database.password'),
            driver: 'pg'
        }
    },
    defaultConn: 'db_armada'
})

init()

router.post('/', reportUpload.array('report', 2), async (req, res)=>{
    const report = {
        jrxml: `..\\${req.files[0].path}`,
        jasper: `..\\${req.files[1].path}`
    }
    jasper.add(req.body.name,report)
    const text = "INSERT INTO \"Fichier\"(\"Url\",\"Nom\") VALUES($1,$2) RETURNING id"
    let values = []
    await client.connect()
        .then(()=> {
                req.files.forEach(async (file,index) => {
                    values = [
                        `..\\${file.path}`,
                        req.body.name
                    ]
                    await client.query(text, values).then(result => {
                        console.log(`File added successfully. id: ${result.rows[0].id}`)
                        if(index==1) client.end()
                    }).catch(e => console.error(e.message))
                })
        })
        .catch(err => console.log(new Error(err.message)))
    res.send('Report added successfully')
})

router.get('/:name', async (req, res)=> {
    const report = req.params.name
    const pdf = jasper.pdf(report)
    res.set({
        'Content-type': 'application/pdf',
        'Content-Length': pdf.length
    })
    res.send(pdf)
})

module.exports = router

async function init(){
    const text = "SELECT \"Url\",\"Nom\" FROM \"Fichier\" WHERE \"Url\"<>''"
    await client.connect()
        .then(
            client.query(text)
                .then(result=>{
                    let newReport
                    for(i=0 ; i<result.rows.length ; i+=2){
                        newReport = {
                            jrxml: result.rows[i].Url,
                            jasper: result.rows[i+1].Url
                        }
                        jasper.add(result.rows[i].Nom,newReport)
                    }
                    client.end()
                })
                .catch(e => console.error(e.message))
        )
        .catch(err => console.log(new Error(err.message)))
}