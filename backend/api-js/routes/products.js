const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const axios = require("axios");

const MAX_CACHE_TIME = 6 * 60 * 60 * 1000; // 6 hour in milliseconds

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
 * @route GET /products/search
 * @desc Search for a product by name
 * @param {string} q - The name of the product to search for
 * @returns {object} A product object with the name and stores
 * @returns {object} An error object with a message if the search fails
 * @access Public
 */
router.get("/search", async (req, res) => {
  const query = req.query.q?.trim().toLowerCase();

  if (!query) {
    return res.status(400).json({ message: "Missing query parameter" });
  }

  try {
    // Check if the product is already cached
    const cachedProduct = await Product.findOne({ query });
    const now = new Date();

    if (cachedProduct && now - cachedProduct.scrapedAt < MAX_CACHE_TIME) {
      // If the product is cached, return the cached version
      return res.json(cachedProduct);
    }

    // If not cached, trigger scraper in FastAPI
    const response = await axios.post("http://localhost:8000/scrape", {
      query,
    });
    const data = response.data;

    // Save the product to the database
    const updated = await Product.findOneAndUpdate(
      { query },
      { name: query, query, scrapedAt: new Date(), stores: data.stores },
      { upsert: true, new: true }
    );

    return res.json({ source: "scraped", product: updated });
  } catch (err) {
    console.error("FastAPI scraper failed:", err.message);
    return res.status(500).json({ error: "Scraping failed" });
  }
});

/**
 * @route POST /products
 * @desc Add a new product to the database and trigger scraping
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const { name, query, stores } = req.body;

    // Validate required fields
    if (!name || !query || !stores) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the product already exists in the database
    const existingProduct = await Product.findOne({ query });
    if (existingProduct) {
      return res.status(409).json({ error: "Product already exists" });
    }

    // Insert the product into the 'products' collection
    const result = await Product.create({ name, query, stores });

    // Check if the product was inserted successfully
    if (!result) {
      return res
        .status(500)
        .json({ error: "Something went wrong. Failed to add product" });
    }

    // Trigger FastAPI to scrape the product
    const response = await axios.post("http://localhost:8000/scrape", {
      query: query,
      stores: stores,
    });
    const data = response.data;

    // Save the product to the database
    const updated = await Product.findOneAndUpdate(
      { query },
      { name: query, query, scrapedAt: new Date(), stores: data.stores },
      { upsert: true, new: true }
    );

    // Return the result of the insertion with a 201 status
    return res.status(201).json(updated);
  } catch (err) {
    // Handle any errors that occur during the process
    return res
      .status(500)
      .json({ error: "Something went wrong. Failed to add product" });
  }
});

module.exports = router;
