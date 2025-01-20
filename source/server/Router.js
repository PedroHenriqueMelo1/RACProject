
const MethodGetDatabaseEndPoint = require('./routes/EndPointDataBases/Users/GetDataBase')
const MethodInsertDatabaseEndpoint = require('./routes/EndPointDataBases/Users/InsertUser')
const MethodDeleteDataBaseEndPoint = require('./routes/EndPointDataBases/Users/DeleteUser')
const MethodPutDataBaseEndpoint = require('./routes/EndPointDataBases/Users/PutUser')
const MethodGetUnidadesEndpoint = require('./routes/EndPointDataBases/Unidade/GetUnidade')
const MethodPostUnidadesEndpoint = require('./routes/EndPointDataBases/Unidade/InsertUnidade')
const MethodDeleteUnidadesEndpoint = require('./routes/EndPointDataBases/Unidade/Deleteunidade')
const MethodAlterUnidadesEndPoint = require('./routes/EndPointDataBases/Unidade/AlterUnidade')
const ViewAdmissaoUsers = require('./routes/EndPointDataBases/AdmissaoEndpoint/View')

function InsertRoutesOnServer(Server) {
   Server.use('/endpoint/db/user', MethodGetDatabaseEndPoint)
   Server.use('/endpoint/db/user', MethodInsertDatabaseEndpoint)
   Server.use('/endpoint/db/user', MethodDeleteDataBaseEndPoint)
   Server.use('/endpoint/db/user', MethodPutDataBaseEndpoint)
   Server.use('/endpoint/db/unidades', MethodGetUnidadesEndpoint),
   Server.use('/endpoint/db/unidades', MethodPostUnidadesEndpoint),
   Server.use('/endpoint/db/unidades', MethodDeleteUnidadesEndpoint),
   Server.use('/endpoint/db/unidades', MethodAlterUnidadesEndPoint)
   Server.use('/Admissao',  ViewAdmissaoUsers)

}

module.exports = InsertRoutesOnServer
