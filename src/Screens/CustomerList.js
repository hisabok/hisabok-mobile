import React from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, RefreshControl, Pressable } from 'react-native';
import CustomerCard from '../UiComponents/customerCard/customerCard';
import { customerAPI } from '../../services/api';

const PAGE_SIZE = 20;

const CustomerListScreen = ({ navigation }) => {
    const [loading, setLoading] = React.useState(true);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [customers, setCustomers] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [hasNext, setHasNext] = React.useState(false);

    const fetchPage = React.useCallback(async (pageNumber, replace = false) => {
        try {
            const result = await customerAPI.getAllCustomers({ page: pageNumber, limit: PAGE_SIZE });
            const list = result?.customers || [];
            const pagination = result?.pagination || {};

            const backendHasNext = Boolean(pagination?.has_next ?? (pagination?.current_page < pagination?.total_pages));
            setHasNext(backendHasNext);
            setPage(pageNumber);
            setCustomers(prev => (replace ? list : [...prev, ...list]));
        } catch (err) {
            // Stop further loading on error to avoid loops
            setHasNext(false);
            setError('Failed to fetch customers');
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    }, []);

    React.useEffect(() => {
        fetchPage(1, true);
    }, [fetchPage]);

    const onEndReached = () => {
        if (loading || loadingMore || !hasNext) return;
        // Additional guard: avoid requesting next page if visible list smaller than page size
        if (customers.length < PAGE_SIZE * page) return;
        setLoadingMore(true);
        fetchPage(page + 1);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setError(null);
        fetchPage(1, true);
    };

    if (loading && customers.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Loading customers...</Text>
            </View>
        );
    }

    if (error && customers.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={customers}
                keyExtractor={(customer, index) => (customer.id || customer._id || String(index))}
                contentContainerStyle={styles.listContent}
                renderItem={({ item: customer }) => (
                    <CustomerCard
                        tenantName={customer.customer_full_name || customer.name}
                        rentAmount={customer.rent}
                        dueAmount={customer.due}
                        mobileNumber={customer.customer_mobile || customer.mobile || customer.phone}
                        onAddDues={() => navigation.navigate('AddDues', { customer })}
                        onNamePress={() => navigation.navigate('UserDetails', { customer })}
                    />
                )}
                onEndReachedThreshold={0.2}
                onEndReached={onEndReached}
                ListFooterComponent={loadingMore ? (
                    <View style={{ paddingVertical: 16 }}>
                        <ActivityIndicator />
                    </View>
                ) : null}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={!loading ? (
                    <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
                        <Text>No customers found</Text>
                    </View>
                ) : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    listContent: {
        padding: 10,
        paddingBottom: 20
    }
});

export default CustomerListScreen;