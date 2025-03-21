const express = require('express')
const App = express()
const path  = require('path')

const FilePath = path.join(__dirname, '..', '..', '..', '..' ,'public', 'AlffaSystem', 'Login', 'index.html')


App.get('/', (request, response) => {

    response.sendFile(FilePath)
    
})

module.exports = App