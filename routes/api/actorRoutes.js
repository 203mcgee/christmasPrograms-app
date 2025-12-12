const express = require('express')
const router = express.Router()
const {actorDao:dao} = require('../../daos/dao')


router.get('/',(req,res)=>{
    dao.findAll(req,res,dao.table)
})

router.get('/amount',(req,res)=>{
    dao.countAll(res,dao.table)
})

router.get('/search',(req,res)=>{
    dao.search(req,res,dao.table)
})
router.get('/firstname/:id',(req,res)=>{
    dao.findByFirstName(res,dao.table,req.params.id)
})

router.get('/lastname/:id',(req,res)=>{
    dao.findByLastName(res,dao.table,req.params.id)
})

router.get('/get_actor/:id',(req,res)=>{
    dao.findById(res,dao.table,req.params.id)
})

router.get('/sort/:sorter',(req,res)=>{
    dao.sort(res,dao.table,req.params.sorter)
})

router.get('/actorMovie/:id',(req,res)=>{
    dao.actor_movie(res,dao.table,req.params.id)
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