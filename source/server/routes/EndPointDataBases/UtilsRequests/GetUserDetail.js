const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const verifyJWT = require('../../../../Controller/Middleware/Jwt/UserDetails')




App.get('', async (req, response) => {
   
  
    const Token = req.query.token   


    const decoded = verifyJWT(Token)

    


    response.send(decoded)
        
       
        
})
module.exports = App