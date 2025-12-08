const connect = require('../../config/dbconfig')



const producerDao = {
    table:'producer',
    movieProducer: (res,table,id)=>{
        let sql = ` select p.title,pr.fName,pr.lName from program p join ${table} pr using (${table}_id) where ${table}_id = ${id};`
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
                        'message':'error',
                        'table':`${table}`,
                        'error':error
                    })
                }
            }
        )
    },
    producerAlpha: (res,table) =>{
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
                        'message':'error',
                        'table':`${table}`,
                        'error':error
                    })
                }
            }
        )
    }

}

module.exports = producerDao