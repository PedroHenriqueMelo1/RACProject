const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const {GetOperations} = require('../../../../Controller/SQLDatabaseCRUD')




App.get('', async (req,response) => {
    const TableOrRow = req.query.TableOrRow || null

    const GetUtils = new GetOperations()
   if (GetUtils.VanishQueryParamsBeforeQuery(TableOrRow) instanceof MessageSystem) {
       MessageSystem.SendResponseToClient({error: true, reason: 'Bad Request, Missing Params', status: 400}, response)
   } else {
     
    
        if(TableOrRow == 1)  {
          const QueryTable = await GetUtils.getTable('unidades').catch((err) => {
            console.log(err)
            return new  MessageSystem({err}, response)
          })
            MessageSystem.SendResponseToClient(QueryTable, response)
        } else {
            // registro unico.
        }

         
     
      
   }
}

)

module.exports = App