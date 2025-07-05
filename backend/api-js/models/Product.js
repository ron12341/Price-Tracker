const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  query: String,
  scrapedAt: Date,
  imageUrl: String,
  stores: [
    {
      storeName: String,
      price: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
