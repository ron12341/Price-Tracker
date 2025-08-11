const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const productController = require("../../controllers/product");
const { optionalAuth } = require("../../middleware/authMiddleware");

/**
 * @route GET /products
 * @desc Fetch all products from the database
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Respond with the list of products
    return res.json(products);
  } catch (err) {
    // Handle any errors that occur during the fetch
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @route GET /products/:id
 * @desc Fetch a specific product from the database
 * @access Public
 */
router.get("/:id", optionalAuth, productController.getProduct);

module.exports = router;
