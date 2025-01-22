
const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const {DeleteOperations} = require('../../../../Controller/SQLDatabaseCRUD')



App.delete('', async(req, response) => { 
    const {codigo_unidade} = req.body
    
    const DelOperations = new DeleteOperations('delete')

    if(DelOperations.VanishQueryParamsBeforeQuery(codigo_unidade) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, reason: 'Bad Request, Missing Params', status: 400}, response)
   } else {
    const DeleteUserInDatabase =  await DelOperations.DeleteUnidade(codigo_unidade).catch((err) => {
        console.log('deu erro')
        return MessageSystem.SendResponseToClient(err, response)
    })
   
    if(DeleteUserInDatabase instanceof MessageSystem) {
      
        return  ;

    }   
    else {
        MessageSystem.SendResponseToClient(DeleteUserInDatabase, response)
    }

      
   }
})


module.exports = App