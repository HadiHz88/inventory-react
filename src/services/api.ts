import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'https://blablabla.com', // Base URL for all API requests
  timeout: 10000,                      // Request timeout (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;