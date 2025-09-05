// import "./global.css";
import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerListScreen from "./src/Screens/CustomerList";
import AddDuesScreen from "./src/Screens/AddDuesScreen";
import UserDetailsScreen from "./src/Screens/UserDetailsScreen";
import { MenuProvider } from 'react-native-popup-menu';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="UserDetails"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen 
          name="UserDetails" 
          component={UserDetailsScreen} 
          options={{ title: 'User Details' }} 
        />
        <Stack.Screen 
          name="AddDues" 
          component={AddDuesScreen} 
          options={{ title: 'Add Dues' }} 
        />
        {/* Add more screens here later */}
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
