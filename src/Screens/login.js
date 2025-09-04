import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { requestOtp } from '../services/authService';
import Snackbar from '../UiComponents/snackbar/snackbar';
import styles from './StyleSheets/login';

const Login = ({ navigation }) => {
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        if (snackbar.visible) {
            const timer = setTimeout(() => {
                setSnackbar(prev => ({ ...prev, visible: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.visible]);

    const showSnackbar = (message, type = 'success') => {
        setSnackbar(prev => ({ ...prev, visible: false }));
        setTimeout(() => {
            setSnackbar({ visible: true, message, type });
        }, 100);
    };

    const validationSchema = Yup.object().shape({
        mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    });

    const handleSubmit = async (values) => {
        try {
            const response = await requestOtp(values.mobile);
            console.log('Request OTP response:', response);
            if (response.success) {
                showSnackbar('OTP sent successfully');
                navigation.navigate('OtpScreen', { mobile: values.mobile });
            } else {
                showSnackbar('Failed to send OTP', 'error');
            }
        } catch (error) {
            showSnackbar('Error sending OTP', 'error');
        }
    };

    return (
        <KeyboardAvoidingView
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
                    <Text style={styles.subHeading}>Login with your mobile number</Text>
                </View>

                <Formik
                    initialValues={{ mobile: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.formContainer}>
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

                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>Send OTP</Text>
                            </TouchableOpacity>

                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.signupLink}>Sign Up</Text>
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
        </KeyboardAvoidingView>
    );
};

export default Login;