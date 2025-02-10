
const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const TokenService = require('../../../../Controller/NoSQLDatabaseFunctions')
const QueryUtils = require('../../../../Controller/SQLDatabaseCRUD')

App.post('', async (req , response) => {

const {Validaty, EmitedDate} = req.body

const DatabaseUtils = new QueryUtils()

if(DatabaseUtils.VanishQueryParamsBeforeQuery(Validaty, EmitedDate) instanceof MessageSystem) {
    MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
    return;
}  else {
    const TokenSe = new TokenService('TokenForNewUsers', 'TokenForAuthentication')
    
    const InsertResult = await TokenSe.GerarTokenAdmissao().catch((err) => {
        return err
    })


    
  response.send(InsertResult)
}


  
    
})

module.exports = App