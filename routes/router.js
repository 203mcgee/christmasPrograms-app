const express = require('express')
const router = express.Router()
const axios = require('axios')
const { paginationResults, buildProgramArr } = require('../helpers/pagination')
const PORT = process.env.PORT || 3000

router.use(express.static('public'))


//------ HOMEPAGE -----------
router.get('/',(req,res)=>{
    res.render('pages/home',{
        title: "This is the Homepage",
        name:"This is the Homepage"
    })
})
//-------- INPUT MORE ACTORS --------------
router.get('/actor-form',(req,res)=>{
    res.render('pages/actor-form',{
        title:'Actor',
        name: 'Actor'
    })
})

// ------ ALL THE APIS ----------
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

//----------------- BE ABLE TO GET THE ROUTES AND SAVING SPACE -------------------
const endpoints = ['program','actor','producer','director','streaming']

endpoints.forEach(endpoint =>{
    router.use(`/api/${endpoint}`,require(`./api/${endpoint}Routes`))

})

//-------- DISPLAYING ALL THE INFO ----------------
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
router.get('/directors',(req,res)=>{
    const url = 'http://localhost:3000/api/director'

    const pageData = paginationResults(req)

    let programData = []

    axios.get(url)
        .then(resp =>{

            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)

            res.render('pages/directors',{
                title: 'All Directors',
                name: 'All Directors',
                data: programArrData.arr,
                prev:programArrData.prev,
                next: programArrData.next

            })
        })
})

router.get('/producers',(req,res)=>{
    const url = 'http://localhost:3000/api/producer'

    const pageData = paginationResults(req)

    let programData = []

    axios.get(url)
        .then(resp =>{

            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)

            res.render('pages/producers',{
                title: 'All Producers',
                name: 'All Producers',
                data: programArrData.arr,
                prev:programArrData.prev,
                next: programArrData.next

            })
        })
})

router.get('/streaming_services',(req,res)=>{
    const url = 'http://localhost:3000/api/streaming'

    const pageData = paginationResults(req)

    let programData = []

    axios.get(url)
        .then(resp =>{
            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)
            res.render('pages/streaming',{
                title:"All Streaming Services",
                name: "All Streaming Services",
                data: resp.data,
                prev:programArrData.prev,
                next:programArrData.next
            })
        })
})

//--- GETTING MORE INFORMATION FOR A SINGULAR MOVIE ---------------
router.get('/moreInfo/:id',(req,res)=>{
    let id = req.params.id
    const url = `http://localhost:3000/api/program/get_program/${id}`

    axios.get(url)
        .then(resp =>{
            res.render('pages/moreInfo',{
                title:"More Information",
                name:"More Information",
                data:resp.data
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
                actors:resp.data
            })
        })
})

router.get('/directorsInPrograms/:id',(req,res)=>{
    const id = req.params.id
    const url =`http://localhost:3000/api/director/movieDirector/${id}`

    axios.get(url)
        .then(resp => {
            res.render('pages/directorInProgram',{
                title: "This is the director of the Program",
                name:"This is the director of the Program",
                directors:resp.data
            })
        })

})

router.get('/producersInPrograms/:id',(req,res)=>{
    const id = req.params.id
    const url =`http://localhost:3000/api/producer/programProducer/${id}`

    axios.get(url)
        .then(resp => {
            console.log(resp.data)
            res.render('pages/producerInProgram',{
                title: "This is the producer of the Christmas Program",
                name:"This is the producer of the Christmas Program",
                producers:resp.data
            })
        })

})

router.get('/servicesInPrograms/:id',(req,res)=>{
    const id =req.params.id
    const url = `http://localhost:3000/api/streaming/movieOnStreaming/${id}`

    axios.get(url)
        .then(resp =>{
            console.log(resp.data)
            res.render('pages/serviceInProgram',{
                title:'This is Program is on this Streaming Service',
                name: 'This is Program is on this Streaming Service',
                services:resp.data
            })
        })
})


router.get('/singleProgram/:id',(req,res)=>{
    const id = req.params.id
    const url = `http://localhost:3000/api/program/get_program/${id}`

    const pageData = paginationResults(req)

    let programData = []

    axios.get(url)
        .then(resp => {
            const program = resp.data

            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)

            res.render('pages/singleProgram',{
                title: "Christmas Program",
                name: "Program",
                data:program,
                prev:programArrData.prev,
                next: programArrData.next
            })
        })
})


