const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Obter o token do header 'x-auth-token'
  const token = req.header('x-auth-token');

  // Verifica se não há token
  if (!token) {
    return res.status(401).json({ msg: 'Sem token, autorização negada' });
  }

  // Verifica o token
  try {
    const decoded = jwt.verify(token, 'secretKey');
    
    // Decodifica o userId do token e armazena na requisição
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error('Erro ao verificar o token:', err.message);
    res.status(401).json({ msg: 'Token inválido' });
  }
};
