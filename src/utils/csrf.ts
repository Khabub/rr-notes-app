import axios from 'axios';
import Cookies from 'js-cookie';

export async function setCsrfToken() {
  try {
    const response = await axios.get('http://139.59.212.68/sanctum/csrf-cookie');
    const csrfToken = Cookies.get('XSRF-TOKEN');
    axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
  } catch (error) {
    console.error('Failed to retrieve CSRF token:', error);
  }
}
