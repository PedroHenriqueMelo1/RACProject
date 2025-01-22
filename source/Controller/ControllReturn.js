
class MessageSystem {
 static SendReturn(result, msg) {
  if(result.error == true) {
    return {Stts: false, message: result.error}
  } 
  else {
    console.log(`${msg}`)
    return {Stts: true, message: msg}
  } 
 } 
  static SendResponseToClient(Response, ReturnRouter = null) {
 if(!ReturnRouter) {
throw new Error('Missing params for SendResponseToClient: Response')
 }

    if(Response.error == true) {
   
      Response.status = Response.status ?? 500
       ReturnRouter.status(Response.status ).json({error: 'true', message: Response.reason, details: Response.details || 'Não atribuido'})
    } else {
      Response.status = Response.status ?? 201
      ReturnRouter.status(Response.status).json({Response})
    }
  }

  static DataBaseResponses(querytype, ReturnRouter = null) {
    if(querytype == 'get') {
      
    }
  }

}

module.exports = MessageSystem