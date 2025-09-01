import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function RentCard(props) {
    const {
        title = 'Aug Rent',
        amount = '₹15,000',
        addedBy = 'Rent Manager',
        dueDate = '01 Aug 2025'
    } = props;

    return (
        <View style={styles.card}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.amount}>{amount}</Text>
            </View>

            <View style={styles.detailsRow}>
                <View>
                    <Text style={styles.detailLabel}>Added by</Text>
                    <Text style={styles.detailText}>{addedBy}</Text>
                </View>
                <View style={styles.dueDateContainer}>
                    <Text style={styles.detailLabel}>Due date</Text>
                    <Text style={[styles.detailText, styles.dueDateText]}>{dueDate}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryAction}>
                    <Text style={styles.primaryActionText}>Record Payment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryAction}>
                    <Icon name="bell" size={16} color="#4CAF50" />
                    <Text style={styles.secondaryActionText}>Remind to Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    detailText: {
        fontSize: 14,
        color: '#666',
    },
    dueDateContainer: {
        alignItems: 'flex-end', // Align to right
    },
    dueDateText: {
        textAlign: 'right', // Ensure text aligns right
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    primaryAction: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    primaryActionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    secondaryAction: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    secondaryActionText: {
        color: '#4CAF50',
        marginLeft: 8,
    },
});