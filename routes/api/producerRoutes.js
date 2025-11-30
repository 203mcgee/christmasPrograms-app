const express = require('express')
const router = express.Router()
const {producerDao:dao} = require('../../daos/dao')


router.get('/',(req,res)=>{
    dao.findAll(req,res,dao.table)
})
router.get('/amount',(req,res)=>{
    dao.countAll(res,dao.table)
})

router.get('/get_producer/:id',(req,res)=>{
    dao.findById(res,dao.table,req.params.id)
})

router.get('/sort/:sorter',(req,res)=>{
    dao.sort(res,dao.table,req.params.sorter)
})

module.exports = router