const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  store: String,
  url: String,
  lastUpdated: Date,
});

module.exports = mongoose.model("Product", productSchema);
