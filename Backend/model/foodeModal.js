const mongoose = require("mongoose");
const foodShemam = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
  },
  price: {
    type: Number,
    required: [true, "please provide a price"],
  },
  description: {
    type: String,
    required: [true, "please provide a description"],
  },
  category: {
    type: String,
    required: [true, "please provide a catagory"],
  },
  image: {
    type: String,
    required: [true, "please provide a an image"],
  },
  // cartData: {
  //   type: Object,
  //   default: {},
  // },
});
const Food = mongoose.model("Food", foodShemam);
module.exports = Food;
