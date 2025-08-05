import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Snackbar from '../UiComponents/snackbar/snackbar';
import styles from './StyleSheets/login';
const Login = () => {
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    // Auto-hide snackbar after 3 seconds
    useEffect(() => {
        if (snackbar.visible) {
            const timer = setTimeout(() => {
                setSnackbar(prev => ({ ...prev, visible: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.visible]);

    const validationSchema = Yup.object().shape({
        mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    });

    const showSnackbar = (message, type = 'success') => {
        // First hide any existing snackbar
        setSnackbar(prev => ({ ...prev, visible: false }));

        // Then show the new one after a small delay
        setTimeout(() => {
            setSnackbar({
                visible: true,
                message,
                type
            });
        }, 100);
    };

    const handleSubmit = (values) => {
        console.log('Login submitted:', values);
        showSnackbar('OTP has been sent to your number successfully');
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

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
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