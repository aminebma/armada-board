const express = require('express')
const router = express.Router()
const config = require('config')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()
const multer = require('multer')
const fs = require('fs')

//Configuring multer for file upload
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

//Configuring the jasper server
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

//Get the current existing reports and adding them to the jasper server when launching it
init()

//This will add a new report to the jasper server and the database. The report will be stored in lib/reports.
//The request body should contain the name of the report, the .jrxml and the .jasper file of the report
router.post('/', reportUpload.array('report', 2), async (req, res) => {
    const report = {
        jrxml: `..\\${req.files[0].path}`,
        jasper: `..\\${req.files[1].path}`
    }
    jasper.add(req.body.name,report)
    const text = "INSERT INTO Fichier(type,url,nom) VALUES('KPI',$1,$2) RETURNING id"
    let values = []
    for(let file of req.files) {
        values = [
            `..\\${file.path}`,
            req.body.name
        ]
        await pool.query(text, values).then(result => {
            console.log(`File added successfully. id: ${result.rows[0].id}`)
        }).catch(e => {
            console.error(e.message)
            res.send(e.message)
            return
        })
    }
    res.send('Report added successfully')
})

//This will generate a report in the pdf format and send it. The request body should include the name of the report
router.get('/:name', async (req, res) => {
    const report = req.params.name
    const pdf = await jasper.pdf(report)
    res.set({
        'Content-type': 'application/pdf',
        'Content-Length': pdf.length
    })
    res.send(pdf)
})

//This will delete a report from the database and from the jasper server
router.delete('/:name', async (req, res)=>{
    fs.unlink(`../lib/reports/${req.params.name}`, function (err) {
        if (err) throw err
        console.log(`File ..lib/reports/${req.params.name} deleted!`)
    })
    const text = "DELETE FROM Fichier WHERE name=$1"
    const values = [req.params.name]
    await poo.query(text,values)
        .then(()=>{
            res.send({ Message: 'Report deleted successfully'})
        })
        .catch(err => {
            console.log(err.message)
            res.send(err.message)
        })
})
module.exports = router

//This function gets all the urls of the reports in the server when launching it
async function init(){
    const text = "SELECT url,nom FROM Fichier WHERE type='KPI'"
    await pool.query(text)
        .then(result=> {
            let newReport
            for (i = 0; i < result.rows.length; i += 2) {
                newReport = {
                    jrxml: result.rows[i].url,
                    jasper: result.rows[i + 1].url
                }
                jasper.add(result.rows[i].nom, newReport)
            }
        })
        .catch(e => console.error(e.message))
}