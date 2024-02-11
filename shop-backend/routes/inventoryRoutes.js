// routes/inventoryRoutes.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllInventory);

module.exports = router;
