
const MessageSystem = require('./ControllReturn')
const sqlite3 = require('sqlite3').verbose();


    class QueryUtils {
    TypeQ 
    Params 
    constructor(query, ...params) {
        
       this.TypeQ = query
       this.Params = params
    }   
    async  OpenConnection() {
        let db = new sqlite3.Database('./BancoDeDadosGeral.db', (err) => {
            if(err) {
                
                console.log(err)
            }
             else {
                
             }
        })
    
        return db
    
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
  
    


      
        

    
    }

    class GetOperations extends QueryUtils {
    constructor() {
        super()
    }


     async getTable(table) {
        const Database = await this.OpenConnection()
        
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
        
            const Database = await this.OpenConnection()
       
            async function Query(email) {
            
                   return new Promise((resolve, reject) => {
                       Database.get('SELECT * From users WHERE (email) = ?', [email] , (err, row)  => {
                                    console.log(row || 'nada')
                               if(err) {
                                   reject({error: true, reason: 'ErrorQuery', status: 500, details: err})
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
       
    async GetAnythingIntoATable(column, value, table) {
        const Database = await OpenConnection()

        try {
            return new Promise((resolve, reject) => {
                Database.get(`SELECT * from ${table} WHERE ${column} VALUES = ?`, [value], (err, row) => {
                    if(err) {
                        reject('Error')
                    } else {

                    }
                } )
            })
        }
        catch(err) {

        }
    }
     

     async VerifyCredentialsBeforeAcess(Credentials) {
        const Database = await this.OpenConnection()

        return new Promise((resolve, reject) => {
            try {
                Database.get(`SELECT * FROM users WHERE (email,password) = (?,?)`, [Credentials.Email, Credentials.Password], (err, row) => {
                    if(err) {
                        reject({error: true, reason: 'ServerError', status: 500})
    
                    }
                        if(row == null) {
                            resolve({error: false, reason: 'UserNotFound', status: 209})
                        }              else {
                            resolve({error: false, reason: 'UserFound', status: 200})
                        }
                })
            }
            catch(err) {

            }
        })
     }
    }
    class InsertOperations extends QueryUtils {
            constructor(query, params) {
                super(query, params)
            }
         async CreateUserInDatabase(Data) {
            const Database = await this.OpenConnection()

            return new Promise((resolve, reject) => {
                try {
                    Database.run(`INSERT Into users (cpf,nome_completo,email, password, cargo,codigo_unidade) VALUES (?,?,?,?,?,?)`, Object.values(Data), (err)  => {
                        if(err) {
                            reject({error: true, reason: 'QueryNotRealized', details: err, status: 500})
                        }
                        else {
                            resolve({error: false, reason: 'QueryRealized', status: 201})
                        }
                    })
                }
                catch(err) {
                    reject({error: true, reason: 'InternalServerError', details: err, status: 500})

                }
            })
        
    }
        async CreateUnidadeInDatabase(Data) {
            const Database = await this.OpenConnection()

            return new Promise((resolve, reject) => {
                try {
                    Database.run(`INSERT Into unidades (nome_unidade, codigo_unidades) VALUES (?,?)`,[Data.nome_unidade, Data.codigo_unidade] , (err)  => {
                        if(err) {
                            reject({error: true, reason: 'QueryNotRealized', details: err, status: 500})
                        }
                        else {
                            resolve({error: false, reason: 'QueryRealized', status: 201})
                        }
                    })
                }
                catch(err) {
                    reject({error: true, reason: 'InternalServerError', details: err, status: 500})

                }
            })
        }
   

        


    }

    class AlterOperations extends QueryUtils {
        constructor() {
            super() 
        }
        async AlterUser(cpf, ColumnsToAlter, NewData) {
            const Database = await this.OpenConnection();
        
            return new Promise((resolve, reject) => {
                try {
                    // Separando as colunas e os novos valores
                    const columns = ColumnsToAlter[0].split(','); // Dividindo a string "email,cargo" em ["email", "cargo"]
                    const values = NewData[0].split(','); // Dividindo a string "pha.melo226@gmail.com, DonoRCA" em ["pha.melo226@gmail.com", "DonoRCA"]
        
                    // Criando a parte SET da query
                    const setClause = columns.map((col, index) => `${col} = ?`).join(', ');
        
                    // O array queryValues deve ter os novos valores seguidos pelo cpf
                    const queryValues = [...values, cpf];
        
                    // Corrigindo a query para refletir a estrutura correta
                    const query = `UPDATE users SET ${setClause} WHERE cpf = ?`;
        
                    // Executando a query
                    Database.run(query, queryValues, (err) => {
                        if (err) {
                            console.log(err);
                            reject({ error: true, reason: 'UnableToPut', details: err });
                        } else {
                            resolve({ error: false, reason: 'DateUpdated' });
                        }
                    });
                } catch (err) {
                    console.log(err);
                    reject({ error: true, reason: 'System', details: err });
                }
            });
        }
        
        
    
 
    }

    class DeleteOperations extends QueryUtils {
        constructor() {
            super()
        }

        async DeleteAUser(cpf) {
            try {
                const Database = await this.OpenConnection();
        
                // Usando a query DELETE para remover o usuário com o CPF fornecido
                return new Promise((resolve, reject) => {
                    const QueryDelete = Database.run(`DELETE FROM USERS WHERE cpf = ?`, [cpf], function (err) {
                        if (err) {
                            // Se ocorrer um erro, rejeita a promessa com o erro
                            reject({ error: true, reason: 'UnableToDelete', details: err, status: 500 });
                        } else {
                            // Verifica se algum registro foi deletado
                            if (this.changes === 0) {
                                // Nenhum registro foi afetado, ou seja, o usuário não foi encontrado
                                resolve({ error: false, reason: 'RegisterNotDeleted', status: 500 });
                            } else {
                                // Sucesso na deleção
                                resolve({ error: false, reason: 'RegisterDeleted' });
                            }
                        }
                    });
        
                    // O console.log pode ser útil para debug, mas não deve retornar a query diretamente;
                });
            } catch (err) {
                // Caso ocorra um erro durante a conexão ou outra parte do processo, rejeita a promessa com detalhes
                return Promise.reject({ error: true, reason: 'UnableToDelete', status: 500, details: err });
            }
        }   

        async DeleteUnidade(codigo_unidade) {
            try {
                const Database = await this.OpenConnection();
        
                // Usando a query DELETE para remover o usuário com o CPF fornecido
                return new Promise((resolve, reject) => {
                    const QueryDelete = Database.run(`DELETE FROM Unidades WHERE codigo_unidade = ?`, [codigo_unidade], function (err) {
                        if (err) {
                            // Se ocorrer um erro, rejeita a promessa com o erro
                            reject({ error: true, reason: 'UnableToDelete', details: err, status: 500 });
                        } else {
                            // Verifica se algum registro foi deletado
                            if (this.changes === 0) {
                                // Nenhum registro foi afetado, ou seja, o usuário não foi encontrado
                                resolve({ error: false, reason: 'RegisterNotDeleted', status: 500 });
                            } else {
                                // Sucesso na deleção
                                resolve({ error: false, reason: 'RegisterDeleted' });
                            }
                        }
                    });
        
                    // O console.log pode ser útil para debug, mas não deve retornar a query diretamente;
                });
            } catch (err) {
                // Caso ocorra um erro durante a conexão ou outra parte do processo, rejeita a promessa com detalhes
                return Promise.reject({ error: true, reason: 'UnableToDelete', status: 500, details: err });
            }
        }
       
    }


 




module.exports = {GetOperations, AlterOperations, InsertOperations, DeleteOperations}