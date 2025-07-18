const ProductSuggestion = require("../models/ProductSuggestion");

const addProductSuggestion = async (userId, name, query, stores, reason) => {
  const result = await ProductSuggestion.create({
    userId,
    name,
    query,
    stores,
    reason,
  });

  return result;
};

const getAllProductSuggestions = async () => {
  const result = await ProductSuggestion.find({});
  return result;
};

const getPendingProductSuggestions = async () => {
  const result = await ProductSuggestion.find({ status: "pending" });
  return result;
};

module.exports = {
  addProductSuggestion,
  getAllProductSuggestions,
  getPendingProductSuggestions,
};
