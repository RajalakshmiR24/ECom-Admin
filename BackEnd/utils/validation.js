import Auth from '../models/auth.js'; // Adjust the path if necessary
import Joi from 'joi';

// Validation middleware for registration
export const validateRegister = async (req, res, next) => {
  try {
    await authSchema.register.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ code: 400, message: error.details[0].message });
  }
};

// Validation middleware for login
export const validateLogin = async (req, res, next) => {
  try {
    await authSchema.login.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ code: 400, message: error.details[0].message });
  }
};

// Validation middleware for refresh token
export const validateRefreshToken = async (req, res, next) => {
  try {
    await authSchema.refreshToken.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ code: 400, message: error.details[0].message });
  }
};
