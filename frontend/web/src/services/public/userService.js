import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/users";

const handleTrackProduct = async (productId, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/me/tracked-products/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error tracking product:", error);
    throw error;
  }
};

export { handleTrackProduct };
