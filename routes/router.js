const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000


router.get('/',(req,res)=>{
    res.render('pages/home',{
        title: "This is the Homepage",
        name:"This is the Homepage"
    })
})

router.get('/api',(req,res)=>{
    // res.send('Hello!')
    res.json({
        'All Programs':`http://localhost:${PORT}/api/program`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Producers': `http://localhost:${PORT}/api/producer`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Streaming Platform': `http://localhost:${PORT}/api/streaming`
    })
})

const endpoints = ['program','actor','producer','director','streaming']

endpoints.forEach(endpoint =>{
    router.use(`/api/${endpoint}`,require(`./api/${endpoint}Routes`))

})


router.use((req,res,next)=>{
    res.status(404)
    .send('404 PAGE NOT FOUND!')
})




module.exports = router