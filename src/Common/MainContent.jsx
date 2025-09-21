import { StyleSheet, BackHandler } from 'react-native';
import { useEffect } from 'react';
import CreateProduct from '../Screens/Stack Screens/CreateProduct';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNav from '../Navigators/BottomTabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

// Wrapper component to disable back button on main tab

const MainContent = () => {
  const Stack = createStackNavigator();

  // color scheme dark or light
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabsNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Products"
          component={CreateProduct}
          options={{
            headerShown: true,
            title: 'Create Product',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  Text: {
    color: '#000000',
    fontSize: 18,
  },
  buttonPressed: {
    backgroundColor: '#dadada',
    padding: 5,
    width: '22%',
    marginRight: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 5,
    width: '22%',
    marginRight: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  btnText: {
    fontSize: 30,
  },
});
