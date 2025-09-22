import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNav from '../Navigators/BottomTabNavigator';
import CreateProduct from '../Screens/Stack Screens/CreateProduct';
import { createStackNavigator } from '@react-navigation/stack';

const MainContent = () => {
  const Stack = createStackNavigator();
  // color scheme dark or light
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main Tabs">
        <Stack.Screen
          name="Create Products"
          component={CreateProduct}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Main Tabs"
          component={BottomTabsNav}
          options={{ headerShown: false, headerStyle:{borderRadius: 20} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContent;

const styles = StyleSheet.create({});
