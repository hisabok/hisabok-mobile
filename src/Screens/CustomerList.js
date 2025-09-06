import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomerCard from '../UiComponents/customerCard/customerCard';
import { styles } from './StyleSheets/CustomerListScreen';
import { getAllCustomersWithHisab } from '../services/hisabService';

const CustomerListScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCustomers = useCallback(async () => {
        setRefreshing(true);
        setError(null);
        try {
            const response = await getAllCustomersWithHisab();
            if (response.success) {
                const formattedCustomers = response.data.customers.map(customer => {
                    const hisabData = customer.hisab;
                    return {
                        id: customer.customer_id,
                        hisab_name: hisabData?.hisab_name || customer.name,
                        amount_total_credit: hisabData?.amount_total_credit || 0,
                        amount_total_payments: hisabData?.amount_total_payments || 0,
                        mobile: customer.mobile,
                        dueAmount: (hisabData?.amount_total_credit || 0) - (hisabData?.amount_total_payments || 0)
                    };
                });
                setCustomers(formattedCustomers);
            } else {
                setError(response.message || 'Failed to fetch customer data.');
            }
        } catch (err) {
            console.error("Error fetching customers:", err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchCustomers();
        });
        return unsubscribe;
    }, [navigation, fetchCustomers]);

    const renderItem = ({ item }) => (
        <CustomerCard
            tenantName={item.hisab_name || 'N/A'}
            rentAmount={item.amount_total_credit}
            dueAmount={item.dueAmount}
            mobileNumber={item.mobile}
            navigation={navigation}
        />
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No customers found.</Text>
            <Text style={styles.emptyText}>Pull down to refresh or add a new one.</Text>
            <TouchableOpacity onPress={fetchCustomers} style={styles.reloadButton}>
                <Text style={styles.reloadButtonText}>Reload</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading customers...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchCustomers} style={styles.reloadButton}>
                    <Text style={styles.reloadButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tenant List</Text>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={customers.length === 0 ? styles.emptyFlatList : null}
                ListEmptyComponent={renderEmptyComponent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchCustomers} />
                }
            />
            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('AddCustomer')}
            >
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default CustomerListScreen;