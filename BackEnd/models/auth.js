import Joi from 'joi';
import mongoose from 'mongoose'; // ES module import for mongoose

// Mongoose schema for the Auth model
const authModelSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 2, maxlength: 100 },
  username: { type: String, required: true, minlength: 3, maxlength: 50, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  city: { type: String, maxlength: 100, default: '' },
  state: { type: String, maxlength: 100, default: '' },
  country: { type: String, maxlength: 100, default: '' },
  occupation: { type: String, maxlength: 100, default: '' },
  phoneNumber: { type: String, maxlength: 15, default: '' },
  role: { type: String, enum: ['user', 'admin', 'superadmin', 'driver', 'shopkeeper'], default: 'user' },
});

// Joi schema for user registration
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

// Create the Mongoose model
const Auth = mongoose.model('Auth', authModelSchema);

export default Auth;
export { authSchema };
