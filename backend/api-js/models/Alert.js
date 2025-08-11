const mongoose = require("mongoose");
const cleanJSON = require("./cleanJSON.plugin");

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    targetPrice: {
      type: Number,
      required: true,
      min: 0.01,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastChecked: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

alertSchema.plugin(cleanJSON);

// Compound index to prevent duplicate alerts
alertSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Alert", alertSchema);
