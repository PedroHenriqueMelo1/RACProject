const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const {AlterOperations} = require('../../../../Controller/SQLDatabaseCRUD')




App.get('', async (req, response) => {
   

    const PROFILEUSER = request.user


    response.send(PROFILEUSER)
        
       
        
})
module.exports = App