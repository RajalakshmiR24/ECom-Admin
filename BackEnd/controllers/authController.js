const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerSchema } = require('../schemas/authSchema');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

// Register User
exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password, email, fullName, city, state, country, occupation, phoneNumber, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = new User({
      username,
      email,
      fullName,
      password: hashedPassword,
      city,
      state,
      country,
      occupation,
      phoneNumber,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Login User
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Optionally, save the refreshToken in the database or in a cookie

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
// Token refresh
exports.refreshToken = (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      // Generate a new access token
      const accessToken = generateAccessToken({ id: user.id, username: user.username, role: user.role });
      res.status(200).json({ accessToken });
    });
  };
  