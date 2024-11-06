const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB with additional options
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the database connection instance
const db = mongoose.connection;

// Handle connection errors
db.on("error", console.error.bind(console, "connection error:"));

// Log a message once connected
db.once("open", () => console.log("Connected to MongoDB"));

module.exports = db;
