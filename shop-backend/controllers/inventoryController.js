// controllers/inventoryController.js
const Inventory = require("../models/Inventory");

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
