import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { validateOtp, requestOtp } from '../services/authService';
import { setAuthToken } from '../redux/authSlice';
import Snackbar from '../UiComponents/snackbar/snackbar';
import styles from './StyleSheets/otpScreen';

function OtpScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        type: 'success'
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputs = useRef([]);
    const mobileNumber = route.params?.mobile || '';

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

    const focusNext = (index, value) => {
        if (value && index < 5) {
            otpInputs.current[index + 1].focus();
        }
    };

    const focusPrevious = (index, key) => {
        if (key === 'Backspace' && index > 0) {
            otpInputs.current[index - 1].focus();
        }
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        focusNext(index, value);
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join('');
        console.log('Entered OTP:', enteredOtp);

        if (!enteredOtp || enteredOtp.length < 6) {
            showSnackbar('Please enter complete OTP', 'failure');
            return;
        }

        try {
            const response = await validateOtp(mobileNumber, enteredOtp);
            console.log('Validate OTP response:', response);
            if (response.success) {
                dispatch(setAuthToken(response.data.authToken)); // Store token in Redux
                if (response.data.isExistingUser) {
                    showSnackbar('Login successful');
                    navigation.navigate('App', { authToken: response.data.authToken });
                } else {
                    showSnackbar('New user, please sign up');
                    navigation.navigate('SignUp', { mobile: mobileNumber });
                }
            } else {
                showSnackbar(response.message || 'Invalid OTP', 'failure');
            }
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Error verifying OTP', 'failure');
        }
    };

    const handleResend = async () => {
        try {
            const response = await requestOtp(mobileNumber);
            console.log('Resend OTP response:', response);
            if (response.success) {
                showSnackbar('OTP resent successfully');
            } else {
                showSnackbar(response.message || 'Failed to resend OTP', 'failure');
            }
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Error resending OTP', 'failure');
        }
    };

    const handleChangeMobile = () => {
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.header}>Verify OTP</Text>
                <Text style={styles.subHeader}>
                    We've sent a 6-digit OTP to {'\n'}+91-{mobileNumber}
                </Text>
                <View style={styles.otpContainer}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (otpInputs.current[index] = ref)}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            onChangeText={(value) => handleOtpChange(index, value)}
                            onKeyPress={({ nativeEvent: { key } }) => focusPrevious(index, key)}
                            value={otp[index]}
                            selectTextOnFocus
                        />
                    ))}
                </View>
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendText}>
                        Didn't receive OTP? <Text style={styles.resendLink}>Resend OTP</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                    <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
                <View style={styles.footerOptions}>
                    <TouchableOpacity onPress={handleChangeMobile}>
                        <Text style={styles.footerOptionText}>Change Mobile Number</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Snackbar
                visible={snackbar.visible}
                message={snackbar.message}
                type={snackbar.type}
            />
        </KeyboardAvoidingView>
    );
}

export default OtpScreen;