const OpenConnection = require('../Model/database')
const MessageSystem = require('../Controller/ControllReturn')
class QueryUtils {
    TypeQ 
    Params 
    constructor(query, ...params) {
       this.TypeQ = query
       this.Params = params
    }   
   async CheckDataBaseData(email) {
     const Database = await OpenConnection()

     async function Query(email) {
            return new Promise((resolve, reject) => {
                Database.get('SELECT * FROM usuarios WHERE email = ?' , [email], (err, row)  => {
                    console.log(row || 'Nao tem porra nenhuma')
                        if(err) {
                            reject({error: true, reason: 'ErrorQuery'})
                        } else {
                            if(row == null) {
                                resolve({error: false, reason: 'UserNotFound', query: 'false'})
                            } else {
                                resolve({error: false, reason: 'UserFound', query: 'true'})
                            }
                        }
                })
            })
    
     }

     const Result = await Query(email)

    
        return Result
    }

     VanishQueryParamsBeforeQuery(...params) {
       
        for(let param of params) {
            if  (param == null) {
                return new MessageSystem()
            }
        }
        return null
     
    }
    async CreateARowInDataBase(Email,Password,User,Number,Unidade,cargo_hierarquia) {
        const Database = await OpenConnection()
  
    return new Promise((resolve, reject) => {
        Database.run('INSERT INTO usuarios (email, senha, usuario, telefone, Unidade, cargo_hierarquia) VALUES (?,?,?,?,?,?)', [Email, Password, User, Number, Unidade, cargo_hierarquia], (err) => {
            if(err) {
                reject({error: true, reason: 'UnableInsertUser'})
            }
            else {
               resolve({error: false, reason: 'UserCreated'})
            }
     })


    })
         
    }
    
    async DeleteARowInDatabase(Email) {
        const Database = await OpenConnection()

     
            return new Promise((resolve,reject) => {
             Database.run('DELETE FROM usuarios WHERE email = ?', [Email], (err) => {
                if(err) {
                    reject({error: true, reason:'UnableToDelete'})
                }
                else {
                    resolve({error: false, reason:'RegisterDeleted'})
                }
             })
            })
        }
        

    
}


module.exports = QueryUtils
