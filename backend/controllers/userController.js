const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const Isemail = require("isemail");
const { validateUsername } = require("@digitalcube/username-validator");

// jwt generator
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "24h" });
};

// username validation
const isUsernameValid = (username, res) => {
  try {
    validateUsername(username);
  } catch (error) {
    res.status(400);
    throw new Error(`${error.name} : ${error.message}`);
  }
};

/* 
    @desc       Register new user
    @route      POST /api/register
    @access     Public
*/
const register = asyncHandler(async (req, res) => {
  const { name, username, email, password, c_password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error("All field is required!");
  }

  // check username valid
  isUsernameValid(username, res);

  //   check username exist
  const isUsernameExist = await User.findOne({ username });

  if (isUsernameExist) {
    res.status(400);
    throw new Error("Username already taken!");
  }

  // validate email
  const isEmailValid = Isemail.validate(email);

  if (!isEmailValid) {
    res.status(400);
    throw new Error("Please input a valid email");
  }

  // check if email exist
  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    res.status(400);
    throw new Error("Email already taken!");
  }

  //   check password contains at least 6 characters
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  // check password confirmation
  if (password !== c_password) {
    res.status(400);
    throw new Error("Password confirmation does not match!");
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/* 
    @desc       Authenticate user
    @route      POST /api/login
    @access     Public
*/
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All field is required!");
  }

  const oldUser = await User.findOne({ email });

  // check email
  if (!oldUser) {
    res.status(400);
    throw new Error("Email is incorrect!");
  } else {
    // if email match
    // check password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (isPasswordCorrect) {
      res.status(200).json({
        user: oldUser,
        token: generateToken(oldUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Password is incorrect!");
    }
  }
});

/* 
    @desc       Get profile of the logged in user
    @route      GET /api/profile
    @access     Private
*/
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  register,
  login,
  getProfile,
};
