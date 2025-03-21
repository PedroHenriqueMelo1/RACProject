const jwt = require('jsonwebtoken');


// Secret key usada para verificar o JWT
const secretKey = 'TESTE';

// Middleware para verificar se o usuário tem um JWT válido
function verifyJWT(req, res, next) {

 const Token =   req.cookies['auth']

    // Verifica se o token está presente
    if (!Token) {
        
        return res.redirect('/Alffa/Login')
    }

    // Remove o prefixo 'Bearer ' se existir, já que o token pode vir com esse prefixo
    const tokenWithoutBearer = Token.startsWith('Bearer ') ? Token.slice(7, Token.length) : Token   ;

    // Verifica e valida o token usando a chave secreta
    jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
        if (err) {
            // possivel causa token invalido!
            return res.redirect('/Alffa/Login')
        }
        
   
    
        // Se o token for válido, guarda as informações do usuário (payload) no req.user
        req.user = decoded;
        next();  // Passa o controle para o próximo middleware ou rota
    });
}

module.exports = verifyJWT;
