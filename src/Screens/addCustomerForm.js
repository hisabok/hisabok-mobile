import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Snackbar from '../UiComponents/snackbar/snackbar';
import { styles } from './StyleSheets/addCustomer';
const AddCustomerScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
        rent: Yup.number()
            .required('Rent amount is required')
            .positive('Rent amount must be positive')
    });

    const showSnackbar = (message, type = 'success') => {
        setSnackbar({
            visible: true,
            message,
            type,
            duration: 3000,
        });
    };

    const hideSnackbar = () => {
        setSnackbar(prev => ({ ...prev, visible: false }));
    };

    const submitHandler = () => {
        console.log('Form submitted:', formValues);
        setIsModalVisible(false);
        showSnackbar('Customer added successfully!', 'success');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Customer</Text>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    mobile: '',
                    rent: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    setFormValues(values);
                    setIsModalVisible(true);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
                        {/* Name */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Name*</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                placeholder="Enter full name"
                            />
                            {touched.name && errors.name && (
                                <Text style={styles.errorText}>{errors.name}</Text>
                            )}
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email*</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                placeholder="Enter email"
                            />
                            {touched.email && errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                        </View>

                        {/* Mobile Number */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mobile Number*</Text>
                            <View style={styles.mobileInputContainer}>
                                <Text style={styles.countryCode}>+91</Text>
                                <TextInput
                                    style={[styles.input, styles.mobileInput]}
                                    onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    value={values.mobile}
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    placeholder="Enter 10 digit mobile number"
                                />
                            </View>
                            {touched.mobile && errors.mobile && (
                                <Text style={styles.errorText}>{errors.mobile}</Text>
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Rent Per Month*</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('rent')}
                                onBlur={handleBlur('rent')}
                                value={values.rent}
                                keyboardType="numeric"
                                placeholder="Enter rent amount"
                            />
                            {touched.rent && errors.rent && (
                                <Text style={styles.errorText}>{errors.rent}</Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.submitButtonText}>Add Customer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm</Text>
                        <Text style={styles.modalText}>Are you sure you want to add this customer?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={submitHandler}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Snackbar
                visible={snackbar.visible}
                message={snackbar.message}
                type={snackbar.type}
            />
        </View>
    );
};


export default AddCustomerScreen;