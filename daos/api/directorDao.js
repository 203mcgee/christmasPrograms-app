const connect = require('../../config/dbconfig')

const directorDao = {
    table: 'director',
    findByDirectorId: (res,table,id) =>{
        let sql = `SELECT * FROM ${table} WHERE director_id = ${id};`
        connect.execute(
            sql,
            (error,rows)=>{
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
    movie_director: (res,table,id) =>{
        let sql = `select d.fName,d.lName,p.title from ${table} d join program_to_${table} using (${table}_id) join program p using (program_id) where program_id = ${id};`
        connect.execute(
            sql,
            (error,rows)=>{

                

                if(!error)
                {
                    if(rows.length)
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
    directorOrderByAlpha: (res,table)=>{
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

module.exports = directorDao

//   movieDirector : ()=> {
//         `SELECT program.*, director.director
//         FROM program 
//         JOIN program_to_director USING (program_id)
//         JOIN director USING (director_id) 
//         WHERE director.director_id = ${id}`
//     }