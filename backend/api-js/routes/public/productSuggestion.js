const express = require("express");
const router = express.Router();
const productSuggestionController = require("../../controllers/productSuggestion");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", productSuggestionController.addProductSuggestion);

router.put("/:id", productSuggestionController.updateProductSuggestion);

module.exports = router;
