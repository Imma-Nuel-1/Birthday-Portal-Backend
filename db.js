const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,

);
console.log(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection;

module.exports = db;
