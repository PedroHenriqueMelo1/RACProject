
const { MongoClient } = require('mongodb'); 


class MongoDbUtils {

    async OpenConnectionMongoDb(database, collectionName) {
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
    
        try {

            await client.connect()
            console.log(`Conectado ao MongoDB`);
    
            const db = client.db(database); // Acessa o banco de dados
            const collection = db.collection(collectionName); // Acessa a coleção específica
             
             return collection
        } catch (err) {
            console.log(`Deu erro: ${err}`);
        } finally {
          
        }
    }
  
}


class TokenService extends MongoDbUtils {
  constructor(database, collection) {
    super()
    if (!collection || !collection) {
      throw new Error("Missing params: MongoDb database or collection.");
    }
    this.database = database;
    this.collection = collection;
  }

  async GerarTokenAdmissao() {
    
    const TokenUt = {
      GerToken: (tamanho) => {
        const caracteres =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let resultado = "";
        for (let i = 0; i < tamanho; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          resultado += caracteres[indice];
        }
        return resultado;
      },
      DateForCollection: () => new Date().toISOString(),
    };

    const Token = TokenUt.GerToken(196);

    const DateForCollection = TokenUt.DateForCollection();

    return new Promise(async (resolve, reject) => {
      try {
        const Connection = await this.OpenConnectionMongoDb(
          this.database,
          this.collection
        )
    
        Connection.insertOne({
          Token: Token,
          Date: DateForCollection,
          Validaty: "24",
        })
          .then((rest) => {
            console.log(`Token criado com sucesso ${Token}`);
            resolve({ error: false, reason: "TokenCreated", Token: Token });
          })
          .catch((err) => {
            console.log(`${err}`);
            resolve({ error: true, reason: "TokenIsNotCreated" });
          });
      } catch (err) {}
    });
  }

  async DeleteToken(token) {
    if (!token) {
      throw new Error(
        "error: MissingParams, details: Missing Params On Delete Token"
      );
    }
    console.log(`nossa oq está havenod aqui ${token}`);
    return new Promise(async (resolve, reject) => {
      const Connection = await this.OpenConnectionMongoDb(
        this.database,
        this.collection
      );
      const QueryResult = await Connection.deleteOne({ Token: String(token) });

      console.log(QueryResult.deletedCount);

      if (QueryResult.deletedCount === 0) {
        resolve({ error: false, reason: "TokenNotDeleted" });
      }

      console.log(`Token ${token} Deletado do banco de dados.`);
      resolve({ error: false, reason: "TokenDeleted" });
    });
  }

  async CompareTokenWithParams(token) {
    if (!token) {
      throw new Error(
        "error: MissingParams, details: Missing Params On CompareTokens"
      );
    }

    console.log(String(token));
    return new Promise(async (resolve, reject) => {
      const Connection = await this.OpenConnectionMongoDb(
        this.database,
        this.collection
      );

      console.log(token);

      const Result = await Connection.findOne({ Token: String(token) }).catch(
        (err) => {
          reject({ error: true, reason: "QueryError", details: err });
        }
      );

      if (!Result) {
        resolve({ error: false, reason: "TokenNotFound" });
      } else {
        resolve({ error: false, reason: "TokenFound" });
      }
    });
  }
}

module.exports = TokenService;
