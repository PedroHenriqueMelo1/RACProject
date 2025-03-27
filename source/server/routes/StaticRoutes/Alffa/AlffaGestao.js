const express = require('express')
const App = express()
const VerifyJwt = require('../../../../Controller/Middleware/CheckTokenBeforeAcessAdmissao')
const path = require('path')

const FilePath = path.join(__dirname, '..', '..', '..', '..', 'public', 'AlffaSystem', 'AlffaGestao' ,'PerfisDeAcesso')


App.get('/', (request, response) => {
  
  const PROFILEUSER = request.user



  if(PROFILEUSER.role == 'Coordenador') {
     response.sendFile(path.join(FilePath, 'Coordenador', 'index.html'), {
     
     })
  } else if (PROFILEUSER.role == 'Usuario') {
    
    response.send(`NÃO AUTORIZADO!!`)
  }
  else if (PROFILEUSER.role == 'GerenteRCA') {
    response.sendFile(path.join(FilePath, 'GerenteRCA', 'index.html'))  
  }
})

module.exports = App