const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware"); // Assuming same middleware for authentication
const { createOrder, getAllOrders, getOrder } = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.get("/", protect, getAllOrders);
router.get("/:id", protect, getOrder);

module.exports = router;
