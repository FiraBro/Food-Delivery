const express = require("express");
const orderController = require("../controller/orderController");
const orderRouter = express.Router();
orderRouter.post("/", orderController.placeOrder);
module.exports = orderRouter;
