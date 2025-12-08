const connect = require('../../config/dbconfig')

const daoCommon = {
    findAll: (req,res,table) =>{
        connect.query(
            `SELECT * FROM ${table};`,
            (error,rows)=>{
                if(!error)
                {
                    if(rows.length === 1)
                    {
                        res.json(...rows)
                    }
                    else
                    {
                        res.json(rows)
                    }
                }
                else{
                    console.log(`DAO ERROR:${error}`)
                    res.json({
                        "message":'error',
                        'table':`${table}`,
                        'error':error
                    })
                }
            }
        )
    },
    findById: (res,table,id) =>{
        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error,rows) =>{
                if(!error)
                {
                    res.json(...rows)
                }
                else
                {
                    console.log(`DAO Error: ${error}`)
                    res.json({
                        'message':'error',
                        'table':`${table}`,
                        'error':error
                    })
                }
            }
        )
    },
    // DON'T FORGET TO DO COUNT ALL
    countAll: (res,table) =>{
        connect.execute(
            `SELECT count(*) as count FROM ${table};`,
            (error,rows)=>{
                if(!error)
                {
                   res.json(rows)
                }
                else
                {
                    console.log(`DAO Error: ${error}`)
                    res.json({
                        "message":'error',
                        'table':`${table}`,
                        'error': error
                    })
                }
            }
        )

    }, // DON'T FORGET TO DO SEARCH
    search: (req,res,table)=>{
        let sql = ''

        const query = req.query ? req.query : {}

        let fName = req.query.fName || null
        let lName = req.query.lName || null
        

        //Producer,Director,Actor table
        if (fName == null && lName == null) {
            sql = `SELECT * FROM ${table};`
        } else if (lName == null) {
            sql = `SELECT * FROM ${table} WHERE fName LIKE '%${fName}%';`
        } else if (fName == null) {
            sql = `SELECT * FROM ${table} WHERE lName LIKE '%${lName}%';`
        }else {
            sql = `SELECT * FROM ${table} WHERE fName LIKE '%${fName}%' AND lName LIKE '%${lName}%';`
        }

        // /search?fName=burl&lName=ives

        connect.execute(
            sql, 
            (error, rows)=> {
                if (rows.length == 0) {
                    res.send('<h1>No data to send</h1>')
                } else {

                    if(!error)
                    {
                       if(rows.length == 1)
                        {
                            res.json(...rows)
                        } 
                        else{
                            res.json(rows)
                        }
                    }
                    else
                    {
                        console.log(`${table}DAO Error: ${error}`)
                        res.json({
                            "message":'error',
                            'table':`${table}`,
                            'error': error
                        })
                    }
                }
            }
        )
    },
    searchProgram:(req,res,table)=>{
        let sql = ''
        const query = req.query ? req.query : {}

        let title = req.query.title || null

        if(title != null){
            sql = `SELECT * FROM ${table} WHERE title LIKE '%${title}';`
        }

        connect.execute(
            sql, 
            (error, rows)=> {
                if (rows.length == 0) {
                    res.send('<h1>No data to send</h1>')
                } else {

                    if(!error)
                    {
                       if(rows.length == 1)
                        {
                            res.json(...rows)
                        } 
                        else{
                            res.json(rows)
                        }
                    }
                    else
                    {
                        console.log(`${table}DAO Error: ${error}`)
                        res.json({
                            "message":'error',
                            'table':`${table}`,
                            'error': error
                        })
                    }
                }
            }
        )

    },
    searchStreaming: (req,res,table)=>{
        let sql = ''
        const query = req.query ? req.query : {}

        let streaming_platform = req.query.streaming_platform || null

        if (streaming_platform != ''){
            sql = `SELECT * FROM ${table} WHERE streaming_platform LIKE '%${streaming_platform}';`
        }

        connect.execute(
            sql, 
            (error, rows)=> {
                if (rows.length == 0) {
                    res.send('<h1>No data to send</h1>')
                } else {

                    if(!error)
                    {
                       if(rows.length == 1)
                        {
                            res.json(...rows)
                        } 
                        else{
                            res.json(rows)
                        }
                    }
                    else
                    {
                        console.log(`${table}DAO Error: ${error}`)
                        res.json({
                            "message":'error',
                            'table':`${table}`,
                            'error': error
                        })
                    }
                }
            }
        )
    },
    sort: (res,table,sorter) => {
        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error,rows)=>{
                if(!error){
                    if(rows.length == 1){
                        res.json(...rows)
                    }
                    else
                    {
                        res.json(rows)
                    }
                }
                else
                {
                    console.log(`DAO Error: ${error}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error
                    })
                }
            }
        )
    },
    create: (req,res,table) => {
        if(Object.keys(req.body).length === 0)
        {
            res.json({
                "error":true,
                "message": "No fields to create"
            })
        }
        else
        {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error,dbres) =>{
                    if(!error)
                    {
                        console.log(dbres)
                        res.render('pages/success',{
                            title: 'success',
                            name: 'success'
                        })
                    }
                    else
                    {
                        console.log(`${table} DAO error`,error)
                    }
                }
            )
        }
    },
    update: (req,res,table) =>{
        if(isNaN(req.params.id))
        {
            res.json({
                "error":true,
                "message": "Id must be a number"
            })
        }
        else if(Object.keys(req.body).length == 0)
        {
            res.json({
                "error":true,
                "message": "No fields to update"
            })
        }
        else
        {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table}
                SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?;`,
                [...values,req.params.id],
                (error,dbres) => {
                    if(!error)
                    {
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows
                        })
                    }
                    else
                    {
                        res.json({
                            "error":true,
                            "message":"error"
                        })
                    }
                }
            )
        }
    }



}

module.exports = daoCommon