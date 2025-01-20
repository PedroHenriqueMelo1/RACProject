const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/SQLDatabaseCRUD')




App.get('', async (req,response) => {
    const Email = req.query.Email || null
    const Password = req.query.Password || null

    const DatabaseUtils = new QueryUtils('get')
   if (DatabaseUtils.VanishQueryParamsBeforeQuery(Email, Password) instanceof MessageSystem) {
       MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
   } else {
     

          const SearchUserInDataBase = await  DatabaseUtils.VerifyEmailAlreadyExists(Email)

            response.send(SearchUserInDataBase)

      
   }
}

)

module.exports = App