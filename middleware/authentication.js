const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // Debes usar una clave secreta más segura y almacenarla en variables de entorno

const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }
  console.log(token.split(" ")[1])
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    console.log(decoded)
    if (err) {
      return res.status(401).send({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = authenticateToken;