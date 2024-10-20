const Joi = require('joi');

// Schema for user registration
const authSchema = {
  register: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    city: Joi.string().max(100).optional(),
    state: Joi.string().max(100).optional(),
    country: Joi.string().max(100).optional(),
    occupation: Joi.string().max(100).optional(),
    phoneNumber: Joi.string().max(15).optional(),
    role: Joi.string().valid('user', 'admin', 'superadmin', 'driver', 'shopkeeper').default('user'),
  }),

  // Schema for user login
  login: Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required(),
  }),

  // Schema for refresh token
  refreshToken: Joi.object({
    token: Joi.string().required(),
  }),
};

module.exports = authSchema;
