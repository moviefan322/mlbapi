const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser).get("/", getAllUsers);

router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
