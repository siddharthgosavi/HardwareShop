// routes/categoryInventoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryInventoryController = require("../controllers/categoryInventoryController");

router.get("/", categoryInventoryController.getAllCategoryInventory);

module.exports = router;
