const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const foodController = require("../controller/foodController");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);
  },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), foodController.addFood);
router.get("/list", foodController.foodList);
router.post("/remove", foodController.deleteList);
module.exports = router;
