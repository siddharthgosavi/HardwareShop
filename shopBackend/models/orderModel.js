const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
  total: {
    type: String,
    require: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
