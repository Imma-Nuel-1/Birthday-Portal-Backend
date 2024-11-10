const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const postRoutes = require("./posts");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

module.exports = router;
