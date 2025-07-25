const mongoose = require("mongoose");

const productSuggestionSchema = new mongoose.Schema({
  suggestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  query: { type: String, required: true },
  stores: [
    {
      storeName: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProductSuggestion", productSuggestionSchema);
