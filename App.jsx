import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import MainContent from './src/Common/MainContent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});
const App = () => {
  useEffect(() => {
    // Hide splash screen after component mounts
    SplashScreen.hide();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          hidden={false}
          backgroundColor={isDarkMode ? '#000000' : '#ffffff'} // Android only
          barStyle="dark-content"
        />
        <MainContent />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
