import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authService from '../services/authService';
import { setCredentials } from '../redux/authSlice'; 
import Snackbar from '../UiComponents/snackbar/snackbar';
import styles from './StyleSheets/signup';

const Signup = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        type: 'success'
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifytoken, setVerifytoken] = useState(route.params?.verificationToken || '');
    
    useEffect(() => {
        if (route.params?.verificationToken) {
            setVerifytoken(route.params.verificationToken);
        }
    }, [route.params?.verificationToken]);

    const initialMobile = route.params?.mobile || '';

    useEffect(() => {
        if (snackbar.visible) {
            const timer = setTimeout(() => {
                setSnackbar(prev => ({ ...prev, visible: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.visible]);

    const [formData, setFormData] = useState({
        fullName: '',
        businessName: '',
        mobile: initialMobile,
        address: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName || formData.fullName.length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters';
        }
        if (!formData.businessName || formData.businessName.length < 3) {
            newErrors.businessName = 'Business name must be at least 3 characters';
        }
        if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits';
        }
        if (!formData.address || formData.address.length < 10) {
            newErrors.address = 'Address must be at least 10 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showSnackbar = (message, type = 'success') => {
        setSnackbar(prev => ({ ...prev, visible: false }));
        setTimeout(() => {
            setSnackbar({ visible: true, message, type });
        }, 100);
    };

    const handleRequestOtp = async (mobile) => {
        try {
            const response = await authService.requestOtp(mobile);
            if (response.success) {
                showSnackbar('OTP sent successfully');
                setOtpSent(true);
            } else {
                showSnackbar(response.message || 'Failed to send OTP', 'error');
            }
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Error sending OTP', 'error');
        }
    };

    const handleValidateOtp = async (mobile) => {
        try {
            const response = await authService.validateOtp(mobile, otp);
            if (response.success) {
                setVerifytoken(response.data.verificationToken);
                showSnackbar('OTP verified successfully');
                return true;
            } else {
                showSnackbar(response.message || 'Invalid OTP', 'error');
                return false;
            }
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Error verifying OTP', 'error');
            return false;
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const commonSignupLogic = async (token) => {
            try {
                const response = await authService.signup(
                    token,
                    formData.fullName,
                    formData.businessName,
                    formData.businessName, 
                    formData.address
                );
                
                if (response.success) {
                    dispatch(setCredentials(response.data));
                    showSnackbar('Account created successfully');
                } else {
                    showSnackbar(response.message || 'Signup failed', 'error');
                }
            } catch (error) {
                showSnackbar(error.response?.data?.message || 'Error during signup', 'error');
            }
        };

        if (route.params?.verificationToken) {
            await commonSignupLogic(route.params.verificationToken);
            return;
        }
        
        if (!otpSent) {
            await handleRequestOtp(formData.mobile);
            return;
        }
        
        let currentVerifyToken = verifytoken;
        if (!currentVerifyToken) {
            const isValid = await handleValidateOtp(formData.mobile);
            if (!isValid) return;
            const otpResponse = await authService.validateOtp(formData.mobile, otp);
            if (otpResponse.success) {
                currentVerifyToken = otpResponse.data.verificationToken;
            } else {
                return; 
            }
        }
        
        await commonSignupLogic(currentVerifyToken);
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <View style={[styles.logo, { backgroundColor: '#007AFF', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>H</Text>
                    </View>
                    <Text style={styles.heading}>HisabOk SP</Text>
                    <Text style={styles.subHeading}>Create your business account</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name*</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
                            value={formData.fullName}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Business Name*</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, businessName: text }))}
                            value={formData.businessName}
                            placeholder="Enter your business name"
                        />
                        {errors.businessName && <Text style={styles.errorText}>{errors.businessName}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mobile Number*</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, mobile: text }))}
                            value={formData.mobile}
                            placeholder="Enter 10-digit mobile number"
                            keyboardType="phone-pad"
                            maxLength={10}
                            editable={!route.params?.mobile} 
                        />
                        {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
                    </View>

                    {otpSent && !route.params?.verificationToken && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter OTP*</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setOtp}
                                value={otp}
                                placeholder="Enter 6-digit OTP"
                                keyboardType="numeric"
                                maxLength={6}
                            />
                        </View>
                    )}

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Business Address*</Text>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
                            value={formData.address}
                            placeholder="Enter your business address"
                            multiline
                        />
                        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Create Account</Text>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Snackbar
                visible={snackbar.visible}
                message={snackbar.message}
                type={snackbar.type}
            />
        </ScrollView>
    );
};

export default Signup;