import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,  
});

// Function to retrieve CSRF token from cookies
const getCsrfToken = () => {
  const name = "XSRF-TOKEN=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

// Set default headers including the CSRF token
api.defaults.headers.common["X-XSRF-TOKEN"] = getCsrfToken();

export default api;
