import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const EditBedNoModal = ({ visible, onClose, onSave, currentBedNo, title = 'Edit Text', placeholder = 'Type here' }) => {
  const [bedNo, setBedNo] = useState(currentBedNo);

  // When the modal becomes visible or the prop changes, update the local state
  useEffect(() => {
    setBedNo(currentBedNo);
  }, [currentBedNo, visible]);

  const handleSave = () => {
    // Call the onSave function passed from the parent screen
    onSave(bedNo);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        {/* This Pressable acts as a background overlay to close the modal */}
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBedNo}
            value={bedNo}
            placeholder={placeholder}
            autoFocus={true}
          />
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
            >
              <Text style={styles.textStyleCancel}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave}
            >
              <Text style={styles.textStyleSave}>Save</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#111827'
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    elevation: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonClose: {
    backgroundColor: '#e5e7eb',
    marginRight: 10,
  },
  buttonSave: {
    backgroundColor: '#4f46e5',
  },
  textStyleCancel: {
    color: '#374151',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleSave: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditBedNoModal;
