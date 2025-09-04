// screens/UserDetailsScreen.js
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MonthCard from "../UiComponents/rentBook/MonthCard";
import { customerAPI } from "../../services/api";

const UserDetailsScreen = ({ route, navigation }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const customerData = route.params?.customer;
    console.log('UserDetails route params customer:', customerData?.id, customerData?.hisab_id);
    if (customerData) {
      // Try to normalize hisab_id from various possible shapes
      const derivedHisabId =
        customerData.hisab_id ||
        customerData.hisabId ||
        customerData.hisab?.id ||
        customerData.hisab?.hisab_id;
      if (derivedHisabId && !customerData.hisab_id) {
        console.log('Derived hisab_id from route customer:', derivedHisabId);
        setCustomer({ ...customerData, hisab_id: derivedHisabId });
      } else {
        setCustomer(customerData);
      }
    } else {
      setError("No customer data provided.");
    }
  }, [route.params]);

  // Resolve hisab_id if missing by fetching full customer
  useEffect(() => {
    const ensureHisabId = async () => {
      if (!customer || customer.hisab_id || !customer.id) return;
      try {
        setLoading(true);
        const full = await customerAPI.getCustomerById(customer.id);
        const derivedHisabId =
          full?.hisab_id ||
          full?.hisabId ||
          full?.hisab?.id ||
          full?.hisab?.hisab_id;
        console.log('Fetched full customer for hisab:', full?.id, full?.hisab_id, 'derived:', derivedHisabId);
        if (derivedHisabId) {
          setCustomer(prev => ({ ...(prev || {}), hisab_id: derivedHisabId }));
        } else {
          // Temporary fallback provided by user
          const fallback = "43963014-7d59-4095-9ea0-8d1e8d620f26";
          console.warn('No hisab_id found for customer. Using fallback hisab_id temporarily:', fallback);
          setCustomer(prev => ({ ...(prev || {}), hisab_id: fallback }));
        }
      } catch (e) {
        // non-fatal: just log
        console.warn("Failed to load full customer for hisab_id", e);
      } finally {
        setLoading(false);
      }
    };
    ensureHisabId();
  }, [customer]);

  useLayoutEffect(() => {
    if (customer) {
      navigation.setOptions({
        headerTitle: customer.customer_full_name || "User Details",
        headerBackTitleVisible: false,
        headerRight: () => (
          <Pressable style={{ paddingRight: 10 }}>
            <Icon name="account-box-outline" size={22} color="#111827" />
          </Pressable>
        ),
      });
    }
  }, [navigation, customer]);

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  if (error || !customer) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={{ padding: 18 }}>
          <Text style={{ color: "red", marginTop: 12 }}>
            {error || "No customer data."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const customerName = customer.customer_full_name || customer.name || "Customer";

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Customer Info Header */}
        <View style={styles.customerHeader}>
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileInitial}>
              {customerName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{customerName}</Text>
            <Text style={styles.customerMobile}>
              {customer.customer_mobile || "No mobile number"}
            </Text>
          </View>
        </View>

        {/* Rent Book with mock data preview */}
        <Text style={styles.sectionTitle}>Rent Book</Text>
        {(() => {
          const mockMonths = [
            {
              monthLabel: 'November 2025',
              periodLabel: '13 Nov to 12 Dec',
              totalDue: 4500,
              balance: 0,
              transactions: [
                { date: '13 Nov', credit: 4500, debit: 0, status: 'W' },
                { date: '14 Nov', credit: 0, debit: 0, status: 'W' },
                { date: '15 Nov', credit: 0, debit: 0, status: 'C' },
              ],
            },
            {
              monthLabel: 'October 2025',
              periodLabel: '13 Oct to 12 Nov',
              totalDue: 4500,
              balance: 0,
              transactions: [
                { date: '13 Oct', credit: 4500, debit: 0, status: 'W' },
                { date: '20 Oct', credit: 0, debit: 0, status: 'W' },
                { date: '28 Oct', credit: 0, debit: 0, status: 'C' },
              ],
            },
          ];

          return mockMonths.map((m, idx) => (
            <MonthCard
              key={`${m.monthLabel}-${idx}`}
              monthLabel={m.monthLabel}
              periodLabel={m.periodLabel}
              totalDue={m.totalDue}
              balance={m.balance}
              transactions={m.transactions}
            />
          ));
        })()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    padding: 18,
    paddingBottom: 32,
  },
  customerHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  profilePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  customerMobile: {
    fontSize: 14,
    color: "#6b7280",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 10,
    marginBottom: 8,
  },
});

export default UserDetailsScreen;
