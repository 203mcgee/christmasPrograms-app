const express = require('express')
const router = express.Router()
const axios = require('axios')
const { paginationResults, buildProgramArr } = require('../helpers/pagination')
const PORT = process.env.PORT || 3000

router.use(express.static('public')) 

router.get('/programs',(req,res)=>{
    const url = 'http://localhost:3000/api/program'

    const pageData = paginationResults(req)

    let programData = []

    axios.get(url)
        .then(resp =>{

            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)

            res.render('pages/program',{
                title: 'All Programs',
                name: 'All Programs',
                data: programArrData.arr,
                prev:programArrData.prev,
                next: programArrData.next

            })
        })
})

router.get('/actors',(req,res)=>{
    const url = 'http://localhost:3000/api/actor'

    const pageData = paginationResults(req)

    let programData = []

    axios.get(url)
        .then(resp =>{

            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)

            res.render('pages/actors',{
                title: 'All Actors',
                name: 'All Actors',
                data: programArrData.arr,
                prev:programArrData.prev,
                next: programArrData.next

            })
        })
})

router.get('/actorsInPrograms/:id',(req,res)=>{
    const id = req.params.id
    const url = `http://localhost:3000/api/actor/actorMovie/${id}`

    axios.get(url)
        .then(resp => {
            res.render('pages/actorInProgram',{
                title: "These are the Actors in this Program",
                name: "These are the Actors in this Program",
                data:resp.data
            })
        })
})

// router.get('/singleProgram/:id',(req,res)=>{
//     const id = req.params.id
//     const url = `http://localhost:3000/api/program/${id}`

//     // const pageData = paginationResults(req)

//     // let programData = []

//     axios.get(url)
//         .then(resp => {
//             // const program = resp.data

//             // const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)

//             res.render('pages/singleProgram',{
//                 title: "Christmas Program",
//                 name: "Program",
//                 data:resp.data
//             })
//         })
// })

router.get('/',(req,res)=>{
    res.render('pages/home',{
        title: "This is the Homepage",
        name:"This is the Homepage"
    })
})

router.get('/actor-form',(req,res)=>{
    res.render('pages/actor-form',{
        title:'Actor',
        name: 'Actor'
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
    .render('pages/error',{
        title:"ERROR",
        name:"ERROR"
    })
})




module.exports = router