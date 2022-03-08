const router = require("express").Router();

// controllers
const {
  register,
  login,
  getProfile,
} = require("../controllers/userController");

// middlewares
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

module.exports = router;
