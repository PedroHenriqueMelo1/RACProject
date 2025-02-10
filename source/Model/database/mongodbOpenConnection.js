const { MongoClient } = require('mongodb'); 
const {NoSQLOperations} = require('../../Controller/SQLDatabaseCRUD')
async function OpenConnectionMongoDb(database, collectionName) {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    try {
        console.log('taporra')
        await client.connect();
        console.log(`Conectado ao MongoDB`);

        const db = client.db(database); // Acessa o banco de dados
        const collection = db.collection(collectionName); // Acessa a coleção específica
         
         return collection
    } catch (err) {
        console.log(`Deu erro: ${err}`);
    } finally {
      
    }
}



  

class AuthNewUser {
    constructor() {

    }
    async newToken() {
      const Token = AuthNewUser.#gerNumToken()



        
     }
     static  #InsertTokenInDatabase() {

     }

   static  #gerNumToken() {       
         // Gera um número aleatório com 15 dígitos
            
            let numero = Math.floor(Math.random() * 9e14) + 1e14;

             // Garante que o número seja de 15 dígitos sem zeros à esquerda
            return numero.toString();
        
          }
     }



    module.exports = OpenConnectionMongoDb

// OpenConnectionMongoDb('TokenForNewUsers', 'TokenForAuthentication'); // Passando o nome da coleção
