const userModal = require("../../Backend/model/userModel");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemID;

    // Validate input
    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or itemID" });
    }

    // Increment the item count in the user's cart
    const updateResult = await userModal.updateOne(
      { _id: userId }, // Use _id to match Mongoose's default ID field
      { $inc: { [`cartData.${itemId}`]: 1 } } // Increment the count for the specific item
    );

    // Check if the user was found
    if (updateResult.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error); // Log error details
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const userData = await userModal.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemID] > 0) {
      cartData[req.body.itemID] -= 1;
    }
    await userModal.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({
      success: true,
      message: "Item successfully removed",
    });
  } catch (error) {
    console.error(error); // Log error details
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};

exports.fetchCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Validate input
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    // Fetch the user's cart data
    const user = await userModal.findById(userId);

    // Check if the user was found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error(error); // Log error details
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};
