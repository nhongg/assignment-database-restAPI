const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  FullName: {
    type: String,
    required: true
  }
});
const db2=mongoose.connection.useDb('db2');
const account=db2.model('Account',accountSchema);
module.exports = account;