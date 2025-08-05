import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Snackbar from '../UiComponents/snackbar/snackbar';
import styles from './StyleSheets/otpScreen';
function OtpScreen({ navigation }) {
    const [snackbar, setSnackbar] = useState({
        visible: true,
        message: '',
        type: 'success'
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputs = useRef([]);
    const mobileNumber = '+91-8076676966';
    useEffect(() => {
        if (snackbar.visible) {
            const timer = setTimeout(() => {
                setSnackbar(prev => ({ ...prev, visible: false }));
            }, 3000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [snackbar.visible]);
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

    const handleVerify = () => {
        const enteredOtp = otp.join('');
        console.log('Entered OTP:', enteredOtp);

        if (!enteredOtp || enteredOtp.length < 6) {
            showSnackbar("Please enter complete OTP", 'failure');
            return; // Add return to prevent further execution
        }

        showSnackbar('OTP Verified Successfully!!!');
    };

    const handleResend = () => {
        console.log('Resend OTP requested');
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
                    We've sent a 6-digit OTP to {'\n'}{mobileNumber}
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
};



export default OtpScreen;