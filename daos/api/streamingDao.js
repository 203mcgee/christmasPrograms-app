const connect = require('../../config/dbconfig')

const streamingDao = {
    table:'streaming_platform',
    movieOnStreaming: (res,table,id) =>{
        let sql = ` select p.title,st.streaming_platform from program p join program_to_streaming using (program_id) join ${table} st using (${table}_id) where program_id = ${id};`
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
    streamingAlphabetical: (res,table) => {
        let sql = `SELECT * FROM ${table} ORDER BY ${table}`
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
    }
}

module.exports = streamingDao