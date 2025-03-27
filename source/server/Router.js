
const MethodGetDatabaseEndPoint = require('./routes/EndPointDataBases/Users/VerifyCredentials')
const MethodInsertDatabaseEndpoint = require('./routes/EndPointDataBases/Users/InsertUser')
const MethodDeleteDataBaseEndPoint = require('./routes/EndPointDataBases/Users/DeleteUser')
const MethodPutDataBaseEndpoint = require('./routes/EndPointDataBases/Users/PutUser')
const MethodGetUnidadesEndpoint = require('./routes/EndPointDataBases/Unidade/GetUnidade')
const MethodPostUnidadesEndpoint = require('./routes/EndPointDataBases/Unidade/InsertUnidade')
const MethodDeleteUnidadesEndpoint = require('./routes/EndPointDataBases/Unidade/Deleteunidade')
const MethodAlterUnidadesEndPoint = require('./routes/EndPointDataBases/Unidade/AlterUnidade')
const ViewAdmissaoUsers = require('./routes/EndPointDataBases/Onboarding/View')
const CreateTokenEndpoint = require('./routes/EndPointDataBases/Onboarding/CreateToken')
const DeleteTokenEndpoint = require('./routes/EndPointDataBases/Onboarding/DeleteToken')
const ViewLandingPage = require('./routes/StaticRoutes/MultiplicarLandingPage')
const AlffaUnidade = require('./routes/StaticRoutes/Alffa/AlffaUnidade')
const AlffaLogin = require('./routes/StaticRoutes/Alffa/AlffaLogin')
const verifyJWT = require('../Controller/Middleware/Jwt/JwtGen')
const AlffaGestao = require('./routes/StaticRoutes/Alffa/AlffaGestao')
const AlffaOperacional = require('./routes/StaticRoutes/Alffa/AlffaOperacional')
const ResponseUserDetails = require('./routes/EndPointDataBases/UtilsRequests/GetUserDetail')

function InsertRoutesOnServer(Server) {
   Server.use('/endpoint/db/user', MethodGetDatabaseEndPoint)
   Server.use('/endpoint/db/user', MethodInsertDatabaseEndpoint)
   Server.use('/endpoint/db/user', MethodDeleteDataBaseEndPoint)
   Server.use('/endpoint/db/user', MethodPutDataBaseEndpoint)
   Server.use('/endpoint/db/unidades', MethodGetUnidadesEndpoint),
   Server.use('/endpoint/db/unidades', MethodPostUnidadesEndpoint),
   Server.use('/endpoint/db/unidades', MethodDeleteUnidadesEndpoint),
   Server.use('/endpoint/db/unidades', MethodAlterUnidadesEndPoint)
   Server.use('/onboarding',  ViewAdmissaoUsers),
   Server.use('/endpoint/db/onboarding/', CreateTokenEndpoint),
   Server.use('/endpoint/db/onboarding',  DeleteTokenEndpoint)
   Server.use('/MultiplicarLandingPage', ViewLandingPage)
   Server.use('/endpoint/ReturnUsersDetailByJwt', ResponseUserDetails)


   InsertAlffaRoutesOnServer(Server)

}

function InsertAlffaRoutesOnServer(Server) {

   Server.use('/Alffa/Unidade',verifyJWT, AlffaUnidade)
   Server.use('/Alffa/Login', AlffaLogin)
   Server.use('/Alffa/Gestao', verifyJWT, AlffaGestao)
   Server.use('/Alffa/Operacional', verifyJWT, AlffaOperacional)
}

module.exports = InsertRoutesOnServer
