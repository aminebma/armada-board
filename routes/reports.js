const express = require('express')
const router = express.Router()
const config = require('config')
const jasper = require('node-jasper')({
    path: '../lib/jasperreports-5.6.0',
    reports: {
        test:{
            jrxml: '../lib/reports/benbakhtest.jrxml',
            jasper: '../lib/reports/benbakhtest.jasper'
        }
    },
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

router.get('/pdf', function(req, res) {
    const report = 'test'
    const pdf = jasper.pdf(report)
    res.set({
        'Content-type': 'application/pdf',
        'Content-Length': pdf.length
    })
    res.send(pdf)
})

module.exports = router