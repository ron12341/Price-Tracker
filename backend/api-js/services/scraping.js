import axios from "axios";

const BASE_URL = process.env.SCRAPING_BASE_URL;

const scrapeProduct = async (query, stores, imageUrl) => {
  const response = await axios.post(BASE_URL, {
    query: query,
    stores: stores,
    imageUrl: imageUrl || null,
  });

  return response.data;
};

export { scrapeProduct };
