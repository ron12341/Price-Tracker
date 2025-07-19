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
        const product = await productService.addProduct(
          suggestion.name,
          suggestion.query,
          suggestion.stores,
          session
        );

        await ProductSuggestion.updateOne(
          { _id: suggestion._id },
          { status: "approved" }
        ).session(session);

        createdCount++;
      } catch (err) {
        errors.push({
          id: suggestion._id,
          name: suggestion.name,
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

module.exports = {
  addProductSuggestion,
  getAllProductSuggestions,
  getPendingProductSuggestions,
  approveProductSuggestion,
  bulkApproveAndCreate,
};
