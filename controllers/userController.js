const asyncHandler = require('express-async-handler'); // npm install express-async-handler if missing
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // npm install bcryptjs if missing
const jwt = require('jsonwebtoken'); // Import JWT

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // 2. Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // 3. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Check for user email
  const user = await User.findOne({ email });

  // 2. Check password
  // We compare the plain text password (req.body) with the Hash in DB (user.password)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // <--- ISSUE THE TOKEN HERE
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Helper Function: Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Export all three
module.exports = {
  registerUser,
  loginUser,
  getMe,
};