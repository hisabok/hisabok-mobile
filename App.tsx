import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react';
import Navigation from './src/Screens/navigation/navigationContainer';

export default function App() {
  return (
    <Navigation/>
  );
}
