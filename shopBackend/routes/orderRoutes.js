const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOrder, updatePaymentMode } = require("../controllers/orderController");

router.route("/").post(createOrder).get(getAllOrders);
router.route("/:id").get(getOrder).patch(updatePaymentMode); // Fix the route definition

module.exports = router;
