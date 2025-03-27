const express = require('express')
const App = express()
const VerifyJwt = require('../../../../Controller/Middleware/CheckTokenBeforeAcessAdmissao')
const path = require('path')

const FilePath = path.join(__dirname, '..', '..', '..', '..', 'public', 'AlffaSystem', 'AlffaUnidade' ,'PerfisDeAcessoComponentes', 'Unidade',)


App.get('/', (request, response) => {
  
  const PROFILEUSER = request.user

  

  if(PROFILEUSER.role == 'Coordenador') {
     response.sendFile(path.join(FilePath, 'Coordenador.html'))
  } else if (PROFILEUSER.role == 'Usuario') {
    response.sendFile(path.join(FilePath, 'UsuarioComum.html'))
  }
  else if (PROFILEUSER.role == 'GerenteRCA') {
    response.sendFile(path.join(FilePath, 'GerenteRCA.html'))  
  }
})

module.exports = App