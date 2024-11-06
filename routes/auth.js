// routes/auth.js
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).send("Invalid credentials");

  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user._id.toString() === process.env.ADMIN_USER_ID,
    },
    process.env.JWT_SECRET
  );
  res.header("Authorization", token).send({ token });
});

module.exports = router;
