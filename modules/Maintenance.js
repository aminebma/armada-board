const xmlConverter = require('xml-js')
const moment = require('moment')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

async function generateOilAppointment(sorties, maintenances, motorInfo, callback) {
    return new Promise(async (resolve, reject)=>{
        let text, values
        //Checking for the next oil appointment
        if (motorInfo[0].type._text === 'Essence') {
            let avgKm = 0.0
            //Average distance per day in kilometers
            for (let sortie of sorties)
                avgKm += (sortie.compteur_fin - sortie.compteur_debut)
            let nbDays = (moment(sorties[sorties.length - 1].date).diff(moment(sorties[0].date), 'days'))
            avgKm /= ((nbDays === 0) ? 1 : nbDays)
            //Calculating the remaining distance before the next checkup
            const remKm = 10000 - (sorties[sorties.length - 1].compteur_fin % 10000)
            let nextAppointment = moment().add(Math.floor(remKm / avgKm), 'days')
            //If there is no oil appointment coming
            if (moment(maintenances.rows.filter(maintenance => maintenance.type === 'Vidange')[0].date).isBefore(nextAppointment)) {
                text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                    "FROM Maintenance WHERE date_debut >= $1 \n" +
                    "ORDER BY date_fin::date, date_fin DESC"
                values = [
                    nextAppointment.format('YYYY-MM-DD')
                ]
                //Checking for the next free appointment date
                await pool.query(text, values)
                    .then(async dates => {
                        //If there is no appointment that day
                        if (dates.rows.length === 0 || !moment(dates.rows[0].date).isSame(nextAppointment, 'day'))
                            nextAppointment.set({'hour': 8, 'minutes': 0, 'seconds': 0})
                        else {
                            let appointed = false, i = 0
                            while (!appointed) {
                                if (moment(dates.rows[i].date).hour() === 17) {
                                    //Avoiding week ends (Friday and Saturday)
                                    nextAppointment.add(1 * ((nextAppointment.day() / 5) === 0 ? 1 : 2), 'day')
                                    if (((i + 1) === dates.rows.length) || !nextAppointment.isSame(moment(dates.rows[i + 1].date), 'day')) {
                                        nextAppointment.set({'hour': 8, 'minutes': 0, 'seconds': 0})
                                        appointed = true
                                    } else i++
                                } else {
                                    nextAppointment.set({
                                        'hour': moment(dates.rows[i].date).hour() + 1,
                                        'minutes': 0,
                                        'seconds': 0
                                    })
                                    appointed = true
                                }
                            }
                        }
                        //Getting the needed level and echelon
                        text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Vidange'"
                        await pool.query(text)
                            .then(async reference => {
                                let besoin = {
                                    "_declaration": {
                                        "_attributes": {
                                            "version": "1.0",
                                            "encoding": "utf-8"
                                        }
                                    },
                                    "contenu": {
                                        "besoin": [
                                            {
                                                "intitule": "Huile Moteur",
                                                "quantite": parseInt(motorInfo[2].mesure._text)
                                            }
                                        ]
                                    }
                                }
                                besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                const appointment = {
                                    type: "Vidange",
                                    niveau: reference.rows[0].niveau,
                                    echelon: reference.rows[0].echelon,
                                    date_debut: nextAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                    date_fin: nextAppointment.hour(nextAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                    vehicule: maintenances.rows[0].id_vehicule,
                                    affectation: maintenances.rows[0].affectation,
                                    besoin: besoin
                                }
                                resolve(appointment)
                            })
                            .catch(e => reject(e.message))
                    })
                    .catch(e => reject(e.message))
            }
            else reject(new Error('There is already an oil appointment pending.'))
        }
    })
}

module.exports = {generateOilAppointment}