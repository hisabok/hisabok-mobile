import axios from 'axios';
import { API_BASE_URL } from '@env';
import { store } from '../redux/store';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const authToken = state.auth.authToken;
        
        // Add a log to check for the token when the app loads
        if (authToken) {
            console.log('JWT Token found in storage:', authToken.substring(0, 10) + '...');
            config.headers.Authorization = `Bearer ${authToken}`;
        } else {
            console.log('No JWT Token found in storage.');
        }

        console.log('Request Headers:', config.headers);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;