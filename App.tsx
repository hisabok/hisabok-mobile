// import "./global.css";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomerList from "./src/Screens/customerList";
import CustomerListScreen from "./src/Screens/customerList";
import { RentList } from "./src/Screens/rentList";
const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <RentList/>
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