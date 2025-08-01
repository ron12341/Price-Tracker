const axios = require("axios");
const Product = require("../models/Product");
const ProductSuggestion = require("../models/ProductSuggestion");
const User = require("../models/User");

const getCounts = async () => {
  const products = await Product.countDocuments();
  const productSuggestions = await ProductSuggestion.countDocuments();
  const users = await User.countDocuments();

  if (!products || !productSuggestions || !users) throw new Error("Failed to fetch counts");

  return [
    {
      name: "Products",
      value: products,
    },
    {
      name: "Product Suggestions",
      value: productSuggestions,
    },
    {
      name: "Users",
      value: users,
    },
  ];
};

module.exports = { getCounts };
