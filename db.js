// const mongoose = require("mongoose");
// require("dotenv").config();

// // Connect to MongoDB with additional options
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Get the database connection instance
// const db = mongoose.connection;

// // Handle connection errors
// db.on("error", console.error.bind(console, "connection error:"));

// // Log a message once connected
// db.once("open", () => console.log("Connected to MongoDB"));

// module.exports = db;

const mongoose = require("mongoose");
require("dotenv").config();

// Log the MongoDB URL for debugging
console.log("MongoDB URL:", process.env.MONGO_URL);

// Connect to MongoDB without deprecated options
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Get the database connection instance
const db = mongoose.connection;

// Handle connection errors
db.on("error", console.error.bind(console, "connection error:"));

// Log a message once connected
db.once("open", () => console.log("Database connection is open"));

module.exports = db;
