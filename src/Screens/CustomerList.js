import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import CustomerCard from '../UiComponents/customerCard/customerCard';

const CustomerListScreen = () => {
    const fakeCustomers = [
        {
            id: 1,
            name: "Raji Gupta",
            rent: "3000",
            due: "18,000",
            mobile: "+919876543210"
        },
        {
            id: 2,
            name: "Amit Sharma",
            rent: "4000",
            due: "12,000",
            mobile: "+919876543211"
        },
        {
            id: 3,
            name: "Priya Patel",
            rent: "3500",
            due: "10,500",
            mobile: "+919876543212"
        },
        {
            id: 4,
            name: "Vikram Singh",
            rent: "5000",
            due: "15,000",
            mobile: "+919876543213"
        },
        {
            id: 5,
            name: "Neha Reddy",
            rent: "4500",
            due: "9,000",
            mobile: "+919876543214"
        }
    ];

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Loading customers...</Text>
            </View>
        );
    }

    if (fakeCustomers.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No customers found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tenant List</Text>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {fakeCustomers.map((customer) => (
                    <CustomerCard
                        key={customer.id.toString()}
                        tenantName={customer.name}
                        rentAmount={customer.rent}
                        dueAmount={customer.due}
                        mobileNumber={customer.mobile}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    scrollContent: {
        padding: 10,
        paddingBottom: 20
    }
});

export default CustomerListScreen;