const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postDescription: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const post = mongoose.model("post", postSchema);
module.exports = post;
