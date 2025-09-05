// AmountCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AmountCard = ({ amount, label, bgColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.amount}>₹{amount}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, // Allows the card to grow and take up equal space
    borderRadius: 12,
    paddingVertical: 12, // Reduced vertical padding
    marginHorizontal: 4, // Switched to horizontal margin for spacing
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: 16, // Slightly smaller font size for the amount
    fontWeight: "700", // Bolder weight
    color: "#111827",
  },
  label: {
    fontSize: 12, // Smaller font size for the label
    color: "#374151",
    marginTop: 4,
    textAlign: "center",
  },
});

export default AmountCard;