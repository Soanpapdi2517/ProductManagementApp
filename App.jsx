import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import MainContent from './src/Common/MainContent';
const App = () => {
  useEffect(() => {
    // Hide splash screen after component mounts
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <MainContent />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
