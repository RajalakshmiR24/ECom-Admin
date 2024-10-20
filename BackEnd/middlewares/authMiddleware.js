// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate requests
const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; 

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ code: 401, message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Handle token expiration error
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ code: 401, message: 'Token has expired, please login again' });
      }
      // Handle invalid token error
      return res.status(403).json({ code: 403, message: 'Invalid token' });
    }

    // Attach user data to the request object
    req.user = user; 
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
