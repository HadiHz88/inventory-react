import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Base URL for all API requests
    timeout: 10000, // Request timeout (ms)
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;