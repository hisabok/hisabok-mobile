import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import Formik from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { requestOtp, validateOtp, signup } from '../../services/authService';
import { setAuthToken } from '../redux/authSlice';
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
    const [verifytoken, setVerifytoken] = useState('');
    const initialMobile = route.params?.mobile || '';

    useEffect(() => {
        if (snackbar.visible) {
            const timer = setTimeout(() => {
                setSnackbar(prev => ({ ...prev, visible: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.visible]);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Full name is required')
            .min(3, 'Name must be at least 3 characters'),
        businessName: Yup.string()
            .required('Business name is required')
            .min(3, 'Business name must be at least 3 characters'),
        mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
        address: Yup.string()
            .required('Address is required')
            .min(10, 'Address must be at least 10 characters')
    });

    const showSnackbar = (message, type = 'success') => {
        setSnackbar(prev => ({ ...prev, visible: false }));
        setTimeout(() => {
            setSnackbar({ visible: true, message, type });
        }, 100);
    };

    const handleRequestOtp = async (mobile) => {
        try {
            const response = await requestOtp(mobile);
            console.log('Request OTP response:', response);
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
            const response = await validateOtp(mobile, otp);
            console.log('Validate OTP response:', response);
            if (response.success) {
                setVerifytoken(response.data.verificationToken);
                dispatch(setAuthToken(response.data.verificationToken));
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

    const handleSubmit = async (values) => {
        if (!otpSent) {
            await handleRequestOtp(values.mobile);
            return;
        }
        if (!verifytoken) {
            const isValid = await handleValidateOtp(values.mobile);
            if (!isValid) return;
        }
        try {
            const response = await signup(
                verifytoken,
                values.fullName,
                values.businessName,
                values.businessName
            );
            console.log('Signup response:', response);
            if (response.success) {
                dispatch(setAuthToken(response.data.authToken));
                showSnackbar('Account created successfully');
                navigation.navigate('App', { authToken: response.data.authToken });
            } else {
                showSnackbar(response.message || 'Signup failed', 'error');
            }
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Error during signup', 'error');
        }
    };

    return (
        <ScrollView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.heading}>HisabOk SP</Text>
                    <Text style={styles.subHeading}>Create your business account</Text>
                </View>

                <Formik
                    initialValues={{
                        fullName: '',
                        businessName: '',
                        mobile: initialMobile,
                        address: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Full Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                    placeholder="Enter your full name"
                                />
                                {touched.fullName && errors.fullName && (
                                    <Text style={styles.errorText}>{errors.fullName}</Text>
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Business Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('businessName')}
                                    onBlur={handleBlur('businessName')}
                                    value={values.businessName}
                                    placeholder="Enter your business name"
                                />
                                {touched.businessName && errors.businessName && (
                                    <Text style={styles.errorText}>{errors.businessName}</Text>
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Mobile Number*</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    value={values.mobile}
                                    placeholder="Enter 10-digit mobile number"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                />
                                {touched.mobile && errors.mobile && (
                                    <Text style={styles.errorText}>{errors.mobile}</Text>
                                )}
                            </View>

                            {otpSent && (
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
                                    style={[styles.input, { height: 80 }]}
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    placeholder="Enter your business address"
                                    multiline
                                />
                                {touched.address && errors.address && (
                                    <Text style={styles.errorText}>{errors.address}</Text>
                                )}
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.submitButtonText}>
                                    {otpSent ? (verifytoken ? 'Create Account' : 'Verify OTP') : 'Send OTP'}
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.loginLink}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
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