const jwt = require('jsonwebtoken');

// Function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // Short expiry time for access tokens
  );
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Longer expiry time for refresh tokens
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
