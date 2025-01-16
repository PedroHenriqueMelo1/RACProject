const OpenConnection = require('../Model/database')

class QueryUtils {
    TypeQ 
    Params 
    constructor(query, ...params) {
       this.TypeQ = query
       this.Params = params
    }   
   async CheckDataBaseData() {
     const Database = await OpenConnection()

     async function Query(email) {
            return new Promise((resolve, reject) => {
                Database.get('SELECT * FROM USUARIOS WHERE EMAIL = ?' , [email], (err, row)  => {
                        if(err) {
                            reject({error: true, reason: 'ErrorQuery'})
                        } else {
                            if(row == null) {
                                resolve({error: false, reason: 'UserNotFound'})
                            } else {
                                resolve({error: false, reason: 'UserFound'})
                            }
                        }
                })
            })
    
     }

     const Result = await Query()

    
        return Result
    }
}

const DataBaseUtils = new QueryUtils('get')

async function SeeCod() {
  const Result = await DataBaseUtils.CheckDataBaseData('pha.melo262@gmail.com')

  console.log(Result)
}

SeeCod()