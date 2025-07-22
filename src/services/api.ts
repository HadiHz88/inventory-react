import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL:
        import.meta.env.VITE_BACKEND_URL ||
        `product-alb-899356633.us-east-1.elb.amazonaws.com`,
    timeout: 10000, // Request timeout (ms)
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;