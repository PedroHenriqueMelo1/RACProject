const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const {InsertOperations, GetOperations} = require('../../../../Controller/SQLDatabaseCRUD')







App.post('', async(req, response) => {

 const {nome_unidade, codigo_unidade} = req.body
 const InsertMethods = new InsertOperations('post')
 const GetMethods = new GetOperations()
   
   if(InsertMethods.VanishQueryParamsBeforeQuery(nome_unidade, codigo_unidade) instanceof MessageSystem) {
        MessageSystem.SendResponseToClient({error: true, reason: 'Bad Request, Missing Params', status: 400}, response)
   } 
   else {
 
   if(SearchUserInDataBase.error == 'ReturnToClient') {
    return;
   }
   console.log(SearchUserInDataBase)

        if(SearchUserInDataBase.reason !== 'UserNotFound') {
            MessageSystem.SendResponseToClient({error: false, message: 'UserAlreadyExists', status: 409}, response)
         } 
         else {
            const StructuredDataToQuery = {
                cpf: cpf,
                nome_completo: nome_completo,
                email: Email,
                senha: Password,
                cargo_hierarquia: perfildeacesso,
                unidade: Unidade,
            }   
       
         
          const InsertResult =  await InsertMethods.CreateUserInDatabase(StructuredDataToQuery).catch(err => {
            MessageSystem.SendResponseToClient(err, response)

            return null
          }) 

           if(InsertResult == null ) {
            return;
           }
            
            else {
                MessageSystem.SendResponseToClient({error: false, message:'RegisterCreated', status: 201}, response)
            }
         }    
   }


  
   
})
 
 


module.exports = App