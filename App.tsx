import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react';
import Navigation from './src/Screens/navigation/navigationContainer';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
      </PersistGate>
    </Provider>
  );
}
