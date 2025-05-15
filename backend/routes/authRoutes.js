const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
  uploadPhoto,
  deleteUser,
} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// APIs
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
router.delete("/profile/:id", protect, deleteUser);

router.post("/upload-image", upload.single("image"), uploadPhoto);

module.exports = router;
