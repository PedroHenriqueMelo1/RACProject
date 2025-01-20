const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/SQLDatabaseCRUD')


App.delete('', async(req, response) => { 
    const {codigo_unidade} = req.body
    
    const DatabaseUtils = new QueryUtils('delete')

    if(DatabaseUtils.VanishQueryParamsBeforeQuery(codigo_unidade) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
   } else {

    const SearchUnidadeInDatabase =  await DatabaseUtils.VerifyUnidadeAlreadyExists(codigo_unidade)
     

        if(SearchUnidadeInDatabase.reason !== 'Found') {
            MessageSystem.SendResponseToClient({error: false, message: 'UnidadeNotFound', status: 409}, response)
         } 
         else {
            const DeleteQuery = await DatabaseUtils.DeleteARowInDatabase(codigo_unidade, 'unidades', 'codigo_unidade').catch((err) => {
                  
            
                return err
            })


            if(DeleteQuery.error !== false) {
                MessageSystem.SendResponseToClient({error: true, message: 'UnidadeNotDeleted', status: 40, details: DeleteQuery.details}, response)
            } else {
                MessageSystem.SendResponseToClient({error: false, message:'UnidadeDeleted', status: 200}, response)
            }
         }
   }
})


module.exports = App