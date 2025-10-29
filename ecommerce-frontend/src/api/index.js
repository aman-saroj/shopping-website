// src/api/index.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// PUBLIC
export const getAllProducts = () => API.get("/products");

// ADMIN
export const getAdminProducts = () => API.get("/admin/products");
export const addAdminProduct = (data) => {
  const formData = new FormData();
  for (let key in data) formData.append(key, data[key]);
  return API.post("/admin/products", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
export const deleteAdminProduct = (id) => API.delete(`/admin/products/${id}`);