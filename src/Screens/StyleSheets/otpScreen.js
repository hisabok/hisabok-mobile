import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    otpInput: {
        width: 45,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    resendText: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    resendLink: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    verifyButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerOptionText: {
        color: '#4CAF50',
        fontWeight: '500',
        paddingHorizontal: 10,
    },
    separator: {
        width: 1,
        height: 16,
        backgroundColor: '#ccc',
    },
});

export default styles;