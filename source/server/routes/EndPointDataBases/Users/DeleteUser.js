
const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/QueryDatabase')



App.delete('', async(req, response) => { 
    const {codigo_unidade} = req.body
    
    const DatabaseUtils = new QueryUtils('delete')

    if(DatabaseUtils.VanishQueryParamsBeforeQuery(codigo_unidade) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
   } else {
    const SearchUserInDataBase =  await DatabaseUtils.VerifyUnidadeAlreadyExists(codigo_unidade)
  

        if(SearchUserInDataBase.reason !== 'Found') {
            MessageSystem.SendResponseToClient({error: false, message: 'UnidadeNotFound', status: 409}, response)
         } 
         else {
            const DeleteQuery = await DatabaseUtils.DeleteARowInDatabase(codigo_unidade)

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