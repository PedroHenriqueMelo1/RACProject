const jwt = require('jsonwebtoken');

// Chave secreta usada para assinar o token
const secretKey = 'TESTE'; // Troque por algo mais seguro

// Função para gerar o JWT com base no role
const generateJWT = (role) => {
  const payload = { role }; // O payload inclui o role

  // Gerando o token JWT com o payload e expirando em 1 hora
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
};

// Exemplo de uso da função


module.exports = generateJWT