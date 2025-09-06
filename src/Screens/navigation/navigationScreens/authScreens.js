import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../login';
import Signup from '../../signup';
import OtpScreen from '../../otpScreen';

const Stack = createNativeStackNavigator();

export default function AuthScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
}
