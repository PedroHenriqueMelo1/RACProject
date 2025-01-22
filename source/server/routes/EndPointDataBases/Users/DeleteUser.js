
const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const {DeleteOperations} = require('../../../../Controller/SQLDatabaseCRUD')



App.delete('', async(req, response) => { 
    const {cpf} = req.body
    
    const DelOperations = new DeleteOperations('delete')

    if(DelOperations.VanishQueryParamsBeforeQuery(cpf) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, reason: 'Bad Request, Missing Params', status: 400}, response)
   } else {
    const DeleteUserInDatabase =  await DelOperations.DeleteAUser(cpf).catch((err) => {
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