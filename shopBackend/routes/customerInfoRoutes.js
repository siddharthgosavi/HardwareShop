const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createCustomerInfo,
  getAllCustomerInfo,
  getCustomerInfo,
} = require("../controllers/customerInfoController");

router.post("/", protect, createCustomerInfo);
router.get("/", protect, getAllCustomerInfo);
router.get("/:id", protect, getCustomerInfo);

module.exports = router;