const router = require("express").Router();

// controllers
const {
  getFollowingPosts,
  createPost,
} = require("../controllers/postController");

// middlewares
const { protect } = require("../middlewares/authMiddleware");

router.route("/post").get(protect, getFollowingPosts).post(protect, createPost);

module.exports = router;
