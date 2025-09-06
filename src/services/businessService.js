import axiosInstance from './axiosInstance'; 
import { BUSINESS_PROFILE } from '../constants'; 

export const updateBusinessProfile = async (businessId, profileData) => {
    try {
        const requestUrl = `${BUSINESS_PROFILE}/${businessId}`;
        const requestPayload = {
            profile_full_name: profileData.name,
            account_business_name: profileData.businessName,
            business_address: profileData.address,
        };

        console.log('Request to ' + requestUrl, requestPayload);
        const response = await axiosInstance.put(requestUrl, requestPayload);
        console.log('Response from ' + requestUrl, response.data);

        return response.data;
    } catch (error) {
        console.log('Error in updateBusinessProfile:', error.response?.data || error.message);
        throw error;
    }
};