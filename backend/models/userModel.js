const mongoose = require("mongoose");

const userSchena = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      min: 6,
    },
    picture: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    websiteLink: {
      type: String,
      default: null,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchena);

module.exports = User;
