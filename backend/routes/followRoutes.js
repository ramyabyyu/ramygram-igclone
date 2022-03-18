const router = require("express").Router();

// controllers
const { followUser } = require("../controllers/followController");

// middlewares
const { protect } = require("../middlewares/authMiddleware");

router.post("/follow/:id", protect, followUser);

module.exports = router;
