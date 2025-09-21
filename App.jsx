import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import MainContent from './src/Common/MainContent';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/Reducer/index';
const store = configureStore({
  reducer: rootReducer,
});
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    // Hide splash screen after component mounts
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          hidden={false}
          backgroundColor={isDarkMode ? "#ffffff" : '#000000'} // Android only
          barStyle="dark-content"
        />
        <MainContent />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
