import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreens from './navigationScreens/authScreens';
import AppStack from './navigationScreens/appScreens';
import AddCustomerScreen from '../addCustomerForm';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistor } from '../../redux/store'; // Import your persistor

enableScreens();

export default function Navigation() {
  return (
    <NavigationContainer>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
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