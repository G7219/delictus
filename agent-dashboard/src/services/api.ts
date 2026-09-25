import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/v1",
});

// Attaches the stored JWT to every request once AuthContext has logged in.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dse_agent_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
