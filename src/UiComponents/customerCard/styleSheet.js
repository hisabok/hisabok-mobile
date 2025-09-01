import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileContainer: {
        marginRight: 12,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    profilePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e1bee7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitial: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4a148c',
    },
    tenantName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 8,
    },
    rentContainer: {
        marginBottom: 12,
    },
    rentText: {
        fontSize: 16,
        color: '#666',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        padding: 6,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    duesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    duesLeft: {
        flexDirection: 'row',
    },
    dueLabel: {
        fontSize: 16,
        color: '#999',
        textTransform: 'uppercase',
    },
    dueAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    addDuesButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    addDuesText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
});