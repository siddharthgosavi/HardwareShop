const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const CustomerInfo = require("../models/customerInfoModel");
const Product = require("../models/productModel");
const Counter = require("../models/counterModel");

// Function to get the next order ID
const getNextOrderId = async () => {
  const counter = await Counter.findOneAndUpdate({ name: "orderId" }, { $inc: { value: 1 } }, { new: true, upsert: true });
  return counter.value.toString().padStart(6, "0");
};

// Create Order
const createOrder = asyncHandler(async (req, res) => {
  const { customerInfoId, products, total, paymentMode } = req.body;

  const customerInfo = await CustomerInfo.findById(customerInfoId);
  if (!customerInfo) {
    res.status(404);
    throw new Error("Customer Info not found");
  }

  const productsArray = [];
  for (const productData of products) {
    const product = await Product.findById(productData.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Reduce product quantity
    product.quantity -= productData.quantity;
    await product.save();

    productsArray.push({
      product: product,
      quantity: productData.quantity
    });
  }

  const orderId = await getNextOrderId();

  const order = await Order.create({
    orderId,
    customerInfo: customerInfo,
    products: productsArray,
    total,
    paymentMode
  });

  res.status(201).json(order);
});

// Get All Orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("customerInfo").populate("products");
  res.status(200).json(orders);
});

// Get Single Order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("customerInfo").populate("products");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});

// Controller function to update the payment mode of an order
const updatePaymentMode = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentMode } = req.body;

  const order = await Order.findByIdAndUpdate(id, { paymentMode }, { new: true });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(order);
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updatePaymentMode
};
