const mongoose = require("mongoose");
exports.dbConnected = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/FoodDel", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
};
