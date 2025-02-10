
const TokenService = require('../NoSQLDatabaseFunctions')


const CheckTokenBeforeAcess = async(request, response, next) => {
    
 const  {acessToken} = request.query

    if(!acessToken) {
  
        return response.status(404).send('Página não encontrada');

    }

try {
 const DatabaseCrud = new TokenService('TokenForNewUsers', 'TokenForAuthentication')
         

   const QueryTokenResult = await DatabaseCrud.CompareTokenWithParams(acessToken)


   if(QueryTokenResult.reason !== 'TokenFound') {
     return response.status(400).send('Invalid token.')
   } 
   else {
    next();
   }
}
catch(err) {
    console.log(err)
    response.status(501).send(`Internal server error.`)
}

}

module.exports = CheckTokenBeforeAcess