const express = require('express') 
const App = express()
const MessageSystem = require('../../../../Controller/ControllReturn')
const QueryUtils = require('../../../../Controller/SQLDatabaseCRUD')

App.post('', async(req, response) => {

    const {nome_unidade, codigo_unidade} = req.body

    const DatabaseUtils = new QueryUtils('post')
   
      if(DatabaseUtils.VanishQueryParamsBeforeQuery(nome_unidade, codigo_unidade) instanceof MessageSystem) {
           MessageSystem.SendResponseToClient({error: true, message: 'Bad Request, Missing Params', status: 400}, response)
      } else {

        const StructuredDataToQuery = {
            unidade: nome_unidade,
            codigo_unidade: codigo_unidade
        
        }

       const InsertResult = await DatabaseUtils.CreateARowInDataBase(StructuredDataToQuery, DatabaseUtils.AnalyseParamsAndReturnQuery('unidades', StructuredDataToQuery, 'insert')).catch((err) => {

        return {error: true, message:'Registro não criado'}
       })

       if(InsertResult.error !== false) {
             MessageSystem.SendResponseToClient({error: true, message: 'RegisterNotCreated', status: 500}, response)
        } else {
            MessageSystem.SendResponseToClient({error: false, message:'RegisterCreated', status: 201}, response)
         }
       
      }

       }
    )


    module.exports = App