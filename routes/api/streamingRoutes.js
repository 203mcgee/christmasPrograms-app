const express = require('express')
const router = express.Router()
const {streamingDao:dao} = require('../../daos/dao')


router.get('/',(req,res)=>{
    dao.findAll(req,res,dao.table)
})

router.get('/amount',(req,res)=>{
    dao.countAll(res,dao.table)
})

router.get('/search',(req,res)=>{
    dao.searchStreaming(req,res,dao.table)
})

router.get('/movieOnStreaming/:id',(req,res)=>{
    dao.movieOnStreaming(res,dao.table,req.params.id)
})

router.get('/get_streaming/:id',(req,res)=>{
    dao.findById(res,dao.table,req.params.id)
})

router.get('/sort/:sorter',(req,res)=>{
    dao.sort(res,dao.table,req.params.sorter)
})

router.get('/alphabetize',(req,res)=>{
    dao.streamingAlphabetical(res,dao.table)
})

//POST
router.post('/create',(req,res)=>{
    dao.create(req,res,dao.table)
})
//PATCH
router.patch('/update/:id',(req,res)=>{
    dao.update(req,res,dao.table)
})

module.exports = router