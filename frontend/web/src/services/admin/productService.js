import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/admin/products";
const token = JSON.parse(localStorage.getItem("user"))?.token;

const addProduct = async ({ name, query, imageUrl, stores }) => {
  try {
    const response = await axios.post(
      `${baseUrl}`,
      {
        name,
        query,
        imageUrl,
        stores,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

const deleteProducts = async (ids) => {
  try {
    const response = await axios.post(
      `${baseUrl}/bulk-delete`,
      {
        ids,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting products:", error);
    throw error;
  }
};

export { addProduct, deleteProducts };
