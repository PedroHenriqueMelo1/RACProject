const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/SQLDatabaseCRUD')



App.get('',  async (req, response) => {
const DatabaseUtils = new QueryUtils



    const Table = req.query.table

        if(DatabaseUtils.VanishQueryParamsBeforeQuery(Table) instanceof MessageSystem) {
            MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
         
        } 
        else {
         const QueryTable = await  DatabaseUtils.getTable(Table)

         response.send(QueryTable)
        }

})

module.exports = App