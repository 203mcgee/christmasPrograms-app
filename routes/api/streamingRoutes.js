const express = require('express')
const router = express.Router()
const {streamingDao:dao} = require('../../daos/dao')


router.get('/',(req,res)=>{
    dao.findAll(req,res,dao.table)
})

router.get('/get_streaming/:id',(req,res)=>{
    dao.findById(res,dao.table,req.params.id)
})

module.exports = router