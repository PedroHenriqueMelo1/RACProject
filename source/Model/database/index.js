const sqlite3 = require('sqlite3').verbose();

async function OpenConnection() {
    let db = new sqlite3.Database('./BancoDeDadosGeral.db', (err) => {
        if(err) {
            
            console.log(err)
        }
         else {
            console.log(`Banco de dados criado com sucesso!`)
         }
    })

    return db
}

module.exports = OpenConnection