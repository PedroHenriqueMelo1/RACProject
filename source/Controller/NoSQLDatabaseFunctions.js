const OpenConnectionMongoDb = require('../Model/database/mongodbOpenConnection')


class MongoDbUtils {
    constructor(database, collection) {
        if(!collection || !collection) {
            throw new Error('Missing params: MongoDb database or collection.')
        }
        this.database = database
        this.collection = collection
    }

     async GerarTokenAdmissao () {
        const TokenUt = {
            GerToken: (tamanho) => {
                const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let resultado = '';
                for (let i = 0; i < tamanho; i++) {
                    const indice = Math.floor(Math.random() * caracteres.length);
                    resultado += caracteres[indice];
                }
                return resultado;
            },
            DateForCollection: () => new Date().toISOString()
        }

        const Token = TokenUt.GerToken(297)

        const DateForCollection = TokenUt.DateForCollection()
        
        return new Promise( async (resolve, reject) => {
            try {
              const Connection = await OpenConnectionMongoDb(this.database, this.collection)  
              
              Connection.insertOne({'Token': Token, 
                'Date': DateForCollection,
                'Validaty': '24'
              }).then((rest) => {
                console.log(`Token criado com sucesso ${Token}`)
                resolve({error: false, reason: 'TokenCreated'})
              }).catch((err) => {
                console.log(`${err}`)
                resolve({error: true, reason: 'TokenIsNotCreated'})
              })
            }
            catch(err) {

            }
        })
  
   
        
    }  
     async DeleteToken(token) {
        if(!token) {
            throw new Error('error: MissingParams, details: Missing Params On Delete Token')
        }
        return new Promise( async (resolve, reject) => {
            const Connection = await OpenConnectionMongoDb(this.database, this.collection)
             Connection.deleteOne({Token: token}).then(() => {
                console.log(`Token ${token} Deletado do banco de dados.`)
                resolve({error: false, reason: 'TokenDeleted'})
            }).catch((err) => {
                reject({error: true, reason: 'TokenNotDeleted', details: err})
            })

        })
     } 
     async CompareTokenWithParams(token) {
        if(!token) {
            throw new Error('error: MissingParams, details: Missing Params On CompareTokens')
        }
      
            return new Promise(async (resolve, reject) => {
               const Connection = await OpenConnectionMongoDb(this.database, this.collection)

              const Result = await Connection.findOne({Token: token}).catch((err) => {
                    reject({error: true, reason: 'QueryError', details: err})
              })  

              if(!Result) {
                resolve({error: false, reason: 'TokenNotFound'})
              } 
              else {
                resolve({error: false, reason: 'TokenFound'})
              }

            })
     }
}

module.exports = MongoDbUtils