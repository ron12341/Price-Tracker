const express = require("express");
const router = express.Router();
const productSuggestionController = require("../../controllers/productSuggestion");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  productSuggestionController.addProductSuggestion
);

module.exports = router;
