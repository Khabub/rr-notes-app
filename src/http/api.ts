import axios from "axios";

axios.defaults.withCredentials = true;


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,  
});

api.interceptors.request.use((config) => {
  const csrfToken = localStorage.getItem("csrf-token");
  if (csrfToken) {
    config.headers["X-XSRF-TOKEN"] = csrfToken;
  }
  return config;
});

export default api;
