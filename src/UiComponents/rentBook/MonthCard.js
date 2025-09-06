import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const MonthCard = ({
  monthLabel,
  periodLabel,
  totalDue,
  balance = 0,
  transactions = [],
}) => {
  const formatMoney = (val) => {
    if (val === null || val === undefined) return '0';
    return Number(val).toLocaleString('en-IN');
  };

  const totalCredit = transactions.reduce((sum, t) => sum + (Number(t.credit) || 0), 0);
  const totalDebit = transactions.reduce((sum, t) => sum + (Number(t.debit) || 0), 0);

  const renderStatus = (status) => {
    if (status === 'W') {
      return <FontAwesome name="whatsapp" size={18} color="#10b981" />;
    } else if (status === 'C') {
      return <Feather name="phone-call" size={18} color="#3b82f6" />;
    } else {
      return <Text style={styles.statusText}>{status}</Text>;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.monthTitle}>{monthLabel}</Text>
          <Text style={styles.periodText}>{periodLabel}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.headerDue}>₹{formatMoney(totalDue)}</Text>
          <Text style={styles.balanceText}>Balance: ₹{formatMoney(balance)}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerCols]}>
          <Text style={[styles.th, { flex: 2, textAlign: 'left' }]}>Date</Text>
          <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>+ Rs</Text>
          <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>- Rs</Text>
          <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Status</Text>
        </View>

        <View style={styles.separator} />

        {transactions.map((t, idx) => (
          <View key={`${t.date}-${idx}`} style={styles.row}>
            <Text style={[styles.td, { flex: 2, textAlign: 'left' }]}>{t.date}</Text>
            <Text
              style={[
                styles.td,
                { flex: 1, textAlign: 'right', color: t.credit > 0 ? '#10b981' : '#6b7280' },
              ]}
            >
              {t.credit > 0 ? formatMoney(t.credit) : '0'}
            </Text>
            <Text
              style={[
                styles.td,
                { flex: 1, textAlign: 'right', color: t.debit > 0 ? '#ef4444' : '#6b7280' },
              ]}
            >
              {t.debit > 0 ? formatMoney(t.debit) : '0'}
            </Text>
            <View style={[styles.td, { flex: 1, alignItems: 'center' }]}>
              {renderStatus(t.status)}
            </View>
          </View>
        ))}

        <View style={styles.separator} />

        <View style={[styles.row, styles.totalRow]}>
          <Text style={[styles.totalLabel, { flex: 2, textAlign: 'left' }]}>Total</Text>
          <Text style={[styles.td, { flex: 1, textAlign: 'right', color: '#10b981' }]}>
            {formatMoney(totalCredit)}
          </Text>
          <Text style={[styles.td, { flex: 1, textAlign: 'right', color: '#ef4444' }]}>
            {formatMoney(totalDebit)}
          </Text>
          <Text style={[styles.td, { flex: 1, textAlign: 'center', fontWeight: '600' }]}>
            {transactions.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3, borderWidth: 1, borderColor: '#f3f4f6' },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  monthTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  periodText: { marginTop: 2, color: '#6b7280', fontSize: 13 },
  headerDue: { color: '#ef4444', fontWeight: '700', fontSize: 18 },
  balanceText: { color: '#6b21a8', fontSize: 13, fontWeight: '600' },
  table: { backgroundColor: '#fff' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, minHeight: 36 },
  headerCols: { paddingTop: 0, paddingBottom: 8 },
  th: { color: '#111827', fontWeight: '600', fontSize: 14 },
  td: { color: '#374151', fontSize: 14 },
  separator: { height: 1, backgroundColor: '#e5e7eb' },
  totalRow: { marginTop: 8, paddingVertical: 8 },
  totalLabel: { fontWeight: 'bold', color: '#111827', fontSize: 15 },
  statusText: { fontSize: 14, fontWeight: '500', color: '#6b7280' },
});

export default MonthCard;