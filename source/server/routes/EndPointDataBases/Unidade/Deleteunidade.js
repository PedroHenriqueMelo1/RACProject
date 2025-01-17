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

    const SearchUserInDataBase =  await DatabaseUtils.CheckDataBaseData(Email)
  

        if(SearchUserInDataBase.reason !== 'UserFound') {
            MessageSystem.SendResponseToClient({error: false, message: 'UserNotFound', status: 409}, response)
         } 
         else {
            const DeleteQuery = await DatabaseUtils.DeleteARowInDatabase(codigo_unidade, unidades)

            if(DeleteQuery.error !== false) {
                MessageSystem.SendResponseToClient({error: true, message: 'UnidadeDeleted', status: 404}, response)
            } else {
                MessageSystem.SendResponseToClient({error: false, message:'UnidadeNotDeleted', status: 200}, response)
            }
         }
   }
})


module.exports = App