// const Food = require("../model/foodeModal");
// const fs = require("fs");
// exports.addFood = async (req, res) => {
//   const image_file_name = `${req.file.filename}`;
//   const food = new Food({
//     name: req.body.name,
//     price: req.body.price,
//     description: req.body.description,
//     category: req.body.category,
//     image: image_file_name,
//   });
//   try {
//     await food.save();
//     res.json({
//       success: true,
//       message: "Food is saved or added",
//     });
//   } catch (err) {
//     console.log(err);
//     res.json({
//       success: false,
//       message: "Food is not saved or added",
//     });
//   }
// };
// exports.foodList = async (req, res) => {
//   try {
//     const food = await Food.find();
//     res.json({
//       status: true,
//       length: food.length,
//       data: food,
//     });
//   } catch (err) {
//     console.log(err);
//     res.json({
//       status: false,
//       message: err,
//     });
//   }
// };
// exports.deleteList = async (req, res) => {
//   try {
//     const food = await Food.findById(req.body.id);
//     fs.unlink(`uploads/${food.image}`, () => {});
//     await Food.findOneAndDelete(req.body.id);

//     res.json({
//       statu: true,
//       message: "Items succusFully removed",
//     });
//   } catch (err) {
//     res.json({
//       status: false,
//       message: err,
//     });
//   }
// };

// const Food = require("../model/foodeModal");
// const fs = require("fs");

// exports.addFood = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "No image file uploaded.",
//     });
//   }

//   const image_file_name = `${req.file.filename}`;
//   const food = new Food({
//     name: req.body.name,
//     price: req.body.price,
//     description: req.body.description,
//     category: req.body.category,
//     image: image_file_name,
//   });

//   try {
//     await food.save();
//     res.json({
//       success: true,
//       message: "Food is saved or added",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Food is not saved or added",
//     });
//   }
// };

// exports.foodList = async (req, res) => {
//   try {
//     const food = await Food.find();
//     res.json({
//       status: true,
//       length: food.length,
//       data: food,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: false,
//       message: "Failed to fetch food list.",
//     });
//   }
// };

// exports.deleteList = async (req, res) => {
//   try {
//     const food = await Food.findById(req.body.id);
//     if (!food) {
//       return res.status(404).json({
//         status: false,
//         message: "Food item not found.",
//       });
//     }

//     // Delete the image file
//     fs.unlink(`uploads/${food.image}`, (err) => {
//       if (err) {
//         console.error("Failed to delete image file:", err);
//       }
//     });

//     await Food.findByIdAndDelete(req.body.id);

//     res.json({
//       status: true,
//       message: "Item successfully removed.",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: false,
//       message: "Failed to delete food item.",
//     });
//   }
// };

const Food = require("../model/foodeModal");
const fs = require("fs");
// const { body, validationResult } = require("express-validator");
exports.addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image file uploaded.",
    });
  }

  const { name, price, description, category } = req.body;

  // Validate required fields
  if (!name || !price || !description || !category) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const image_file_name = `${req.file.filename}`;
  const food = new Food({
    name,
    price,
    description,
    category,
    image: image_file_name,
  });

  try {
    await food.save();
    res.status(201).json({
      success: true,
      message: "Food is saved or added",
    });
  } catch (err) {
    console.error("Error saving food:", err);
    res.status(500).json({
      success: false,
      message: "Food is not saved or added",
    });
  }
};

exports.foodList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const food = await Food.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Food.countDocuments();

    res.json({
      status: true,
      length: food.length,
      total: count,
      data: food,
    });
  } catch (err) {
    console.error("Error fetching food list:", err);
    res.status(500).json({
      status: false,
      message: "Failed to fetch food list.",
    });
  }
};

exports.deleteList = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      status: false,
      message: "Food item ID is required.",
    });
  }

  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({
        status: false,
        message: "Food item not found.",
      });
    }

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error("Failed to delete image file:", err);
      }
    });

    await Food.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Item successfully removed.",
    });
  } catch (err) {
    console.error("Error deleting food item:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete food item.",
    });
  }
};
