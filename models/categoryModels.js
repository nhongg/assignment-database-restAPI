const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  CateID: {
    type: String,
    required: true
  },
  CateName: {
    type: String,
    required: true
  }
});

const db2=mongoose.connection.useDb('db2');
const category=db2.model('Category',categorySchema);
module.exports = category;