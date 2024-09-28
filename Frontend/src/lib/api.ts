import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000", // Corrected the base URL format
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming you store your token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, you can add a response interceptor to handle errors globally

export default api;
