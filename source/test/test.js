const QueryUtils = require('../Controller/QueryDatabase')




const Query = new QueryUtils

async function FetchData() {
    
 const resultquery = await  Query.VerifyEmailAlreadyExists('pha.2324@gmail.com')

 console.log(resultquery)

}
FetchData()
