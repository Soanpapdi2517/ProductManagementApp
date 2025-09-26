import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import MainContent from './src/Common/MainContent';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Store/store';

const AnimatedSplashScreen = ({ onFinish }) => {
  const scaleValue = new Animated.Value(0.8);
  const opacityValue = new Animated.Value(0);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide splash screen after animation
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.splashContainer, { width, height }]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Image
          source={require('./android/app/src/main/res/drawable/screen.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide native splash screen immediately
    SplashScreen.hide();
  }, []);

  if (showSplash) {
    return <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar
              hidden={false}
              backgroundColor="#ffffff" // Android only
              barStyle="dark-content"
            />
            <MainContent />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});
