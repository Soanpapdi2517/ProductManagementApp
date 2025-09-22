import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNav from '../Navigators/BottomTabNavigator';
import CreateProduct from '../Screens/Stack Screens/CreateProduct';
import ProductDetail from '../Screens/Stack Screens/ProductDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { useDispatch } from 'react-redux';
import { setFocusedData } from '../Slices/dataSlice';
const MainContent = () => {
  const dispatch = useDispatch();
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
          options={{ headerShown: false, headerStyle: { borderRadius: 20 } }}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetail}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: { borderRadius: 20 },
            headerLeft: props => (
              <HeaderBackButton
                {...props}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContent;

const styles = StyleSheet.create({});
