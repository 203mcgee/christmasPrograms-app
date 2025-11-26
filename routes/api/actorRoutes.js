const express = require('express')
const router = express.Router()
const {actorDao:dao} = require('../../daos/dao')


router.get('/',(req,res)=>{
    dao.findAll(req,res,dao.table)
})

router.get('/get_actor/:id',(req,res)=>{
    dao.findById(res,dao.table,req.params.id)
})

module.exports = router