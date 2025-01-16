
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
    if(Response.error == true) {
       ReturnRouter.status(Response.status).json({error: 'Missing Params', message: Response.message})
    }
  }

  static DataBaseResponses(querytype, ReturnRouter = null) {
    if(querytype == 'get') {
      
    }
  }

}

module.exports = MessageSystem