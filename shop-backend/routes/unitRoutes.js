// routes/unitRoutes.js
const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");

router.post("/", unitController.addUnit);

module.exports = router;
