import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
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

    const validationSchema = Yup.object().shape({
        mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    });

    const showSnackbar = (message, type = 'success') => {
        setSnackbar(prev => ({ ...prev, visible: false }));
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
        navigation.navigate("OtpScreen")
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Welcome Back</Text>
                <Text style={styles.headerSubText}>Login to continue</Text>
            </View> */}

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
                        <Text style={styles.heading}>Login to continue</Text>
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
                                    <Text style={styles.submitButtonText}>Send OTP</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </Formik>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.footerLink}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>



            <Snackbar
                visible={snackbar.visible}
                message={snackbar.message}
                type={snackbar.type}
            />
        </SafeAreaView>
    );
};

export default Login