import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerListScreen from './src/Screens/customerList';
import AddCustomerScreen from './src/Screens/addCustomerForm';
import Login from './src/Screens/login';
import Signup from './src/Screens/signup';
import OtpScreen from './src/Screens/otpScreen';
import RentList from './src/Screens/rentList';
import BusinessProfile from './src/Screens/bussinessProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="CustomerListScreen" component={CustomerListScreen} options={{headerShown:false}}/>
        <Stack.Screen name="AddCustomerForm" component={AddCustomerScreen} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={Signup} options={{headerShown:false}} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} options={{headerShown:false}} />
        <Stack.Screen name="RentList" component={RentList} options={{headerShown:false}} />
        <Stack.Screen name="BussinessProfile" component={BusinessProfile} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
