const axios = require("axios");
const Product = require("../models/Product");
const mongoose = require("mongoose");

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

module.exports = { addProduct, updateProduct };
