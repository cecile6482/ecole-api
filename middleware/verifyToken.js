const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Récupérer le token du header de la requête
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  // Vérifier si le token est présent
  if (!token) {
    return res.status(403).send({
      message: 'A token is required for authentication'
    });
  }

  try {
    // Si le token existe, enlever le préfixe 'Bearer ' s'il est présent
    if (token.startsWith('Bearer ')) {
      // Enlever Bearer du token
      token = token.slice(7, token.length);
    }

    // Vérifier le token
    const decoded = jwt.verify(token, SECRET_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      message: 'Invalid Token'
    });
  }
  return next();
};

module.exports = verifyToken;
