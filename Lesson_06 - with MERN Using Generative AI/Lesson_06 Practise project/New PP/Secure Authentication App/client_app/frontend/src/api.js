// src/api.js
import axios from "axios";

// Create an Axios instance for API calls
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Get the base URL from the .env file
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
