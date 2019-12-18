const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(
      token,
      process.env.TOKEN_SECRET || 'this a secret'
    );
    req.token = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};
