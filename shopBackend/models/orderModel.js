const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerInfo",
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  paymentMode: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
