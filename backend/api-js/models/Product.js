const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  query: String,
  scrapedAt: Date,
  stores: [
    {
      storeName: String,
      price: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
