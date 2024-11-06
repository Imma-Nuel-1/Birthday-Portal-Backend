// routes/posts.js
const express = require("express");
const Post = require("../models/Post");
const authenticate = require("../middleware/auth");

const router = express.Router();

// Create a post
router.post("/", authenticate, async (req, res) => {
  try {
    const post = new Post({ ...req.body, userId: req.user.id });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get posts based on user role
router.get("/", authenticate, async (req, res) => {
  try {
    const posts = req.user.isAdmin
      ? await Post.find()
      : await Post.find({ userId: req.user.id });

    res.send(posts);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
