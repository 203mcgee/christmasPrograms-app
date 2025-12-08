const connect = require('../../config/dbconfig')

const programDao = {
    table: 'program',
    selectAllDescription: (res,table)=>{
        let sql = `SELECT program_description FROM ${table};`
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
                        "message": "error",
                        "table": `${table}`,
                        'error':error

                    })
                }
            }
        )
    },
    programOrderByRating: (res,table) =>{
        let sql = `SELECT * FROM ${table} ORDER BY rating DESC;`
        connect.execute(
            sql,
            (error,rows)=>{
                if(!error)
                {
                    if(rows.length==1)
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
                        "message": "error",
                        "table": `${table}`,
                        'error':error

                    })
                }
            }
        )
    }
}

module.exports = programDao