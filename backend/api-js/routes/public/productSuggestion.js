const express = require("express");
const router = express.Router();
const productSuggestionController = require("../../controllers/productSuggestion");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", productSuggestionController.addProductSuggestion);

router.put("/:id", productSuggestionController.updateProductSuggestion);

router.get("/me", productSuggestionController.getMyProductSuggestions);

module.exports = router;
