const OpenConnection = require('../../../Model/database/index')
const express = require('express') 
const App = express()
const MessageSystem = require('../../../Controller/ControllReturn')


function VanishQueryParamsBeforeQuery(...params) {
   
    for(let param of params) {
        if  (param == null) {
            return new MessageSystem()
        }
    }
    return null
 
}






App.get('', async (req,response) => {
    const Email = req.query.Email || null
    const Password = req.query.Password || null


   if (VanishQueryParamsBeforeQuery(Email, Password) instanceof MessageSystem) {
       MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
   } else {
      await QueryDatabase(Email, Password)
   }
}

)

module.exports = App