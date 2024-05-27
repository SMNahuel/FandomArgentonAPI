const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "No cumple con la estructura de un email",
    ],
  },

  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Creator", "Reader", "Admin"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
