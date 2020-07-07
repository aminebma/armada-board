const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const {Client} = require('pg')
const configIndex = require('./config/index')
const config = require('config')
const app = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname+'/log', 'access.log'), { flags: 'a' })

//Configuring the server
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(morgan('tiny',{stream: accessLogStream}))
app.use(cors())
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     next()
// });

//Displaying environment infos
console.log(`Application environement: ${config.get('name')}`)

//Testing the database connexion
const client = new Client({
    connectionString: configIndex.getDbConnectionString()
})
client.connect().then(
    console.log(`Successfully connected to the database: ${config.get('database.name')} @ ${config.get('database.ip')}:${config.get('database.port')}`)
).catch(err=>console.log(new Error(err)))
client.end()

//Configuring the server's routes
const accounts = require('./routes/accounts')
const administrators = require('./routes/administrators')
const maintenances = require('./routes/maintenances')
const reports = require('./routes/reports')
const files = require('./routes/files')
const vehicules = require('./routes/vehicules')
app.use('/api/accounts', accounts)
app.use('/api/admin', administrators)
app.use('/api/maintenances', maintenances)
app.use('/api/reports', reports)
app.use('/api/files', files)
app.use('/api/vehicules', vehicules)

const port = config.get("server.port")
const ip = config.get("server.ip")

//Launching the server
app.listen(port, ip, () => console.log(`Listening on ${ip}:${port}`))