import axiosInstance from '../utils/axiosInstance';
import { API_OTP_REQUEST, API_SIGNUP, API_VALIDATE_OTP } from '../utils/constants';

export const requestOtp = async (mobile) => {
    try {
        const requestPayload = { mobile };
        console.log('Request to /app/auth/request-otp:', requestPayload);
        const response = await axiosInstance.post(API_OTP_REQUEST, requestPayload);
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
        const response = await axiosInstance.post(API_VALIDATE_OTP, requestPayload);
        console.log('Response from /app/auth/validate-otp:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error in validateOtp:', error, error.response, error.config);
        throw error;
    }
};

export const signup = async (signupData) => {
    try {
        // The signupData object is now passed directly as the request payload
        const requestPayload = signupData;
        console.log('Request to /app/auth/signup:', requestPayload);
        const response = await axiosInstance.post(API_SIGNUP, requestPayload);
        console.log('Response from /app/auth/signup:', response.data);
        return response.data;
    } catch (error){
        console.log('Error in signup:', error);
        console.log('Error response:', error.response?.data);
        console.log('Error status:', error.response?.status);
        console.log('Error config:', error.config);
        throw error;
    }
};