import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreens from './navigationScreens/authScreens';
import AppStack from './navigationScreens/appScreens';
import AddCustomerScreen from '../addCustomerForm';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

enableScreens();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  // @ts-ignore
  const token = useSelector((state) => state.auth.authToken);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreens} />
      )}
      <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
    </Stack.Navigator>
  );
}