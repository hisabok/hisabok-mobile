import axiosInstance from './axiosInstance';

export const requestOtp = async (mobile) => {
    try {
        const requestPayload = { mobile };
        console.log('Request to /app/auth/request-otp:', requestPayload);
        const response = await axiosInstance.post('/app/auth/request-otp', requestPayload);
        console.log('Response from /app/auth/request-otp:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error in requestOtp:', error, error.response, error.config);
        throw error;
    }
};

export const validateOtp = async (mobile, otp) => {
    try {
        const requestPayload = { mobile, otp };
        console.log('Request to /app/auth/validate-otp:', requestPayload);
        const response = await axiosInstance.post('/app/auth/validate-otp', requestPayload);
        console.log('Response from /app/auth/validate-otp:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error in validateOtp:', error, error.response, error.config);
        throw error;
    }
};

export const signup = async (verificationToken, profile_full_name, business_id, account_id, business_address) => {
    try {
        const requestPayload = { verificationToken, profile_full_name, business_id, account_id, business_address };
        console.log('Request to /app/auth/signup:', requestPayload);
        const response = await axiosInstance.post('/app/auth/signup', requestPayload);
        console.log('Response from /app/auth/signup:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error in signup:', error);
        console.log('Error response:', error.response?.data);
        console.log('Error status:', error.response?.status);
        console.log('Error config:', error.config);
        throw error;
    }
};