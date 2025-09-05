import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomerListScreen from '../CustomerList';
import RentList from '../rentList';
import BusinessProfile from '../bussinessProfile';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Customers') {
            iconName = 'people';
          } else if (route.name === 'Rentals') {
            iconName = 'list-alt';
          } else if (route.name === 'Profile') {
            iconName = 'business';
          } else {
            iconName = 'help';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomerListScreen} />
      <Tab.Screen name="Profile" component={BusinessProfile} />
    </Tab.Navigator>
  );
}
