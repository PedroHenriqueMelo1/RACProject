const OpenConnection = require('../../../Model/database/index')
const express = require('express') 
const App = express()
const MessageSystem = require('../../../Controller/ControllReturn')
const QueryUtils = require('../../../Controller/QueryDatabase')
const { ERROR } = require('sqlite3')



App.delete('', async(req, response) => { 
    const {Email} = req.body
    
    const DatabaseUtils = new QueryUtils('delete')

    if(DatabaseUtils.VanishQueryParamsBeforeQuery(Email) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
   } else {
    const SearchUserInDataBase =  await DatabaseUtils.CheckDataBaseData(Email)
  

        if(SearchUserInDataBase.reason !== 'UserFound') {
            MessageSystem.SendResponseToClient({error: false, message: 'UserNotFound', status: 409}, response)
         } 
         else {
            const DeleteQuery = await DatabaseUtils.DeleteARowInDatabase(Email)

            console.log(DeleteQuery)

            if(DeleteQuery.error !== false) {
                MessageSystem.SendResponseToClient({error: true, message: 'UserNotDeleted', status: 404}, response)
            } else {
                MessageSystem.SendResponseToClient({error: false, message:'UserDeleted', status: 200}, response)
            }
         }
   }
})


module.exports = App