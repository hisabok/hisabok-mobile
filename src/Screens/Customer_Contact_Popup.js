import React from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Entypo';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * A reusable three-dot options menu component.
 * @param {object} props - The component props.
 * @param {string} props.phoneNumber - The phone number to send messages to.
 * @param {string} props.message - The message content to send.
 */
const OptionsMenu = ({ phoneNumber, message }) => {

  const handleSendMessage = (via) => {
    if (!phoneNumber) {
      Alert.alert("Error", "No phone number provided.");
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    let url = '';

    if (via === 'whatsapp') {
      // The phone number should include the country code without '+' or '00'
      url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else if (via === 'sms') {
      // For SMS, the format can vary slightly by OS but this is standard
      url = `sms:${phoneNumber}?body=${encodedMessage}`;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", `It seems you don't have ${via} installed.`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <Menu>
      <MenuTrigger>
        {/* This is the three-dot icon that users will press */}
        <Icon name="dots-three-vertical" size={24} color="#333" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: styles.menuOptionsContainer,
        }}
      >
        <MenuOption onSelect={() => handleSendMessage('sms')}>
          <View style={styles.optionRow}>
            <MCIcon name="message-text-outline" size={20} color="#111827" />
            <Text style={styles.menuOptionText}>Message via SMS</Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={() => handleSendMessage('whatsapp')}>
          <View style={styles.optionRow}>
            <MCIcon name="whatsapp" size={20} color="#25D366" />
            <Text style={styles.menuOptionText}>Message via WhatsApp</Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuOptionsContainer: {
    marginTop: 30, // Position the menu below the icon
    borderRadius: 8,
    padding: 5,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 8,
    color: '#333',
  },
});

export default OptionsMenu;
