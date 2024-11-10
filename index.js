// const express = require("express");
// const dotenv = require("dotenv");
// const { storage } = require("./storage");
// const multer = require("multer");
// const upload = multer({ storage });
// const cors = require("cors");
// const { connect } = require("mongoose");
// const db = require("./db");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database Connection
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("connected to Database"));

// // Post Routes
// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.status(200).send({
//     status: "success",
//     message: "Image uploaded successfully",
//     url: req.file,
//   });
// });

// // Auth and Post Routes from the second snippet
// const authRoutes = require("./routes/auth");
// const postRoutes = require("./routes/posts");

// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);

// // Server setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const { storage } = require("./storage");
const multer = require("multer");
const cors = require("cors");
const db = require("./db");
const apiRoutes = require("./routes");

dotenv.config();

const app = express();
const upload = multer({ storage });

// Middleware
app.use(cors({ origin: ["http://localhost:3000"] })); // Allow only specific origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
db.on("error", (error) => console.error("Database connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

// Image Upload Endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    status: "success",
    message: "Image uploaded successfully",
    url: req.file,
  });
});

// API Routes
app.use("/api", apiRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
