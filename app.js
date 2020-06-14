const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const administrators = require('./routes/administrators')
const maintenances = require('./routes/maintenances')
const vehicules = require('./routes/vehicules')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public',express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))

app.use('/api/admin', administrators)
app.use('/api/maintenances', maintenances)
app.use('/api/vehicules', vehicules)

const port = process.env.PORT || 3000
const ip = process.env.IP || '127.0.0.1'

app.listen(port, ip, ()=> console.log(`Listening on: ${ip}:${port}`))