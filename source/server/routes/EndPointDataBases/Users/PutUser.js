const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/QueryDatabase')




App.put('', async (req, response) => {
    const {Email, column, value} = req.body

    const DatabaseUtils = new QueryUtils('put')

    if(DatabaseUtils.VanishQueryParamsBeforeQuery(Email, column, value) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
        return;
   } 
   const SearchUserInDataBase =  await DatabaseUtils.CheckDataBaseData(Email)
   console.log(SearchUserInDataBase)     

       if(SearchUserInDataBase.reason == 'UserNotFound') {
           MessageSystem.SendResponseToClient({error: false, message: 'UserDontExists', status: 409}, response)
        } 
        else { 
          const PutDateQuery = await  DatabaseUtils.PutRowInDatabase({email: Email, Column: column, NewValue: value})

          if(PutDateQuery.error == true) {
            MessageSystem.SendResponseToClient({error:true, message:'UnableToPut', status: 401}, response)
          } else {
            MessageSystem.SendResponseToClient({error: false, message: 'PutOk', status: 201}, response)
          }
        }
})

module.exports = App