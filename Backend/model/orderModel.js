const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number, // Fixed typo from 'tytpe' to 'type'
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Food processing",
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
