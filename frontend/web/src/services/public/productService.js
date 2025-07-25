import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/products";

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export { fetchProducts };
