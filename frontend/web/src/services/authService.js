import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const register = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, {
      email,
      password,
      isAdmin: false,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export { login, register };
