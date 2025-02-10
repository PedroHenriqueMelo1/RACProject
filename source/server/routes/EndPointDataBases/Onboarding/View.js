
const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const MongoDbFunctions = require('../../../../Controller/NoSQLDatabaseFunctions')
const CheckTokenBeforeAcess = require('../../../../Controller/Middleware/CheckTokenBeforeAcessAdmissao')

App.get('', CheckTokenBeforeAcess, async (req , response) => {
 
    console.log('Middleware táv perfeito!')
    
})

module.exports = App