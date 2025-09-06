import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        borderBottomColor: '#eee',
        textAlign: 'center'
    },
    scrollContent: {
        padding: 10,
        paddingBottom: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        textAlign: 'center'
    },
    reloadButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 8
    },
    reloadButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    // New styles for the Floating Action Button (FAB)
    floatingButton: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#FF5722', // Use a color similar to the image
        width: 60,
        height: 60,
        borderRadius: 30, // Makes it a perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default styles;