const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { first: { type: String, required: true }, last: { type: String, required: true } },
    isAdmin: { type: Boolean, default: false },
    trackedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        validate: [arrayLimit, "{PATH} exceeds the limit of 100"],
      },
    ],
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 100;
}

module.exports = mongoose.model("User", userSchema);
