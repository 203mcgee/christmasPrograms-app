const connect = require('../../config/dbconfig')

const actorDao = {
    table: 'actor',
    findByFirstName: (res,table,id) =>{
        let sql = `SELECT fName FROM ${table} WHERE fName LIKE '%${id}%';`
        connect.execute(
            sql,
            (error,rows)=>{
                if(!error)
                {
                    if(rows.length == 1)
                    {
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
                        "message":'error',
                        'table':`${table}`,
                        'error':error
                    })
                }
            }
        )

    },
    findByLastName: (res,table,id) =>{
       let sql = `SELECT lName FROM ${table} WHERE lName LIKE '%${id}%';`
       connect.execute(
        sql,
        (error,rows)=>{
            if(!error)
                {
                    if(rows.length == 1)
                    {
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
                        "message":'error',
                        'table':`${table}`,
                        'error':error
                    })
                }
        }
       )
    },
    actor_movie: (res,table,id) =>{
        let sql = `select a.fName,a.lName,p.title from ${table} a join program_to_${table} using (${table}_id) join program p using (program_id) where program_id = ${id};`
        connect.execute(
            sql,
            (error,rows)=>{
                if(!error)
                {
                    if(rows.length == 1)
                    {
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
                        "message":'error',
                        'table':`${table}`,
                        'error':error
                    }) 
                }
            }
        )
    },
    actorOrderByAlpha:(res,table)=>{
        let sql = `SELECT fName,lName FROM ${table} ORDER BY fName;`
        connect.execute(
            sql,
            (error,rows)=>{
                if(!error)
                {
                    if(rows.length == 1)
                    {
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
                        "message":'error',
                        'table':`${table}`,
                        'error':error
                    }) 
                }
            }
        )
    }
}

module.exports = actorDao