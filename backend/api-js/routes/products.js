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

    // If not cached, trigger scraper in FastAPI
    const response = await axios.post("http://localhost:8000/scrape", {
      query: cachedProduct.query,
      stores: cachedProduct.stores,
    });
    const data = response.data;

    // Save the product to the database
    const updated = await Product.findByIdAndUpdate(
      { _id: id },
      { scrapedAt: new Date(), stores: data.stores },
      { upsert: true, new: true }
    );

    return res.json({ source: "scraped", product: updated });
  } catch (err) {
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
    const { name, query, imageUrl, stores } = req.body;

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
      {
        name: query,
        query,
        scrapedAt: new Date(),
        imageUrl: imageUrl,
        stores: data.stores,
      },
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

router.post("/bulk-delete", async (req, res) => {
  try {
    if (!req.body.ids) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const { ids } = req.body;
    const result = await Product.deleteMany({ _id: { $in: ids } });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @route DELETE /products/:id
 * @desc Delete a product from the database
 * @access Public
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
