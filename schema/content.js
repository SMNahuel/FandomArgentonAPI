const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
  },
  image: {
    type: String,
  },
  text: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
