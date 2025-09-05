import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerListScreen from '../../CustomerList';
import AddCustomerScreen from '../../addCustomerForm';

const Stack = createNativeStackNavigator();

export default function CustomerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerList" component={CustomerListScreen} />
    </Stack.Navigator>
  );
}
