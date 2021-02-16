const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }
  // need to split bearer using space and extract token alone
  const token = authHeader.split(' ')[1];
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!verifiedToken) {
    const error = new Error('Authentication failed');
    error.statusCode = 401;
    throw error;
  }
  // at this point we have a valid token
  req.userId = verifiedToken.userId;
  next();
};

module.export = authToken;