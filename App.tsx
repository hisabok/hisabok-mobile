// import "./global.css";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomerList from "./src/Screens/CustomerList";
import CustomerListScreen from "./src/Screens/CustomerList";
const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomerListScreen />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});
export default App;