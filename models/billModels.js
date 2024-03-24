const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  BID: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  Email: {
    type: String,
    required: true
  }
});

const db2=mongoose.connection.useDb('db2');
const bill=db2.model('Bill',billSchema);
module.exports = bill;