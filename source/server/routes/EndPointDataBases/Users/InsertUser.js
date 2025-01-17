const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/QueryDatabase')







App.post('', async(req, response) => {

 const {User, Email, Password, Number, Unidade, perfildeacesso} = req.body
 const DatabaseUtils = new QueryUtils('post')

   if(DatabaseUtils.VanishQueryParamsBeforeQuery(User,Email,Password,Number,Unidade,perfildeacesso) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
   } 
   else {

   const SearchUserInDataBase =  await DatabaseUtils.VerifyEmailAlreadyExists(Email)

        if(SearchUserInDataBase.reason !== 'UserNotFound') {
            MessageSystem.SendResponseToClient({error: false, message: 'UserAlreadyExists', status: 409}, response)
         } 
         else {
            const StructuredDataToQuery = {
                email: Email,
                senha: Password,
                usuario: User,
                telefone: Number,
                unidade: Unidade,
                cargo_hierarquia: perfildeacesso
            }
         
          const InsertResult =  await DatabaseUtils.CreateARowInDataBase(DatabaseUtils.AnalyseParamsAndReturnQuery('User', StructuredDataToQuery, 'Insert'))
            if(InsertResult.error !== false) {
                MessageSystem.SendResponseToClient({error: true, message: 'UserNotDeleted', status: 404}, response)
            } else {
                MessageSystem.SendResponseToClient({error: false, message:'RegisterCreated', status: 201}, response)
            }
         }    
   }


  
   
})
 
 


module.exports = App