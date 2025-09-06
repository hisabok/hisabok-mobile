import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3001/api',
  timeout: 10000,
});

// Axios interceptors for debugging
api.interceptors.request.use((config) => {
  try {
    const { method, url, params } = config;
    console.log('[API] Request:', method?.toUpperCase(), url, params ? { params } : '');
  } catch {}
  return config;
});

api.interceptors.response.use(
  (response) => {
    try {
      console.log('[API] Response:', response.status, response.config?.url);
    } catch {}
    return response;
  },
  (error) => {
    try {
      const status = error?.response?.status;
      const url = error?.config?.url;
      const message = error?.response?.data?.message || error?.message;
      console.warn('[API] Error:', status, url, message);
    } catch {}
    return Promise.reject(error);
  }
);

// Helper to get token from AsyncStorage
const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Customer API methods
export const customerAPI = {
  // 1. Get All Customers - /api/app/customers
  getAllCustomers: async (params) => {
    try {
      const token = await getAuthToken();
      const response = await api.get('/app/customers', {
        params,
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      });

      const root = response?.data;
      const payload = root?.data ?? root; // handle both wrapped and raw
      const customers = payload?.data ?? payload?.customers ?? payload ?? [];
      const pagination = payload?.pagination ?? root?.pagination;

      return { customers, pagination };
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // 2. Get Customer by ID - /api/app/customers/:id
  getCustomerById: async (id) => {
    try {
      const token = await getAuthToken();
      const response = await api.get(`/app/customers/${id}` , {
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      });
      const root = response?.data;
      return root?.data ?? root;
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  }
};

export default api;


