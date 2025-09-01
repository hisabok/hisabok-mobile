import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '../bottomTabNavigation';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}