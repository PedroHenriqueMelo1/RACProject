
const express = require('express') 
const App = express()
const path = require('path')


const FilePath = path.join(__dirname, '..', '..', '..', 'public', 'LandingPage', 'index.html')




App.get('', (req, response) => {
    response.sendFile(FilePath)

} )

module.exports = App