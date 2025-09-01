import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    formContainer: {
        marginTop: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        height: 50,
    },
    mobileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        backgroundColor: '#fff',
        padding: 12,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: '#ddd',
        fontSize: 16,
    },
    mobileInput: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f44336',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    snackbar: {
        backgroundColor: '#4CAF50',
    },
});