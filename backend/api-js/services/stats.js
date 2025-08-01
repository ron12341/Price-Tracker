const Product = require("../models/Product");
const ProductSuggestion = require("../models/ProductSuggestion");
const User = require("../models/User");

const getCounts = async () => {
  const products = await Product.countDocuments();
  const productSuggestions = await ProductSuggestion.countDocuments();
  const users = await User.countDocuments();

  return [
    {
      name: "Products",
      value: products || 0,
    },
    {
      name: "Product Suggestions",
      value: productSuggestions || 0,
    },
    {
      name: "Users",
      value: users || 0,
    },
  ];
};

module.exports = { getCounts };
