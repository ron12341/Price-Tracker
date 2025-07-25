const ProductSuggestion = require("../models/ProductSuggestion");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const productService = require("./product");

const addProductSuggestion = async (suggestedBy, name, query, stores, reason) => {
  const result = await ProductSuggestion.create({
    suggestedBy,
    name,
    query,
    stores,
    reason,
  });

  return result;
};

const getAllProductSuggestions = async () => {
  try {
    const suggestions = await ProductSuggestion.find().populate("suggestedBy", "email").exec();

    return suggestions;
  } catch (error) {
    throw new Error("Failed to fetch product suggestions");
  }
};

const getUserProductSuggestions = async (userId) => {
  const result = await ProductSuggestion.find({ suggestedBy: userId });
  return result;
};

const getEditableProductSuggestion = async (id, userId) => {
  const result = await ProductSuggestion.findOne({
    _id: id,
    suggestedBy: userId,
  });

  if (!result) {
    throw new Error("Product suggestion not found");
  }

  if (result.status !== "pending") {
    throw new Error("Product suggestion is not editable");
  }

  return result;
};

const getPendingProductSuggestions = async () => {
  const result = await ProductSuggestion.find({ status: "pending" });
  return result;
};

const approveProductSuggestion = async (id) => {
  const result = await ProductSuggestion.findOneAndUpdate({ _id: id }, { status: "approved" });

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
  const session = await mongoose.startSession();
  session.startTransaction();

  const errors = [];
  let createdCount = 0;

  try {
    const suggestions = await ProductSuggestion.find({
      _id: { $in: ids },
      // status: "pending",
    }).session(session);

    for (const suggestion of suggestions) {
      try {
        const product = await productService.addProduct(suggestion.name, suggestion.query, suggestion.stores, session);

        await ProductSuggestion.updateOne({ _id: suggestion._id }, { status: "approved" }).session(session);

        createdCount++;
      } catch (err) {
        errors.push({
          id: suggestion._id,
          query: suggestion.query,
          error: err.message,
        });
      }
    }

    if (createdCount > 0) {
      await session.commitTransaction();
    } else {
      await session.abortTransaction();
    }

    return {
      createdCount,
      approvedCount: createdCount,
      errors,
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const updateProductSuggestionAsAdmin = async (id, updates) => {
  const suggestion = await ProductSuggestion.findOneAndUpdate({ _id: id }, updates, { new: true })
    .populate("suggestedBy", "email")
    .exec();

  if (!suggestion) {
    throw new Error("Product suggestion not found");
  }

  return suggestion;
};

const updateProductSuggestionAsOwner = async (id, updates, userId) => {
  const suggestion = await ProductSuggestion.findOne({ _id: id, suggestedBy: userId });

  if (!suggestion) {
    throw new Error("Product suggestion not found");
  }

  const allowedUpdates = ["name", "query", "stores", "reason"];
  for (const key of Object.keys(updates)) {
    if (!allowedUpdates.includes(key)) {
      throw new Error(`Field '${key}' is not allowed to update`);
    }
  }

  const updatedSuggestion = await ProductSuggestion.findOneAndUpdate({ _id: id }, updates);

  return updatedSuggestion;
};

const deleteProductSuggestionAsOwner = async (id, userId) => {
  const suggestion = await ProductSuggestion.findOne({ _id: id, suggestedBy: userId });

  if (!suggestion) {
    throw new Error("Product suggestion not found");
  }

  if (suggestion.status !== "pending" && suggestion.status !== "rejected") {
    throw new Error("Product suggestion is not editable");
  }

  return result;
};

// ADMIN ONLY
const bulkDeleteProductSuggestions = async (ids) => {
  const result = await ProductSuggestion.deleteMany({ _id: { $in: ids } });
  return result;
};

module.exports = {
  addProductSuggestion,
  getAllProductSuggestions,
  getUserProductSuggestions,
  getPendingProductSuggestions,
  getEditableProductSuggestion,
  approveProductSuggestion,
  bulkApproveAndCreate,
  updateProductSuggestionAsAdmin,
  updateProductSuggestionAsOwner,
  deleteProductSuggestionAsOwner,
  bulkDeleteProductSuggestions,
};
