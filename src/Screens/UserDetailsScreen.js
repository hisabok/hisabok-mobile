import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MonthCard from "../UiComponents/rentBook/MonthCard";
import AmountCard from "../UiComponents/customerCard/AmountCard";
// ✅ FINAL FIX: Simplified the import path to match the new folder structure
import getHisabDetails from "../../services/transactionsApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomerContactPopup from './Customer_Contact_Popup';
import EditBedNoModal from './EditCustomerScreen';
import styles from './styles/UserDetailsStyles';

const UserDetailsScreen = ({ route, navigation }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periods, setPeriods] = useState([]);
  const [showEditBedModal, setShowEditBedModal] = useState(false);
  const [rentSummary, setRentSummary] = useState({
    old: 0,
    last: 0,
    current: 0,
    total: 0,
  });

  const handleSaveBedNo = (newLine) => {
    try {
      setCustomer((prev) => (prev ? { ...prev, bed_line: newLine } : prev));
    } finally {
      setShowEditBedModal(false);
    }
  };

  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  const fetchHisabDetails = async (hisabId) => {
    if (!hisabId) {
      console.log('No hisab_id provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found.');
        setLoading(false);
        return;
      }

      const result = await getHisabDetails(hisabId, token);
      console.log('✅ API Response Received:', result.data);

      if (result.success && result.data) {
        // Derive customer details directly from hisab payload
        const d = result.data;
        const bedNoVal = d.bed_no || '--';
        setCustomer({
          id: d.customer_id,
          customer_full_name: d.name,
          customer_mobile: d.mobile,
          bed_no: bedNoVal,
          // free-text line shown under the name; initially includes the label but can be edited to anything
          bed_line: `Bed No: ${bedNoVal}`,
          hisab_id: d.hisab_id,
        });

        setRentSummary({
          ...d.balances,
          total: typeof d.totalOutstandingBalance === 'number' ? d.totalOutstandingBalance : 0,
        });
        setPeriods(d.periods || []);
      } else {
        Alert.alert('Info', result.message || 'No details found for this hisab.');
        setRentSummary({ old: 0, last: 0, current: 0, total: 0 });
        setPeriods([]);
      }
    } catch (error) {
      console.error('❌ Error fetching hisab details:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const setupAndFetch = async () => {
      const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc19pZCI6ImE5MTIxZThhLWVlNWMtNDY5Yi05OGM4LTQ2MmIzZTA1NTRiYyIsImFjY291bnRfaWQiOiJkMGVmMDZlYy0xNWE4LTQwMmYtOTQyYy05ZTNhNzE5ZjY5NmYiLCJtb2JpbGUiOiI5ODk4OTg5ODk3IiwidG9rZW5JZCI6IjI5MWU3N2EwLWRhZjgtNGMwMS04ZjgwLWNjZTNlNDRlOTgyYiIsImlhdCI6MTc1NzA3NjkwNywidHlwZSI6ImFjY2VzcyIsImV4cCI6MTc1NzE2MzMwN30.qTaBGT_afGeV64V4UPCI10dYT6kLjIk9HBkyVfTyt6E';
      await AsyncStorage.setItem('authToken', testToken);
      // Prefer hisab_id from navigation params, fall back to a test id
      const hisabIdFromRoute = route.params?.customer?.hisab_id;
      const hisabId = hisabIdFromRoute || '43963014-7d59-4095-9ea0-8d1e8d620f26';

      if (hisabId) {
        console.log('Fetching hisab_id:', hisabId);
        await fetchHisabDetails(hisabId);
      } else {
        console.log('No hisab_id found in customer data');
        setLoading(false);
      }
    };
    setupAndFetch();
  }, [route.params]);

  const amountCardData = [
    { amount: rentSummary.old, label: "Old Dues", bgColor: "#f3f4f6" },
    { amount: rentSummary.last, label: "Last", bgColor: "#dbeafe" },
    { amount: rentSummary.current, label: "Current", bgColor: "#fee2e2" },
    { amount: rentSummary.total, label: "Total Outstanding", bgColor: "#f3e8ff" },
  ];

  useLayoutEffect(() => {
    if (customer) {
      navigation.setOptions({
        headerTitle: () => (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#111827" }}>
              {customer.customer_full_name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: "#6b7280" }}>
                {customer.bed_line || ''}
              </Text>
              <Pressable
                onPress={() => setShowEditBedModal(true)}
                style={{ marginLeft: 6, padding: 2 }}
                accessibilityLabel="Edit bed number"
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Icon name="pencil" size={16} color="#6b7280" />
              </Pressable>
            </View>
          </View>
        ),
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={{ marginRight: 8 }}>
            <CustomerContactPopup
              phoneNumber={customer.customer_mobile}
              message={`Hello ${customer.customer_full_name}, this is a message regarding your hisab.`}
            />
          </View>
        ),
      });
    }
  }, [navigation, customer]);

  if (loading && !customer) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={styles.loadingText}>Loading customer details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            Rent ₹4500 every month due on 3rd of every month.
          </Text>

          {loading && (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="small" color="#4f46e5" />
              <Text style={styles.loadingTextSmall}>Fetching details...</Text>
            </View>
          )}

          <View style={styles.rentSummaryRow}>
            {amountCardData.map((item, index) => (
              <AmountCard key={index} {...item} />
            ))}
          </View>

          <View style={styles.actionsRow}>
            <Pressable style={styles.actionBtn}>
              <Icon name="send" size={20} color="#111827" />
              <Text style={styles.actionText}>Send Report</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Icon name="plus" size={20} color="#111827" />
              <Text style={styles.actionText}>Add Rent</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Icon name="cash" size={20} color="#111827" />
              <Text style={styles.actionText}>Add Payment</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Icon name="bell-outline" size={20} color="#111827" />
              <Text style={styles.actionText}>Send Reminder</Text>
            </Pressable>
          </View>
        </View>

        {!loading && (!periods || periods.length === 0) ? (
          <View style={styles.noDataCard}>
            <Icon name="clipboard-text-outline" size={48} color="#9ca3af" />
            <Text style={styles.noDataText}>No transaction periods found</Text>
            <Text style={styles.noDataSubtext}>
              Transaction history will appear here.
            </Text>
          </View>
        ) : (
          periods.map((period) => {
            const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            const formattedTransactions = (period.transactions || []).map(tx => ({
              date: new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
              credit: tx.type === 'credit' ? tx.amount : 0,
              debit: tx.type === 'payment' ? tx.amount : 0,
              status: 'W',
            }));

            return (
              <MonthCard
                key={period.id}
                monthLabel={new Date(period.period_start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                periodLabel={`${formatDate(period.period_start_date)} to ${formatDate(period.period_end_date)}`}
                totalDue={period.amount_total_period_credit}
                balance={period.balance_period_closing}
                transactions={formattedTransactions}
              />
            );
          })
        )}
      </ScrollView>

      {/* Edit Bed No Modal */}
      <EditBedNoModal
        visible={showEditBedModal}
        onClose={() => setShowEditBedModal(false)}
        onSave={handleSaveBedNo}
        currentBedNo={customer?.bed_line || ''}
        title="Edit header line"
        placeholder="Type any text to show under the name"
      />
    </SafeAreaView>
  );
};

// styles are imported from ./styles/UserDetailsStyles

export default UserDetailsScreen;