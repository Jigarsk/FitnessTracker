import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL/api/auth"; // Your backend URL

// API call for signup
export const signupUser = async (data: { username: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error: any) {
    // Log the detailed error message
    console.error("Error during signup:", error.response ? error.response.data : error.message);
    throw error; // Re-throw to be handled by the calling function
  }
};

// API call for login
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    localStorage.setItem("token", response.data.token);  // Store the token in localStorage
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error.response ? error.response.data : error.message);
    throw error; // Re-throw to be handled by the calling function
  }
};
