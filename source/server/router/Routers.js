
const MethodGetDatabaseEndPoint = require('../routes/EndPointDataBases/GetDataBase')


function InsertRoutesOnServer(Server) {
   Server.use('/db/getData', MethodGetDatabaseEndPoint)
}

module.exports = InsertRoutesOnServer
