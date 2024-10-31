const mongoose = require("mongoose");

const customerInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  mobile: {
    type: String,
    unique : true,
    dropDups: true,
    required: true
  }
});

const CustomerInfo = mongoose.model("CustomerInfo", customerInfoSchema);

module.exports = CustomerInfo;
