const express = require('express')
const router = express.Router()

router.post('/fiche-suivi', async(req,res)=>{
    //TODO Upload d'une fiche de suivi
})

router.post('/fiche-technique', async(req,res)=>{
    //TODO Upload d'une fiche technique
})

router.post('/fiche-controle-couts', async(req,res)=>{
    //TODO Upload d'une fiche de controle des couts
})

router.post('/carnet-de-bord', async(req,res)=>{
    //TODO Upload d'un carnet de bord
})

router.post('/guide-constructeur', async(req,res)=>{
    //TODO Upload d'un guide constructeur
})

router.get('/fiche-suivi', async(req,res)=>{
    //TODO Download des fiches de suivi
})

router.get('/fiche-technique', async(req,res)=>{
    //TODO Download des fiches technique
})

router.get('/fiche-controle-couts', async(req,res)=>{
    //TODO Download des fiches de controle des couts
})

router.get('/carnet-de-bord', async(req,res)=>{
    //TODO Download des carnets de bord
})

router.get('/guide-constructeur', async(req,res)=>{
    //TODO Download des guides constructeur
})

module.exports = router