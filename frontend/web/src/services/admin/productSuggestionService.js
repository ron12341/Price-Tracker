import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/admin/product-suggestions";

const fetchProductSuggestions = async (token) => {
  const response = await axios.get(`${baseUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const approveProductSuggestion = async (id, token) => {
  const response = await axios.post(`${baseUrl}/${id}/approve`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const bulkApproveProductSuggestions = async (ids, token) => {
  const response = await axios.post(
    `${baseUrl}/bulk-approve`,
    { ids },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const updateProductSuggestion = async (id, updates, token) => {
  console.log(updates);
  const response = await axios.put(`${baseUrl}/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export {
  fetchProductSuggestions,
  approveProductSuggestion,
  bulkApproveProductSuggestions,
  updateProductSuggestion,
};
