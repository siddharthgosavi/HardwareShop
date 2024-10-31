const asyncHandler = require("express-async-handler");
const CustomerInfo = require("../models/customerInfoModel");

// Create Customer Info
const createCustomerInfo = asyncHandler(async (req, res) => {
  const { name, address, mobile } = req.body;

  if (!name || !mobile) {
    res.status(400);
    throw new Error("Please fill in Name and Mobile fields");
  }

  try {
    const customerInfo = await CustomerInfo.create({
      name,
      address,
      mobile
    });
    res.status(201).json(customerInfo);
  } catch (error) {
    res.status(409).json({ message: "Name or Mobile number already exists" });
  }
});

// Get All Customer Info
const getAllCustomerInfo = asyncHandler(async (req, res) => {
  const customerInfo = await CustomerInfo.find();
  res.status(200).json(customerInfo);
});

// Get Single Customer Info
const getCustomerInfo = asyncHandler(async (req, res) => {
  const customerInfo = await CustomerInfo.findById(req.params.id);

  if (!customerInfo) {
    res.status(404);
    throw new Error("Customer Info not found");
  }

  res.status(200).json(customerInfo);
});

module.exports = {
  createCustomerInfo,
  getAllCustomerInfo,
  getCustomerInfo
};
