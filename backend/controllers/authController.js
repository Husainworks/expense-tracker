const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register
const registerUser = async (req, res) => {
  const { fullName, email, password, profileImgURL } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Create the User
    const user = await User.create({
      fullName,
      email,
      password,
      profileImgURL,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while registering",
      error: err.message,
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
      message: "User logged In",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while logging in",
      error: err.message,
    });
  }
};

// Get User Info
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured while searching",
      error: err.message,
    });
  }
};

// Upload Profile Photo
const uploadPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const imageURL = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imageURL });
};

module.exports = { registerUser, loginUser, getUserInfo, uploadPhoto };
