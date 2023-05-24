import axios from "axios";

axios.defaults.withCredentials = true;

// s X-XSRF-TOKEN to na localhostu funguje
/* axios.defaults.headers.common["X-XSRF-TOKEN"] = document
  .querySelector('meta[name="csrf-token"]')!
  .getAttribute("content"); */

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default api;
