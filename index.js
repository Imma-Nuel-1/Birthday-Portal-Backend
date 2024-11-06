const express = require("express");
const dotenv = require("dotenv");
const { storage } = require("./storage");
const multer = require("multer");
const upload = multer({ storage });
const cors = require("cors");
const Post = require("./formModel");
const { connect } = require("mongoose");
const db = require("./db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Database"));

// Post Routes
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.status(200).send({
    status: "success",
    message: "Image uploaded successfully",
    url: req.file,
  });
});

app.post("/create-post", async (req, res) => {
  const body = req.body;
  try {
    const post = new Post(body);
    await post.save();
    res.status(200).send({
      status: "success",
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error creating post",
      error: error,
    });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({
      status: "success",
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error retrieving posts",
      error: error,
    });
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error retrieving post",
      error: error,
    });
  }
});

// Auth and Post Routes from the second snippet
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
