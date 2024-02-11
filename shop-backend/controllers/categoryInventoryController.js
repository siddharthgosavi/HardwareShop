// controllers/categoryInventoryController.js
const CategoryInventory = require("../models/CategoryInventory");

exports.getAllCategoryInventory = async (req, res) => {
  try {
    const categoryInventory = await CategoryInventory.findAll();
    res.json(categoryInventory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
