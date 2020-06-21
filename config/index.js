const config = require('config')

module.exports = {
    getDbConnectionString: function(){
        return `postgresql://${config.get("database.username")}:${config.get("database.password")}@${config.get("database.ip")}:${config.get("database.port")}/${config.get("database.name")}`
    }
}