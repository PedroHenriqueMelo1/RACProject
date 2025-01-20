const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/SQLDatabaseCRUD')




App.put('', async (req, response) => {
    const {novo_nome, codigo_unidade} = req.body

    const DatabaseUtils = new QueryUtils('put')

    if(DatabaseUtils.VanishQueryParamsBeforeQuery(novo_nome, codigo_unidade) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
        return;
   } 
   const SearchUserInDataBase =  await DatabaseUtils.VerifyUnidadeAlreadyExists(codigo_unidade)

  console.log(SearchUserInDataBase)
  

       if(SearchUserInDataBase.reason !== 'Found') {
           MessageSystem.SendResponseToClient({error: false, message: 'UnidadeNotFound', status: 409}, response)
        } 
        else { 
          const PutDateQuery = await  DatabaseUtils.PutRowInDatabase({Column: 'unidade', NewValue: novo_nome, PK: 'codigo_unidade', PKValue: codigo_unidade}, 'unidades')

          if(PutDateQuery.error == true) {
            MessageSystem.SendResponseToClient({error:true, message:'UnableToPut', status: 401}, response)
          } else {
            MessageSystem.SendResponseToClient({error: false, message: 'PutOk', status: 201}, response)
          }
        }
})

module.exports = App