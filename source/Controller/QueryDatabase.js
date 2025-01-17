const OpenConnection = require('../Model/database')
const MessageSystem = require('../Controller/ControllReturn')


class GetOperations {
    

    constructor() {

    }

     async getTable(table) {
        const Database = await OpenConnection()
        
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table}`

            Database.all(query, (err, row) => {
                if(err) {
                    console.log(err)
                    reject({error: true, reason: 'UnableGetTable'})
                } 
                if(row == null) {
                    reject({error: true, reason: 'NoRow'})
                }
                resolve(({error: false, reason: 'Ok', data: row}))
            })
        })
     }

    

     async VerifyUnidadeAlreadyExists(codigo_unidade) {

        const Database = await OpenConnection()
       
        async function Query(codigo_unidade) {
               return new Promise((resolve, reject) => {
                   Database.get('SELECT * From unidades WHERE (codigo_unidade) = ?', [codigo_unidade] , (err, row)  => {

                           if(err) {
                               reject({error: true, reason: 'ErrorQuery'})
                           } else {
                               if(row == null) {
                                   resolve({error: false, reason: 'NotFound', query: 'false'})
                               } else {
                                   resolve({error: false, reason: 'Found', query: 'true'})
                               }
                           }
                   })
               })
       
        }
   
        const Result = await Query(codigo_unidade)
   
    
       
           return Result

     }

     async VerifyEmailAlreadyExists(email) {
        
            const Database = await OpenConnection()
       
            async function Query(email) {
                   return new Promise((resolve, reject) => {
                       Database.get('SELECT * From usuarios WHERE (email) = ?', [email] , (err, row)  => {
    
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
       
        
     

     async VerifyCredentialsBeforeAcess() {

     }
    }


class QueryUtils  extends GetOperations{
    TypeQ 
    Params 
    constructor(query, ...params) {
        super()
       this.TypeQ = query
       this.Params = params
    }   
     AnalyseParamsAndReturnQuery(tabela, Data, Method) {
        const Methods = {
            'INSERT': () => {
                const Query = `INSERT INTO ${tabela} (${Object.keys(Data).join(',')}) VALUES (${Object.keys(Data).map(() => '?').join(',')})`;
                return Query
            },
           
        }

         if(Method == 'insert') {
            
            return Methods.INSERT()
           
         }
  

    }


     VanishQueryParamsBeforeQuery(...params) {
      
        for(let param of params) {

          
            if  (param == null || Object.entries(param) <= 0) {
    
                return new MessageSystem()
            }
        }
        return null
     
    }
    async CreateARowInDataBase(Data, query) {
        try {
        const Database = await OpenConnection()

  
    return new Promise((resolve, reject) => {

        Database.run(query, Object.values(Data), (err) => {
            if(err) {
                console.log(err)
                reject({error: true, reason: 'UnableInsert'})
            }
            else {
               resolve({error: false, reason: 'UserCreated'})
            }
     })


    })
}
catch(err) {
    return { error: true, reason: 'InternalError', details: err.message };
}
    }
    
    async DeleteARowInDatabase(Data, Table) {
        const Database = await OpenConnection()

     
            return new Promise((resolve,reject) => {
             Database.run(`DELETE FROM  WHERE ${Table} = ?`, [Data], (err) => {
                if(err) {
                    reject({error: true, reason:'UnableToDelete'})
                }
                else {
                    resolve({error: false, reason:'RegisterDeleted'})
                }
             })
            })
        }

        async PutRowInDatabase(Params, table) {
                
       

            const Database = await OpenConnection();
        
            return new Promise((resolve, reject) => {
                console.log(Params);
        
                // Corrigindo a forma de concatenar a query e passando o array de valores corretamente.
                const query = `UPDATE usuarios SET ${Params.Column} = ? WHERE email = ?`;
                Database.run(query, [Params.NewValue, Params.email], (err) => {
                    if (err) {
                        reject({ error: true, reason: 'UnableToPut' });
                    } else {
                        resolve({ error: false, reason: 'DateUpdated' });
                    }
                });
            });
        }
        

    
}





module.exports = QueryUtils
