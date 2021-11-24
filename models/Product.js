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
  pictures: []
});

module.exports = mongoose.model('product', ProductSchema);
