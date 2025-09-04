import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// --- IMPORTANT ---
// Make sure you have these libraries installed in your project:
// npm install react-native-vector-icons
// npm install @react-native-community/datetimepicker
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

// --- Main App Component (Now compatible with React Native) ---
export default function AddDuesScreen({ route }) {
  // Use customer from navigation params, fallback to mock
  const customer = route?.params?.customer || { name: 'John Doe' };

  // --- State Management ---
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- Event Handlers ---

  /**
   * Handles the form submission with validation.
   */
  const handleSubmit = () => {
    // Validation logic
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid, positive number for the amount.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Invalid Input', 'Please provide a brief description.');
      return;
    }

    // Show a success message using React Native's Alert API
    const message = `Amount: ₹${amount}\nDescription: ${description}\nDate: ${date.toLocaleDateString()}`;
    Alert.alert('Due Added Successfully!', message);

    // Reset form after submission
    setAmount('');
    setDescription('');
    setDate(new Date());
  };

  /**
   * Handles changes from the date picker component.
   */
/**
   * Handles changes from the date picker component.
   */
  const onDateChange = (event, selectedDate) => {
    // Always hide the date picker after an action (select or cancel)
    setShowDatePicker(false);

    // If a date was selected (i.e., the user didn't cancel), update the state
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
  };
  // --- Render Method ---
  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add a New Due</Text>
            <Text style={styles.subHeaderText}>for {customer.name}</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Amount Input */}
            <View style={styles.inputContainer}>
              <Icon name="currency-inr" size={22} color="#6b7280" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
              <Icon name="text-box-outline" size={22} color="#6b7280" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., August Milk Bill"
                  placeholderTextColor="#9ca3af"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>

            {/* Date Picker Input */}
            <Pressable onPress={() => setShowDatePicker(true)}>
              <View style={styles.inputContainer}>
                <Icon name="calendar-month" size={22} color="#6b7280" style={styles.icon} />
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={[styles.input, { color: '#3b82f6' }]}>{date.toLocaleDateString('en-GB')}</Text>
                </View>
              </View>
            </Pressable>
          </View>

          {/* DateTimePicker is rendered conditionally */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()} // Prevent future dates
            />
          )}

          {/* Submit Button */}
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Due</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- StyleSheet for React Native ---
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#4b5563',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 4,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

