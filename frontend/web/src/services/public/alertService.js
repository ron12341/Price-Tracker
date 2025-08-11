import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/alerts";

const setPriceAlert = async (token, productId, { targetPrice, isActive }) => {
  try {
    const response = await axios.post(
      `${baseUrl}/products/${productId}`,
      { targetPrice, isActive },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Error setting alert:", error);
    throw error;
  }
};

export { setPriceAlert };
