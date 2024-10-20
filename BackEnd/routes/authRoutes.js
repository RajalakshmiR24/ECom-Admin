// routes/authRoutes.js
const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const {
  validateRegister,
  validateLogin,
  validateRefreshToken,
} = require('../middleware/validation'); // Import the validation functions

const router = express.Router();

// Register route with validation
router.post('/register', validateRegister, register);

// Login route with validation
router.post('/login', validateLogin, login);

// Refresh token route with validation
router.post('/refresh-token', validateRefreshToken, refreshToken);

// Protected route example (requires authentication)
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed', user: req.user });
});

module.exports = router;
