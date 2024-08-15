const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  "mongodb+srv://adesanyaoluwamuyiwa12:Emmanuel_2002@school-app.kg4jigw.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
console.log(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection;

module.exports = db;
