const express = require("express");
const router = express.Router();
const productSuggestionController = require("../controllers/productSuggestion");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  productSuggestionController.createProductSuggestion
);

router.get(
  "/",
  authMiddleware,
  isAdmin,
  productSuggestionController.getProductSuggestions
);

module.exports = router;
