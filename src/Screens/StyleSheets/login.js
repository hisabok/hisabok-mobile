import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    innerContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 150,
        height: 150,
    },
    formContainer: {
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    errorText: {
        color: '#f44336',
        marginTop: 5,
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        padding: 20,
        paddingBottom: 10
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    },
    headerSubText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 5
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    footerText: {
        color: '#666',
        fontSize: 16
    },
    footerLink: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default styles