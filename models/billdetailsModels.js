const mongoose = require('mongoose');

const billDetailsSchema = new mongoose.Schema({
  BIIIID: {
    type: String,
    required: true
  },
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  }
});

const db2=mongoose.connection.useDb('db2');
const billDetails=db2.model('BillDetail',billDetailsSchema);
module.exports = billDetails;
