import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Automatically attach the JWT to every outgoing request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('bidsphere-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const storedUser = localStorage.getItem('bidsphere-user');
    if (storedUser) {
        const { username } = JSON.parse(storedUser);
        config.headers['X-Username'] = username;
    }
    return config;
});

export default axiosClient;