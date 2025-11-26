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
    countAll: (req,res,table) =>{
        connect.query(

        )
    },
    


}

module.exports = daoCommon