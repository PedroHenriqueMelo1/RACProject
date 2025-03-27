    const express = require('express') 
    const App = express()
    const MessageSystem = require('../../../../Controller/ControllReturn')
    const {GetOperations} = require('../../../../Controller/SQLDatabaseCRUD')
    const CreateJwt = require("../../../../Controller/Middleware/Jwt/CreateJwt")
    const cookieParser = require('cookie-parser');


    App.get('', async (req,response) => {
        const Email = req.query.Email || null
        const Password = req.query.Password || null

        const GetUtils = new GetOperations()
    if (GetUtils.VanishQueryParamsBeforeQuery(Email, Password) instanceof MessageSystem) {
        
        MessageSystem.SendResponseToClient({error: true, reason: 'Bad Request, Missing Params', status: 400}, response)
    } else {
           
            const SearchUserInDataBase = await GetUtils.VerifyCredentialsBeforeAcess({Email: Email, Password: Password}).catch(err => {
            
            return  MessageSystem.SendResponseToClient(err, response)

            })



            if(SearchUserInDataBase instanceof MessageSystem) return
                
      
            if(SearchUserInDataBase.reason !== 'UserFound') {
                return MessageSystem.SendResponseToClient(SearchUserInDataBase, response)
            }
      

            const Cookie = CreateJwt(SearchUserInDataBase.role, SearchUserInDataBase.email)

            response.cookie('auth', Cookie, {
                httpOnly: true,        // Impede que o cookie seja acessado via JavaScript
                secure: process.env.NODE_ENV === 'production',  // Só envia o cookie por HTTPS se estiver em produção
                sameSite: 'Strict',    // Previne o envio do cookie em requisições cross-site
                maxAge: 3600000        // Define o tempo de expiração do cookie (1 hora aqui)
              });
              
              
            return response.json({"Response": {error: false, reason: "UserFound", jwt: Cookie}})
        }
    }

    )

    module.exports = App