const express = require("express");
const cartRouter = express.Router();
const cartController = require("../../Backend/controller/cartController");
const MiddleWare = require("../middleware/auth");
cartRouter.post("/add", MiddleWare.authMiddleWare, cartController.addToCart);
cartRouter.post(
  "/delete",
  MiddleWare.authMiddleWare,
  cartController.removeCart
);
cartRouter.post("/fetch", MiddleWare.authMiddleWare, cartController.fetchCart);

module.exports = cartRouter;
