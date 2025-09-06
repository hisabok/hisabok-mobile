// customerService.js

import axiosInstance from '../utils/axiosInstance';
import { API_CUSTOMER_BASE_URL } from '../utils/constants';


/**
 * Retrieves all customers.
 * @param {object} [queryParams={}] - Optional query parameters for filtering and pagination.
 * @returns {Promise<object>} A paginated list of customers.
 */
export const getAllCustomers = async (queryParams = {}) => {
    try {
        const url = `${API_CUSTOMER_BASE_URL}`;
        console.log('Request to get all customers:', url, 'with params:', queryParams);
        const response = await axiosInstance.get(url, { params: queryParams });
        console.log('Response from get all customers:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting all customers:', error);
        throw error;
    }
};

/**
 * Retrieves a single customer by their ID.
 * @param {string} customerId - The unique ID of the customer.
 * @returns {Promise<object>} Detailed customer information.
 */
export const getCustomerById = async (customerId) => {
    try {
        const url = `${CUSTOMER_BASE_URL}/${customerId}`;
        console.log('Request to get customer by ID:', url);
        const response = await axiosInstance.get(url);
        console.log('Response from get customer by ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting customer by ID:', error);
        throw error;
    }
};

/**
 * Creates a new customer.
 * @param {object} customerData - The payload for the new customer.
 * @returns {Promise<object>} The newly created customer details.
 */
export const createCustomer = async (customerData) => {
    try {
        const url = `${CUSTOMER_BASE_URL}/create`;
        console.log('Request to create customer:', customerData);
        const response = await axiosInstance.post(url, customerData);
        console.log('Response from create customer:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

/**
 * Updates an existing customer by their ID.
 * @param {string} customerId - The unique ID of the customer.
 * @param {object} updatedData - The fields to update.
 * @returns {Promise<object>} The updated customer details.
 */
export const updateCustomer = async (customerId, updatedData) => {
    try {
        const url = `${CUSTOMER_BASE_URL}/${customerId}`;
        console.log('Request to update customer:', url, 'with data:', updatedData);
        const response = await axiosInstance.put(url, updatedData);
        console.log('Response from update customer:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

/**
 * Deletes a customer by their ID.
 * @param {string} customerId - The unique ID of the customer.
 * @returns {Promise<object>} A success message and count of deleted records.
 */
export const deleteCustomer = async (customerId) => {
    try {
        const url = `${CUSTOMER_BASE_URL}/${customerId}`;
        console.log('Request to delete customer:', url);
        const response = await axiosInstance.delete(url);
        console.log('Response from delete customer:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
};