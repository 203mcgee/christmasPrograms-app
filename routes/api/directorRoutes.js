const express = require('express')
const router = express.Router()
const {directorDao:dao} = require('../../daos/dao')


router.get('/',(req,res)=>{
    dao.findAll(req,res,dao.table)
})

router.get('/get_director/:id',(req,res)=>{
    dao.findById(res,dao.table,req.params.id)
})

module.exports = router