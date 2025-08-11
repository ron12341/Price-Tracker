const axios = require("axios");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const MAX_CACHE_TIME = 2 * 60 * 60 * 1000; // 2 hour in milliseconds

const addProduct = async (name, query, stores, session) => {
  // Input validation at service level
  if (!name || !query || !stores) {
    throw new Error("Missing required fields");
  }

  const existingProduct = await Product.findOne({ query });
  if (existingProduct) {
    throw new Error("Product already exists");
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/scrape",
      {
        query,
        stores,
        imageUrl: null,
      },
      {
        timeout: 5000,
      }
    );

    return await Product.create(
      [
        {
          name,
          query,
          imageUrl: response.data.imageUrl,
          stores: response.data.stores,
          scrapedAt: new Date(),
        },
      ],
      { session }
    );
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Scraping service timeout");
    }
    if (error.response) {
      throw new Error(`Scraping failed: ${error.response.data.message}`);
    }
    throw error;
  }
};

const getProduct = async (id) => {
  try {
    // Check if the product is cached
    const cachedProduct = await Product.findById(id);
    const now = new Date();

    if (cachedProduct && now - cachedProduct.scrapedAt < MAX_CACHE_TIME) {
      // If the product is cached, return the cached version
      return cachedProduct;
    }

    // Check if the scraping server is available
    try {
      await axios.get("http://localhost:8000/health");
    } catch (error) {
      // If the scraping server is not available, return the cached version
      if (cachedProduct) {
        return cachedProduct;
      }
      return { error: "Scraping service is not available" };
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

      return updated;
    } catch (scrapeError) {
      if (cachedProduct) {
        return cachedProduct;
      }
      return { error: `Scraping failed: ${scrapeError.message}` };
    }
  } catch (err) {
    console.error(err);
    return { error: "Internal server error" };
  }
};

const updateProduct = async (id, updates) => {
  try {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error("Invalid update data");
    }
    throw error;
  }
};

module.exports = { addProduct, updateProduct, getProduct };
