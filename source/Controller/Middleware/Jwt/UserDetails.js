const jwt = require('jsonwebtoken');


// Secret key usada para verificar o JWT
const secretKey = 'TESTE';

// Middleware para verificar se o usuário tem um JWT válido
function verifyJWT(token) {


    // Verifica se o token está presente
    if (!token) {


    }



    // Remove o prefixo 'Bearer ' se existir, já que o token pode vir com esse prefixo
    

    // Verifica e valida o token usando a chave secreta
 const JwtToken =   jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // possivel causa token invalido!
            console.log(`ERRO! + ${err}`)
        }
        
   return decoded
    });

   return JwtToken
}

module.exports = verifyJWT;
