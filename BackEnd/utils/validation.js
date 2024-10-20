// validation.js
const authSchema = require('../schemas/authSchema'); // Adjust the path as needed

// Validation middleware for registration
const validateRegister = async (req, res, next) => {
  try {
    await authSchema.register.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ code: 400, message: error.details[0].message });
  }
};

// Validation middleware for login
const validateLogin = async (req, res, next) => {
  try {
    await authSchema.login.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ code: 400, message: error.details[0].message });
  }
};

// Validation middleware for refresh token
const validateRefreshToken = async (req, res, next) => {
  try {
    await authSchema.refreshToken.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ code: 400, message: error.details[0].message });
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshToken,
};
