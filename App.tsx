// import "./global.css";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerListScreen from "./src/Screens/CustomerList";
import AddDuesScreen from "./src/Screens/AddDuesScreen";
import UserDetailsScreen from "./src/Screens/UserDetailsScreen";
import api from './services/api';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    api.get('/your-endpoint')
      .then((response: { data: any }) => {
        // handle data
        console.log(response.data);
      })
      .catch((error: any) => {
        // handle error
        console.error(error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="CustomerList"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen 
          name="CustomerList" 
          component={CustomerListScreen} 
          options={{ title: 'Tenant List' }} 
        />
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
  );
};

export default App;
