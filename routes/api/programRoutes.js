const express = require('express')
const router = express.Router()
const {programDao:dao} = require('../../daos/dao')




router.get('/',(req,res)=>{
    dao.findAll(req,res,dao.table)
})

router.get('/amount',(req,res)=>{
    dao.countAll(res,dao.table)
})

router.get('/desc',(req,res)=>{
    dao.selectAllDescription(res,dao.table)
})

router.get('/rating',(req,res)=>{
    dao.programOrderByRating(res,dao.table)
})

router.get('/get_program/:id',(req,res)=>{
    dao.findById(res,dao.table,req.params.id)
})

router.get('/sort/:sorter',(req,res)=>{
    dao.sort(res,dao.table,req.params.sorter)
})

router.get('/search',(req,res)=>{
    dao.searchProgram(req,res,dao.table)
})

// POST
router.post('/create',(req,res)=>{
    dao.create(req,res,dao.table)
})

// PATCH
router.patch('/update/:id',(req,res)=>{
    dao.update(req,res,dao.table)
})

module.exports = router