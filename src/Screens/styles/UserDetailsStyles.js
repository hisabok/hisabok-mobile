import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f9fafb' },
  container: { padding: 16, paddingBottom: 32 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#6b7280' },
  loadingIndicator: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 },
  loadingTextSmall: { marginLeft: 8, fontSize: 12, color: '#6b7280' },
  sectionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '500', marginBottom: 12, color: '#111827' },
  rentSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  actionsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionBtn: { width: '48%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: 10, backgroundColor: '#f3f4f6', borderRadius: 10, marginBottom: 10 },
  actionText: { marginLeft: 8, fontSize: 13, fontWeight: '500', color: '#111827' },
  noDataCard: { backgroundColor: '#fff', borderRadius: 12, padding: 32, alignItems: 'center', marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  noDataText: { fontSize: 16, fontWeight: '500', color: '#6b7280', marginTop: 12 },
  noDataSubtext: { fontSize: 14, color: '#9ca3af', textAlign: 'center', marginTop: 4 },
});

export default styles;
