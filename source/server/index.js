const Express = require('express')
const  App = Express()
const MessageSystem = require('../Controller/ControllReturn')
const PORT = 3333
const InsertRoutesOnServer = require('./Router')

App.use(Express.json());


const ListenServer = () => {
    return new Promise((resolve, reject) => {
        App.listen(PORT, (err) => {
            if (err) {
                reject(MessageSystem.SendReturn({ error: true, ErrorMessage: err }, 'Erro'));
            } else {
                resolve(MessageSystem.SendReturn({ error: false, ErrorMessage: null }, 'Servidor iniciado.'));
            }
        });
    });
};

InsertRoutesOnServer(App) // insere rotas no Server
ListenServer() // Coloca oserver no ar.



module.exports = { ListenServer, App };