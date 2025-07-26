const User = require("../models/User");
const Product = require("../models/Product");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { generatePassword, verifyPassword } = require("../utils/passwordUtils");

const handleTrackProduct = async (userId, productId) => {
  const user = await User.findById(userId);

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const isTracked = user.trackedProducts.includes(productId);

  if (isTracked) {
    await User.findByIdAndUpdate(userId, { $pull: { trackedProducts: productId } });
  } else {
    await User.findByIdAndUpdate(userId, { $push: { trackedProducts: productId } });
  }

  const updatedUser = await User.findById(userId).populate({
    path: "trackedProducts",
    select: "_id",
  });

  // Extract just the ID strings from populated products
  const trackedProductIds = updatedUser.trackedProducts.map((product) => product._id.toString());

  return {
    action: isTracked ? "removed" : "added",
    trackedProducts: trackedProductIds,
  };
};

module.exports = { handleTrackProduct };
