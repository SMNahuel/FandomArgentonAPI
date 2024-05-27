const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video_url: {
    type: Boolean,
    required: true,
  },
  image: {
    type: Boolean,
    required: true,
  },
  text: {
    type: Boolean,
    required: true,
  },
});

const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
