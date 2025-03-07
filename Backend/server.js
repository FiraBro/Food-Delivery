const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "config.env" });

// Debug logs to verify environment variables
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);

// Enable CORS (must come before other middleware and routes)
app.use(cors());

// Middleware to parse JSON and log requests
app.use(express.json());
app.use(morgan("dev"));

// Serve static files (e.g., uploaded images)
app.use("/images", express.static("uploads"));

// Import and use your routes
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require('./routes/orderRouter')
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);


// Connect to the database
db.dbConnected();

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`The server is running at: ${port}`);
});
