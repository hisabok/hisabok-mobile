import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './StyleSheets/bussinessProfile';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser, updateUserProfile } from '../redux/authSlice';
import { updateBusinessProfile } from '../services/businessService';

const BusinessProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const initialBusinessData = {
        name: currentUser?.fullName || '',
        businessName: currentUser?.businessName || '',
        mobile: currentUser?.mobile || '',
        address: currentUser?.businessAddress || ''
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
            if (!newState[field]) {
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

    const handleSubmit = async (values) => {
        if (!currentUser?.id) {
            Alert.alert('Error', 'User ID not found. Please log in again.');
            return;
        }

        try {
            const response = await updateBusinessProfile(currentUser.id, values);

            if (response.success) {
                dispatch(updateUserProfile(values));
                setInitialValues(values);
                setEditStates({ name: false, businessName: false, address: false });
                setIsEdited(false);
                Alert.alert('Success', 'Profile updated successfully.');
            } else {
                Alert.alert('Update Failed', response.message || 'Could not update profile.');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
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
                            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                        </View>
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
                            {touched.businessName && errors.businessName && <Text style={styles.errorText}>{errors.businessName}</Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mobile</Text>
                            <TextInput
                                style={[styles.input, styles.disabledInput]}
                                value={values.mobile}
                                editable={false}
                            />
                        </View>
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
                            {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                        </View>
                        <TouchableOpacity
                            style={[styles.submitButton, !isEdited && styles.disabledButton]}
                            onPress={handleSubmit}
                            disabled={!isEdited}
                        >
                            <Text style={styles.submitButtonText}>Update Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.LogoutButton]}
                            onPress={() => {
                                dispatch(logOut());
                            }}
                        >
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default BusinessProfile;