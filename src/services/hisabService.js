// hisabService.js

import axiosInstance from './axiosInstance'; // Assuming you have a pre-configured axios instance
import { HISAB_BASE_URL } from '../constants';

/**
 * Creates a new hisab entry.
 * @param {object} hisabData - The payload for the new hisab.
 * @returns {Promise<object>} The newly created hisab details.
 */
export const createHisab = async (hisabData) => {
    try {
        console.log('Request to create hisab:', hisabData);
        const response = await axiosInstance.post(HISAB_BASE_URL, hisabData);
        console.log('Response from create hisab:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating hisab:', error);
        throw error;
    }
};

/**
 * Retrieves a specific hisab by its ID.
 * @param {string} hisabId - The unique ID of the hisab.
 * @returns {Promise<object>} Detailed hisab information.
 */
export const getHisabById = async (hisabId) => {
    try {
        const url = `${HISAB_BASE_URL}/${hisabId}`;
        console.log('Request to get hisab by ID:', url);
        const response = await axiosInstance.get(url);
        console.log('Response from get hisab by ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting hisab by ID:', error);
        throw error;
    }
};

/**
 * Updates a specific hisab by its ID.
 * @param {string} hisabId - The unique ID of the hisab.
 * @param {object} updatedData - The fields to update. Only include the fields you want to change.
 * @returns {Promise<object>} The updated hisab details.
 */
export const updateHisabById = async (hisabId, updatedData) => {
    try {
        const url = `${HISAB_BASE_URL}/${hisabId}`;
        console.log('Request to update hisab by ID:', url, 'with data:', updatedData);
        const response = await axiosInstance.put(url, updatedData);
        console.log('Response from update hisab by ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating hisab by ID:', error);
        throw error;
    }
};

/**
 * Retrieves all customers with their hisab details.
 * @returns {Promise<object>} A list of customers with hisab data.
 */
export const getAllCustomersWithHisab = async () => {
    try {
        const url = `${HISAB_BASE_URL}`;
        console.log('Request to get all customers with hisab details:', url);
        const response = await axiosInstance.get(url);
        console.log('Response from get all customers with hisab details:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting all customers with hisab details:', error);
        throw error;
    }
};