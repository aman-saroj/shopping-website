import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Optional: Add token to every request (for login later)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Named Exports
export const getAllProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);

// Optional: default export (not needed if using named)
export default API;