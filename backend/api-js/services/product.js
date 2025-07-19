const axios = require("axios");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const addProduct = async (name, query, stores) => {
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
        timeout: 5000, // Set timeout for scraping service
      }
    );

    return await Product.create({
      name,
      query,
      imageUrl: response.data.imageUrl,
      stores: response.data.stores,
      scrapedAt: new Date(),
    });
  } catch (error) {
    // Enhance service-level error messages
    if (error.code === "ECONNABORTED") {
      throw new Error("Scraping service timeout");
    }
    if (error.response) {
      throw new Error(`Scraping failed: ${error.response.data.message}`);
    }
    throw error; // Re-throw other errors
  }
};

module.exports = { addProduct };
