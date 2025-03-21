const express = require('express')
const App = express()
const VerifyJwt = require('../../../../Controller/Middleware/CheckTokenBeforeAcessAdmissao')


App.get('/', (request, response) => {
  response.send('Olá 1320312')
})

module.exports = App