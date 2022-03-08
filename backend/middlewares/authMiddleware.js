const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwtSecret = process.env.JWT_SECRET;

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // `verify token
      const decoded = jwt.verify(token, jwtSecret);

      // get user id from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, No token!");
  }
});

module.exports = { protect };
