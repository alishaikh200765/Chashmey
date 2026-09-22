import axios from "axios";

// In local dev, VITE_API_URL is unset, so this falls back to "/api",
// which Vite proxies to http://localhost:5000 (see vite.config.js).
// In production (Vercel), set VITE_API_URL to your Render backend URL,
// e.g. https://chashmey-api.onrender.com/api
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL,
});

export default api;
