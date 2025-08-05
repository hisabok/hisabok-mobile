import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from '../UiComponents/snackbar/snackbar';

const BusinessProfile = () => {
    const initialBusinessData = {
        name: 'John Doe',
        businessName: 'Doe Enterprises',
        mobile: '+919876543210',
        address: '123 Business St, City, Country'
    };

    const [isEdited, setIsEdited] = useState(false);
    const [initialValues, setInitialValues] = useState(initialBusinessData);
    const [editStates, setEditStates] = useState({
        name: false,
        businessName: false,
        address: false
    });
    const [tempValues, setTempValues] = useState(initialBusinessData);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        businessName: Yup.string().required('Business name is required'),
        address: Yup.string().required('Address is required')
    });

    const toggleEdit = (field) => {
        setEditStates(prev => {
            const newState = { ...prev, [field]: !prev[field] };

            if (newState[field] === false) {
                setTempValues(prevValues => ({
                    ...prevValues,
                    [field]: initialValues[field]
                }));
            }

            const anyEdited = Object.values(newState).some(state => state);
            setIsEdited(anyEdited);

            return newState;
        });
    };

    const handleSubmit = (values) => {
        console.log('Updated business profile:', values);

        setInitialValues(values);
        setEditStates({
            name: false,
            businessName: false,
            address: false
        });
        setIsEdited(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Business Profile</Text>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
                        {/* Name */}
                        <View style={styles.inputContainer}>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>Name*</Text>
                                <TouchableOpacity onPress={() => toggleEdit('name')}>
                                    <Icon
                                        name={editStates.name ? 'times' : 'pencil'}
                                        size={20}
                                        color={editStates.name ? '#f44336' : '#4CAF50'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={[styles.input, !editStates.name && styles.disabledInput]}
                                onChangeText={(text) => {
                                    handleChange('name')(text);
                                    setTempValues(prev => ({ ...prev, name: text }));
                                }}
                                onBlur={handleBlur('name')}
                                value={editStates.name ? tempValues.name : values.name}
                                placeholder="Enter your name"
                                editable={editStates.name}
                            />
                            {touched.name && errors.name && (
                                <Text style={styles.errorText}>{errors.name}</Text>
                            )}
                        </View>

                        {/* Business Name */}
                        <View style={styles.inputContainer}>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>Business Name*</Text>
                                <TouchableOpacity onPress={() => toggleEdit('businessName')}>
                                    <Icon
                                        name={editStates.businessName ? 'times' : 'pencil'}
                                        size={20}
                                        color={editStates.businessName ? '#f44336' : '#4CAF50'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={[styles.input, !editStates.businessName && styles.disabledInput]}
                                onChangeText={(text) => {
                                    handleChange('businessName')(text);
                                    setTempValues(prev => ({ ...prev, businessName: text }));
                                }}
                                onBlur={handleBlur('businessName')}
                                value={editStates.businessName ? tempValues.businessName : values.businessName}
                                placeholder="Enter business name"
                                editable={editStates.businessName}
                            />
                            {touched.businessName && errors.businessName && (
                                <Text style={styles.errorText}>{errors.businessName}</Text>
                            )}
                        </View>

                        {/* Mobile (non-editable) */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mobile</Text>
                            <TextInput
                                style={[styles.input, styles.disabledInput]}
                                value={values.mobile}
                                editable={false}
                            />
                        </View>

                        {/* Address */}
                        <View style={styles.inputContainer}>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>Address*</Text>
                                <TouchableOpacity onPress={() => toggleEdit('address')}>
                                    <Icon
                                        name={editStates.address ? 'times' : 'pencil'}
                                        size={20}
                                        color={editStates.address ? '#f44336' : '#4CAF50'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={[styles.input, !editStates.address && styles.disabledInput]}
                                onChangeText={(text) => {
                                    handleChange('address')(text);
                                    setTempValues(prev => ({ ...prev, address: text }));
                                }}
                                onBlur={handleBlur('address')}
                                value={editStates.address ? tempValues.address : values.address}
                                placeholder="Enter business address"
                                editable={editStates.address}
                            />
                            {touched.address && errors.address && (
                                <Text style={styles.errorText}>{errors.address}</Text>
                            )}
                        </View>

                        {/* Update Button */}
                        <TouchableOpacity
                            style={[styles.submitButton, !isEdited && styles.disabledButton]}
                            onPress={handleSubmit}
                            disabled={!isEdited}
                        >
                            <Text style={styles.submitButtonText}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    formContainer: {
        marginTop: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        height: 50,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
        color: '#666',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BusinessProfile;