import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { RentCard } from '../UiComponents/rentCard/rentCard';
import { styles } from './StyleSheets/rentList';
export function RentList() {
    const [tenantDetails, setTenantDetails] = useState({
        name: 'Tanmay Gupta',
        email: 'tanmay631@gmail.com',
        phone: '+91 9876543210',
        totalDue: '₹30,000',
        room: '112',
        property: 'Green Valley Apartments'
    });

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Rent History</Text>

            <View style={styles.tenantDetails}>
                <Text style={styles.tenantName}>{tenantDetails.name}</Text>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Email:</Text>
                        <Text style={styles.detailValue}>{tenantDetails.email}</Text>
                    </View>
                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Phone:</Text>
                        <Text style={styles.detailValue}>{tenantDetails.phone}</Text>
                    </View>
                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Due:</Text>
                        <Text style={[styles.detailValue, styles.totalDue]}>{tenantDetails.totalDue}</Text>
                    </View>
                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Room No:</Text>
                        <Text style={styles.detailValue}>{tenantDetails.room}</Text>
                    </View>
                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Property:</Text>
                        <Text style={styles.detailValue}>{tenantDetails.property}</Text>
                    </View>
                </View>
            </View>

            <RentCard
                title="August Rent"
                amount="₹15,000"
                addedBy="Rent Manager"
                dueDate="01 Aug 2025"
                status="Pending"
            />
            <RentCard
                title="July Rent"
                amount="₹15,000"
                addedBy="Rent Manager"
                dueDate="01 Jul 2025"
                status="Paid"
            />
        </ScrollView>
    );
}

