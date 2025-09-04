import axios from 'axios';
import { API_BASE_URL } from '@env';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL, // Fallback to localhost if env variable is not set
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;