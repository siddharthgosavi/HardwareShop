const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const CustomerInfo = require("../models/customerInfoModel");
const Product = require("../models/productModel");

// Create Order
const createOrder = asyncHandler(async (req, res) => {
  const { customerInfoId, products, total } = req.body;

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

    productsArray.push({
      product: product,
      quantity: productData.quantity
    });
  }

  const order = await Order.create({
    customerInfo: customerInfo,
    products: productsArray,
    total
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

module.exports = {
  createOrder,
  getAllOrders,
  getOrder
};
