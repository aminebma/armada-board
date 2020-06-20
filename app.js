const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const {Client} = require('pg')
const configIndex = require('./config/index')
const config = require('config')
const accounts = require('./routes/accounts')
const administrators = require('./routes/administrators')
const maintenances = require('./routes/maintenances')
const vehicules = require('./routes/vehicules')
const reports = require('./routes/reports')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public',express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))

app.use('/api/accounts', accounts)
app.use('/api/admin', administrators)
app.use('/api/maintenances', maintenances)
app.use('/api/vehicules', vehicules)
app.use('/api/reports', reports)

const client = new Client({
    connectionString: configIndex.getDbConnectionString()
})
client.connect().then(
    console.log(`Successfully connected to the database...`)
).catch(err=>console.log(new Error(err)))
client.end()

const port = config.get("server.port")
const ip = config.get("server.ip")

app.listen(port, ip, () => console.log(`Listening on ${ip}:${port}`))