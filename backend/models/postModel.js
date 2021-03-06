const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    content: [
      {
        type: String,
        required: [true, "Content is required to create new post!"],
      },
    ],
    caption: {
      type: String,
      default: null,
    },
    likes: [
      {
        userId: String,
        username: String,
        picture: String,
      },
    ],
    hasComment: {
      type: Boolean,
      default: true,
      // if this false, then comment section of this post will be unavailable
    },
    commentControl: {
      type: Boolean,
      default: false,
      // if this true, then the post's owner can choose who gets to comment their post
    },
    tags: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
