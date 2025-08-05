// import "./global.css";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddCustomerScreen from "./src/Screens/addCustomerForm";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Signup from "./src/Screens/signup";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
        <SafeAreaProvider>
          <Signup/>
        </SafeAreaProvider>
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