router.get('/moreStuff',(req,res)=>{
    res.render('pages/moreStuff',{
        title:"More Stuff",
        name:"More Stuff"
    })
})

//---------- SEARCHING ------------------

router.get('/search',(req,res)=>{
    res.render('pages/search',{
        title:'Search',
        name:'Search'
    })
})

router.get('/searchPrograms',(req,res)=>{
    
    res.render('pages/searchProgram',{
        title: "Search for Christmas Program",
        name: "Search"           
    })
       
})

router.get('/searchStreaming',(req,res)=>{
    res.render('pages/searchStreaming',{
        title:"Search for a Streaming Services",
        name:"Search for a Streaming Services"
    })
})

router.get('/searchActor',(req,res)=>{
    res.render('pages/searchActor',{
        title:'Search for Actor',
        name:'Search for Actor'
    })
})

router.get('/searchDirector',(req,res)=>{
    res.render('pages/searchDirector',{
        title:'Search for Director',
        name:'Search for Director'
    })
})

router.get('/searchProducer',(req,res)=>{
    res.render('pages/searchProducer',{
        title:'Search for Producer',
        name:'Search for Producer'
    })
})

//----------- SORTING THINGS -----------------------
router.get('/sortingPrograms/:sorter',(req,res)=>{
    const sorter = req.params.sorter
    const url = `http://localhost:3000/api/program/sort/${sorter}`

    const pageData = paginationResults(req)

    let programData = []


    axios.get(url)
        .then(resp =>{
            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)
            res.render('pages/sortProgram',{
                title: "Sorting items",
                name:"Sorting",
                data: programArrData.arr,
                prev:programArrData.prev,
                next:programArrData.next
            })
        })
})

router.get('/sortingActors/:sorter',(req,res)=>{
    const sorter = req.params.sorter
    const url = `http://localhost:3000/api/actor/sort/${sorter}`
    
    const pageData = paginationResults(req)

    let programData = []

    axios.get(url)
        .then(resp =>{
            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)
            res.render('pages/sortActor',{
                title: "Sorting items",
                name:"Sorting",
                data:programArrData.arr,
                prev:programArrData.prev,
                next:programArrData.next
            })
        })
})

router.get('/sortingProducers/:sorter',(req,res)=>{
    const sorter = req.params.sorter
    const url = `http://localhost:3000/api/producer/sort/${sorter}`

    const pageData = paginationResults(req)

    let programData = []


    axios.get(url)
        .then(resp =>{
            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)
            res.render('pages/sortProducer',{
                title: "Sorting items",
                name:"Sorting",
                data: programArrData.arr,
                prev:programArrData.prev,
                next:programArrData.next
            })
        })
})

router.get('/sortingDirectors/:sorter',(req,res)=>{
    const sorter = req.params.sorter
    const url = `http://localhost:3000/api/director/sort/${sorter}`

    const pageData = paginationResults(req)

    let programData = []


    axios.get(url)
        .then(resp =>{
            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)
            res.render('pages/sortDirector',{
                title: "Sorting items",
                name:"Sorting",
                data: programArrData.arr,
                prev:programArrData.prev,
                next:programArrData.next
            })
        })
})

router.get('/sortingServices/:sorter',(req,res)=>{
    const sorter = req.params.sorter
    const url = `http://localhost:3000/api/streaming/sort/${sorter}`

    const pageData = paginationResults(req)

    let programData = []


    axios.get(url)
        .then(resp =>{
            const programArrData = buildProgramArr(resp.data,programData,pageData.startIdx,pageData.endIdx,pageData.page)
            res.render('pages/sortStreaming',{
                title: "Sorting items",
                name:"Sorting",
                data: programArrData.arr,
                prev:programArrData.prev,
                next:programArrData.next
            })
        })
})

//-----------------------------------------------------------------------------------------------

router.use((req,res,next)=>{
    res.status(404)
    .render('pages/error',{
        title:"ERROR",
        name:"ERROR"
    })
})

module.exports = router