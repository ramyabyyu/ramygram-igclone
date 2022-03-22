const Post = require("../models/postModel");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

/*
    @desc       Get post from people that this user's followed
    @route      GET /api/post
    @access     Private
*/
const getFollowingPosts = asyncHandler(async (req, res) => {
  // get current user following's posts
  const userFollowingId = req.user.followings.userId;
  const followingPosts = await Post.find({ user: userFollowingId });

  if (followingPosts.length > 0) {
    res.status(200).json({
      message: "Get following posts success",
      followingPosts,
    });
  } else {
    res.status(200).json({
      message: "No post available, please follow another user",
    });
  }
});

/*
    @desc       Create new post
    @route      POST /api/post
    @access     Private
*/
const createPost = asyncHandler(async (req, res) => {
  const { caption, content, tags } = req.body;

  if (content.length < 1) {
    res.status(400);
    throw new Error("Content is required to create a new post");
  }

  //   declaring new Post
  const newPost = new Post();

  //   insert the owner of this post
  newPost.user = req.user._id;

  //   insert the content of this post
  content.forEach((c) => newPost.content.push(c));

  //   insert the tag of this post
  if (tags.length > 0) {
    tags.forEach((tag) => newPost.tags.push(tag));
  } else {
    newPost.tags.push(tags);
  }

  //   insert the caption of this post
  if (caption) newPost.caption = caption;

  //   save post
  await newPost.save();

  if (newPost) {
    res.status(201).json({
      message: "Create new post successfully",
      post: newPost,
    });
  } else throw new Error("Something went wrong whhile creating a new post");
});

module.exports = {
  getFollowingPosts,
  createPost,
};
