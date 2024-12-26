const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerInfo: {
    name: String,
    mobile: String,
    address: String,
  },
  orderDate: Date,
  products: Array,
  total: Number,
  paymentMode: {
    type: String,
    enum: ['Unpaid', 'Cash', 'Online'],
    default: 'Unpaid',
  },
  // ...other fields...
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
