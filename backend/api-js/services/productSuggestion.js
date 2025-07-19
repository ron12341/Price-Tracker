const ProductSuggestion = require("../models/ProductSuggestion");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const productService = require("./product");

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

const approveProductSuggestion = async (id) => {
  const result = await ProductSuggestion.findOneAndUpdate(
    { _id: id },
    { status: "approved" }
  );

  if (!result) {
    throw new Error("Product suggestion not found");
  }

  const product = await Product.create({
    name: result.name,
    query: result.query,
    stores: result.stores,
  });

  return result;
};

const bulkApproveAndCreate = async (ids) => {
  const suggestions = await ProductSuggestion.find({ _id: { $in: ids } });

  const createdProducts = await Promise.all(
    suggestions.map(async (suggestion) => {
      const product = await productService.addProduct(
        suggestion.name,
        suggestion.query,
        suggestion.stores
      );
      return product;
    })
  );

  await Promise.all(
    suggestions.map(async (suggestion) => {
      await ProductSuggestion.findOneAndUpdate(
        { _id: suggestion._id },
        { status: "approved" }
      );
      return suggestion;
    })
  );

  return {
    approvedCount: suggestions.length,
    createdCount: createdProducts.length,
  };
};

module.exports = {
  addProductSuggestion,
  getAllProductSuggestions,
  getPendingProductSuggestions,
  approveProductSuggestion,
  bulkApproveAndCreate,
};
