import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust if deployed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token refresh (optional extended feature)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 errors, maybe redirect to login or refresh token
        if (error.response && error.response.status === 401) {
            // Clear local storage or redirect
            // localStorage.removeItem('accessToken');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
