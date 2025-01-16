
const MethodGetDatabaseEndPoint = require('../server/routes/EndPointDataBases/GetDataBase')
const MethodInsertDatabaseEndpoint = require('../server/routes/EndPointDataBases/Insert')
const MethodDeleteDataBaseEndPoint = require('../server/routes/EndPointDataBases/Delete')

function InsertRoutesOnServer(Server) {
   Server.use('/endpoint/db/getData', MethodGetDatabaseEndPoint)
   Server.use('/endpoint/db/InsertUser', MethodInsertDatabaseEndpoint)
   Server.use('/endpoint/db/DeleteUser/', MethodDeleteDataBaseEndPoint)
}

module.exports = InsertRoutesOnServer
