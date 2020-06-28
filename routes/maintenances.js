const express = require('express')
const router = express.Router()

router.post('/maintenance', async(req,res)=>{
    //TODO Creer une maintenance
})

router.get('/planning', async(req,res)=>{
    //TODO Exporter un planning de maintenance
})

router.post('/planning', async(req,res)=>{
    //TODO Generer un planning
})

router.delete('/maintenance', async(req,res)=>{
    //TODO Supprimer une maintenance
})

router.put('/maintenance', async(req,res)=>{
    //TODO Modifier une maintenance
})

module.exports = router