import axios from "axios";

axios.defaults.withCredentials = true;
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')!
  .getAttribute("content");

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "X-XSRF-TOKEN": csrfToken,
  },
});

export default api;
