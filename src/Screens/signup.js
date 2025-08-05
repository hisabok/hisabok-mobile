import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Snackbar from '../UiComponents/snackbar/snackbar';
import styles from './StyleSheets/signup';
const Signup = () => {
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
        // First hide the snackbar if it's visible
        setSnackbar(prev => ({ ...prev, visible: false }));

        // Then show the new message after a small delay
        setTimeout(() => {
            setSnackbar({
                visible: true,
                message,
                type
            });
        }, 100);
    };

    const handleSubmit = (values) => {
        console.log('Signup values:', values);
        showSnackbar('Account created successfully!');
        // Navigate to next screen or login after successful signup
        // navigation.navigate('Login');
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
                        mobile: '',
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
                                <Text style={styles.submitButtonText}>Create Account</Text>
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


export default Signup