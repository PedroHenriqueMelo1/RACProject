const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const {GetOperations} = require('../../../../Controller/SQLDatabaseCRUD')




App.get('', async (req,response) => {
    const Email = req.query.Email || null
    const Password = req.query.Password || null

    const GetUtils = new GetOperations()
   if (GetUtils.VanishQueryParamsBeforeQuery(Email, Password) instanceof MessageSystem) {
       MessageSystem.SendResponseToClient({error: true, reason: 'Bad Request, Missing Params', status: 400}, response)
   } else {
     
    
          const SearchUserInDataBase = await GetUtils.VerifyCredentialsBeforeAcess({Email: Email, Password: Password}).catch(err => {
          return  MessageSystem.SendResponseToClient(err, response)

          })

          if(SearchUserInDataBase instanceof MessageSystem) return
         
           response.send(SearchUserInDataBase)

      
   }
}

)

module.exports = App