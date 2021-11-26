const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  pictures: [],
  clicks: {
    type: Number,
    default: 0
  },
  conversion: {
    type: Number,
    default: 100
  },
  rate: {
    type: Number,
    default: 4.5 + Math.random() / 2
  },
});

module.exports = mongoose.model('product', ProductSchema);
