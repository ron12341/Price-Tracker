import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "/admin/stats";

const getCounts = async (token) => {
  console.log(token);
  try {
    const response = await axios.get(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

export { getCounts };
