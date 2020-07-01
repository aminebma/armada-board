const xmlConverter = require('xml-js')
const moment = require('moment')
const configIndex = require('../config/index')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: configIndex.getDbConnectionString()
})
pool.connect()

//Generates the next motor appointments
async function generateMotorAppointments(sorties, avgKm, maintenances, motorInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType

        //Calculating the remaining distance before the next oil checkup
        const oilRemKm = motorInfo[1].informations._text - (sorties[sorties.length - 1].compteur_fin % motorInfo[1].informations._text)
        let nextOilAppointment = moment().add(Math.floor(oilRemKm / avgKm), 'days')
        //If there is no oil appointments coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === 'Vidange')[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextOilAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextOilAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextOilAppointment)
                        .then(async nextOilAppointment => {
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
                                            "intitule": "Huile Moteur",
                                            "type": motorInfo[2].informations._text,
                                            "quantite": parseInt(motorInfo[0].mesure._text)
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Vidange",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextOilAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextOilAppointment.hour(nextOilAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already an oil appointment pending.'})

        //Calculating the remaining distance before the next motor chain checkup
        const motorChainRemKm = motorInfo[3].informations._text - (sorties[sorties.length - 1].compteur_fin % motorInfo[3].informations._text)
        let nextMotorChainAppointment = moment().add(Math.floor(motorChainRemKm / avgKm), 'days')
        //If there is no motor chain appointments coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === 'Courroie')[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType).isBefore(nextMotorChainAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextMotorChainAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextMotorChainAppointment)
                        .then(async nextMotorChainAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Courroie'"
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
                                            "intitule": "Courroie",
                                            "quantite": 1
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Courroie",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextMotorChainAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextMotorChainAppointment.hour(nextMotorChainAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))

                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a motor chain appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Generates the next brakes appointments
async function generateBrakesAppointments(sorties, avgKm, maintenances, brakesInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType
        let brakesTypes = brakesInfo.filter(info => info.informations._text === 'Oui')

        //Calculating the remaining distance before the next brake pads checkup
        const brakePadsRemKm = brakesInfo[6].informations._text - (sorties[sorties.length - 1].compteur_fin % brakesInfo[6].informations._text)
        let nextBrakePadsAppointment = moment().add(Math.floor(brakePadsRemKm / avgKm), 'days')
        //If there is no brake pads appointments coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === 'Plaquettes de Freins')[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextBrakePadsAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextBrakePadsAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextBrakePadsAppointment)
                        .then(async nextBrakePadsAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Plaquettes de Freins'"
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
                                            "intitule": "Plaquettes de Freins",
                                            "quantite": brakesTypes.length
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Plaquettes de Freins",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextBrakePadsAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextBrakePadsAppointment.hour(nextBrakePadsAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a brake pads appointment pending.'})

        //Calculating the remaining distance before the next brakes liquid checkup
        const brakesLiquid = brakesInfo[7].informations._text - (sorties[sorties.length - 1].compteur_fin % brakesInfo[7].informations._text)
        let nextBrakesLiquidAppointment = moment().add(Math.floor(brakesLiquid / avgKm), 'days')
        //If there is no brakes liquid appointments coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === 'Liquide de Freins')[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextBrakesLiquidAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextBrakesLiquidAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextBrakesLiquidAppointment)
                        .then(async nextBrakesLiquidAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Liquide de Freins'"
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
                                            "intitule": "Liquide de Freins",
                                            "quantite": 1
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Liquide de Freins",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextBrakesLiquidAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextBrakesLiquidAppointment.hour(nextBrakesLiquidAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a brakes liquid appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Generates the next gear appointment
async function generateGearAppointment(sorties, avgKm, maintenances, gearInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType

        //Calculating the remaining distance before the next gear checkup
        const gearRemKm = gearInfo[1].informations._text - (sorties[sorties.length - 1].compteur_fin % gearInfo[1].informations._text)
        let nextGearAppointment = moment().add(Math.floor(gearRemKm / avgKm), 'days')
        //If there is no gear appointment coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === 'Vidange Boite à Vitesses')[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextGearAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextGearAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextGearAppointment)
                        .then(async nextGearAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Vidange Boite à vitesses'"
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
                                            "intitule": "Huile boite à vitesse",
                                            "quantite": parseInt(gearInfo[0].mesure._text)
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Vidange Boite à Vitesses",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextGearAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextGearAppointment.hour(nextGearAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a gear appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Generates the next clutch kit appointment
async function generateClutchAppointment(sorties, avgKm, maintenances, clutchInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType

        //Calculating the remaining distance before the next clutch checkup
        const clutchRemKm = clutchInfo[0].informations._text - (sorties[sorties.length - 1].compteur_fin % clutchInfo[0].informations._text)
        let nextClutchAppointment = moment().add(Math.floor(clutchRemKm / avgKm), 'days')
        //If there is no clutch appointment coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === "Kit embrayage")[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextClutchAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextClutchAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextClutchAppointment)
                        .then(async nextClutchAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Kit embrayage'"
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
                                            "intitule": "Kit d'embrayage",
                                            "quantite": 1
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Kit embrayage",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextClutchAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextClutchAppointment.hour(nextClutchAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a clutch appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Generates the next suspensions appointment
async function generateSuspensionAppointment(sorties, avgKm, maintenances, suspensionInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType

        //Calculating the remaining distance before the next suspensions checkup
        const suspensionRemKm = suspensionInfo[0].informations._text - (sorties[sorties.length - 1].compteur_fin % suspensionInfo[0].informations._text)
        let nextSuspensionAppointment = moment().add(Math.floor(suspensionRemKm / avgKm), 'days')
        //If there is no suspensions appointment coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === "Suspension")[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextSuspensionAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextSuspensionAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextSuspensionAppointment)
                        .then(async nextSuspensionAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Suspension'"
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
                                            "intitule": "Amortisseurs",
                                            "quantite": 4
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Suspension",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextSuspensionAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextSuspensionAppointment.hour(nextSuspensionAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a suspension appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Generates the next tires appointment
async function generateTiresAppointment(sorties, avgKm, maintenances, tiresInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType

        //Calculating the remaining distance before the next tires checkup
        const tiresRemKm = tiresInfo[1].informations._text - (sorties[sorties.length - 1].compteur_fin % tiresInfo[1].informations._text)
        let nextTiresAppointment = moment().add(Math.floor(tiresRemKm / avgKm), 'days')
        //If there is no tires appointment coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === "Pneus")[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextTiresAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextTiresAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextTiresAppointment)
                        .then(async nextTiresAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Pneus'"
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
                                            "intitule": "Pneus",
                                            "dimensions": tiresInfo[0].informations._text,
                                            "quantite": 4
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Pneus",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextTiresAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextTiresAppointment.hour(nextTiresAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a tires appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Generates the next parallelism appointment
async function generateParallelismAppointment(maintenances, weightInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType

        //Calculating the next parallelism appointment
        let nextParallelismAppointment = (weightInfo[0].mesure._text > 3500) ? moment().add(6, 'months') : moment().add(1, 'year')
        //If there is no parallelism appointment coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === "Parallelisme")[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextParallelismAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextParallelismAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextParallelismAppointment)
                        .then(async nextParallelismAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Parallelisme'"
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
                                            "intitule": "Parallelisme",
                                            "quantite": 1
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Parallelisme",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextParallelismAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextParallelismAppointment.hour(nextParallelismAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a parallelism appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Generates the next divers appointment
async function generateDiversAppointment(maintenances, diversInfo, vehiculeInfo){
    return new Promise(async (resolve, reject)=>{
        let text, values, appointments = [], errors = [], maintenanceType

        //Calculating the next divers appointment
        let nextDiversAppointment = moment().add(parseInt(diversInfo[1].informations._text), 'years')
        //If there is no divers appointment coming
        maintenanceType = maintenances.rows.filter(maintenance => maintenance.type === "Divers")[0]
        if (typeof maintenanceType === 'undefined' || moment(maintenanceType.date).isBefore(nextDiversAppointment, 'day')) {
            text = "SELECT DISTINCT ON (date_fin::date) date_fin as date\n" +
                "FROM Maintenance WHERE date_debut >= $1 and affectation =$2 \n" +
                "ORDER BY date_fin::date, date_fin DESC"
            values = [
                nextDiversAppointment.format('YYYY-MM-DD'),
                vehiculeInfo.affectation
            ]
            await pool.query(text, values)
                .then(async dates => {
                    //Checking for the next free appointments date
                    await getNextAppointment(dates, nextDiversAppointment)
                        .then(async nextDiversAppointment => {
                            //Getting the needed level and echelon
                            text = "SELECT niveau, echelon FROM Ref_maintenance WHERE type='Divers'"
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
                                            "intitule": "Ampoules",
                                            "quantite": parseInt(diversInfo[0].informations._text)
                                        }
                                    }
                                    besoin = await xmlConverter.json2xml(besoin, {compact: true, spaces: '\t'})
                                    appointments.push({
                                        type: "Divers",
                                        niveau: reference.rows[0].niveau,
                                        echelon: reference.rows[0].echelon,
                                        date_debut: nextDiversAppointment.format('YYYY-MM-DD HH:mm:ss'),
                                        date_fin: nextDiversAppointment.hour(nextDiversAppointment.hour() + 1).format('YYYY-MM-DD HH:mm:ss'),
                                        vehicule: vehiculeInfo.id_vehicule,
                                        affectation: vehiculeInfo.affectation,
                                        besoin: besoin
                                    })
                                })
                                .catch(e => reject(e.message))
                        })
                        .catch(e => reject(e.message))
                })
                .catch(e => reject(e.message))
        } else errors.push({ Message: 'There is already a divers appointment pending.'})
        resolve({"appointments": appointments,"errors": errors})
    })
}

//Get the next free date for an appointment
async function getNextAppointment(dates,nextAppointment){
    return new Promise(async (resolve, reject)=>{
        try { //If there is no appointment that day
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
                            'hour': moment(dates.rows[i].date).hour(),
                            'minutes': 0,
                            'seconds': 0
                        })
                        appointed = true
                    }
                }
            }
            resolve(nextAppointment)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    generateMotorAppointments,
    generateBrakesAppointments,
    generateGearAppointment,
    generateClutchAppointment,
    generateSuspensionAppointment,
    generateTiresAppointment,
    generateParallelismAppointment,
    generateDiversAppointment
}