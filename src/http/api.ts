import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.headers.common["X-CSRF-TOKEN"] = document
  .querySelector('meta[name="csrf-token"]')!
  .getAttribute("content");

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default api;
