const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const axios = require("axios");

const MAX_CACHE_TIME = 2 * 60 * 60 * 1000; // 2 hour in milliseconds

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
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields (id)" });
  }

  try {
    // Check if the product is cached
    const cachedProduct = await Product.findById(id);
    const now = new Date();

    if (cachedProduct && now - cachedProduct.scrapedAt < MAX_CACHE_TIME) {
      // If the product is cached, return the cached version
      return res.json(cachedProduct);
    }

    try {
      // If not cached, trigger scraper in FastAPI
      const response = await axios.post("http://localhost:8000/scrape", {
        query: cachedProduct.query,
        stores: cachedProduct.stores,
        imageUrl: cachedProduct.imageUrl,
      });
      const data = response.data;

      // Save the product to the database
      const updated = await Product.findByIdAndUpdate(
        { _id: id },
        { scrapedAt: new Date(), stores: data.stores },
        { upsert: true, new: true }
      );

      return res.status(200).json(updated);
    } catch (scrapeError) {
      if (cachedProduct) {
        return res.status(200).json(cachedProduct);
      }
      return res.status(500).json({ error: "Scraping failed and no cached data" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
