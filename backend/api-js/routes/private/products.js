const express = require("express");
const axios = require("axios");
const router = express.Router();
const Product = require("../../models/Product");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");

router.use(authMiddleware, isAdmin);

router.post("/", async (req, res) => {
  try {
    const { name, query, stores, imageUrl } = req.body;

    // Validate required fields
    if (!name || !query || !stores) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the product already exists in the database
    const existingProduct = await Product.findOne({ query });
    if (existingProduct) {
      return res.status(409).json({ error: "Product already exists" });
    }

    const response = await axios.post("http://localhost:8000/scrape", {
      query: query,
      stores: stores,
      imageUrl: imageUrl || null,
    });

    // data = { imageUrl, stores }
    const data = response.data;

    // Save the product to the database
    const result = await Product.create({
      name,
      query,
      imageUrl: data.imageUrl,
      stores: data.stores,
      scrapedAt: new Date(),
    });

    return res.json(result);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Error creating product" });
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
