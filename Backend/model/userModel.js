const mongoose = require("mongoose");
const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide us your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide us your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide us a password"],
      trim: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);
const User = mongoose.model("User", userShema);
module.exports = User;
