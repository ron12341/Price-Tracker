import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/admin/product-suggestions";

const fetchProductSuggestions = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product suggestions:", error);
    throw error;
  }
};

export { fetchProductSuggestions };
