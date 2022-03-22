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
    followers: [
      {
        userId: String,
        username: String,
        picture: String,
      },
    ],
    followings: [
      {
        userId: String,
        username: String,
        picture: String,
      },
    ],
    privateAccount: {
      type: Boolean,
      default: false,
      // if this set to true, then the user's post in their profile won't be visible
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchena);

module.exports = User;
