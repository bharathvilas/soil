const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  productname: {
    type: String,
    required: true,
    trim: true,
  },
  productimage: {
    type: String,
    required: false,
  },
  detailsaboutproduct: {
    type: String,
    required: true,
    trim: true,
  },
  priceofproduct: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

const post = mongoose.model("Post", postSchema);

module.exports = post; 