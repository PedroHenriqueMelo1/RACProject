const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const {AlterOperations} = require('../../../../Controller/SQLDatabaseCRUD')




App.put('', async (req, response) => {
    const {cpf, column, newvalue} = req.body

    const AlterOP = new AlterOperations('put')

    if(AlterOP.VanishQueryParamsBeforeQuery(cpf, column, newvalue) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, reason: 'Bad Request, Missing Params', status: 400}, response)
        return;
   } 

  
          const PutDateQuery = await  AlterOP.AlterUser( cpf, column , newvalue).catch((err) => {
          return MessageSystem.SendResponseToClient(err, response)

          })
          if(PutDateQuery instanceof MessageSystem) {
            return;

          }
          else {
              MessageSystem.SendResponseToClient({PutDateQuery}, response)
          }
       
        }
      )

module.exports = App