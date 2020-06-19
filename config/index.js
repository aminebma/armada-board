const config = require('config')

module.exports = {
    getDbConnectionString: function(){
        console.log('Application environment: '+config.get("name"))
        console.log(`Connected database: ${config.get("database.name")} @ ${config.get("database.ip")}:${config.get("database.port")}\nUser: ${config.get("database.username")}`)
        return `postgresql://${config.get("database.username")}:${config.get("database.password")}@${config.get("database.ip")}:${config.get("database.port")}/${config.get("database.name")}`
    }
}