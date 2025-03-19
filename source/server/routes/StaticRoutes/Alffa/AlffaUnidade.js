const express = require('express') 
const App = express()
const path = require('path')


const AlffaUi = path.join(__dirname, '..', '..', '..', '..', 'public', 'AlffaSystem', 'AlffaUnidade', 'PerfisDeAcessoComponentes', 'UsuarioComum.html')




App.get('', (req, response) => {
    response.sendFile(AlffaUi)

} )

module.exports = App