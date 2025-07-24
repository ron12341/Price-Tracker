import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/product-suggestions";

const fetchProductSuggestions = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product suggestions:", error);
    throw error;
  }
};

const getMyProductSuggestions = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching my product suggestions:", error);
    throw error;
  }
};

const getEditableProductSuggestion = async (id, token) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}/editable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching editable product suggestion:", error);
    throw error;
  }
};

const addProductSuggestion = async (name, query, stores, reason) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  try {
    const response = await axios.post(
      `${baseUrl}`,
      {
        name,
        query,
        stores,
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding product suggestion:", error);
    throw error;
  }
};

const updateProductSuggestion = async (updates, id, token) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating product suggestion:", error);
    throw error;
  }
};

export {
  fetchProductSuggestions,
  addProductSuggestion,
  getMyProductSuggestions,
  getEditableProductSuggestion,
  updateProductSuggestion,
};
