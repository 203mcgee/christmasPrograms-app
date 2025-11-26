const express = require('express')
const index = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 3000

const helmet = require('helmet')
const cors = require('cors')

index.use(helmet.contentSecurityPolicy({
        useDefaults: true,
        crossOriginResourcePolicy:false,
        crossOriginEmbeddedPolicy: false,
        directives:{
            "img-src": ["'self'","http: data"],
            "scriptSrc": ["'self'","cdn.jsdelivr.net"]
        }

    })
)
index.use(cors())
index.use(express.json())
index.use(express.urlencoded({extended:true}))

index.set('view engine','ejs')
index.use('/',router)

index.listen(PORT,()=> console.log(`server listening at http://localhost:${PORT}`))