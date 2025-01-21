
const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const TokenService = require('../../../../Controller/NoSQLDatabaseFunctions')
const QueryUtils = require('../../../../Controller/SQLDatabaseCRUD')

App.delete('', async (req , response) => {

const {Token} = req.body

const DatabaseUtils = new QueryUtils()

if(DatabaseUtils.VanishQueryParamsBeforeQuery(Token) instanceof MessageSystem) {
    MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
    return;
}  else {
    const TokenServ = new TokenService('TokenForNewUsers', 'TokenForAuthentication')

    const InsertResult = await TokenServ.DeleteToken(Token).catch((err) => {
        return err
    })

    
        response.send(InsertResult)
}


  
    
})

module.exports = App