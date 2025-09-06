import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styleSheet';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const CustomerCard = ({
  tenantName = 'Tenant Name',
  rentAmount = '0',
  dueAmount = '0',
  mobileNumber = '',
  currency = '₹',
  profileImage = null,
  navigation
}) => {
  const handleCall = () => {
    if (mobileNumber) {
      Linking.openURL(`tel:${mobileNumber}`);
    }
  };

  const handleWhatsApp = () => {
    if (mobileNumber) {
      const message = `Hi ${tenantName}, regarding your rent payment of ${currency}${dueAmount}`;
      Linking.openURL(`whatsapp://send?phone=${mobileNumber}&text=${encodeURIComponent(message)}`);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.profileContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitial}>
                {tenantName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.tenantName} numberOfLines={1} ellipsizeMode="tail">
          {tenantName}
        </Text>

        {mobileNumber && (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleCall} style={styles.iconButton}>
              <Icon name="phone" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWhatsApp} style={styles.iconButton}>
              <Icon name="whatsapp" size={20} color="#25D366" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.rentContainer}>
        <Text style={styles.rentText}>
          Rent: {currency}{rentAmount}/Monthly
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.duesRow}>
          <View style={styles.duesLeft}>
            <Text style={styles.dueLabel}>Dues: </Text>
            <Text style={styles.dueAmount}>{currency}{dueAmount}</Text>
          </View>
          <TouchableOpacity style={styles.addDuesButton} onPress={() => navigation.navigate("AddCustomer")}>
            <Text style={styles.addDuesText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomerCard;