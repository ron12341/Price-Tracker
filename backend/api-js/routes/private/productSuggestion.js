const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const controller = require("../../controllers/productSuggestion");

router.use(authMiddleware, isAdmin);

router.get("/", controller.getAllProductSuggestions);

module.exports = router;
