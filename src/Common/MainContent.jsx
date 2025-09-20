import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Dashboard from '../Screens/Dashboard';
import LimitedProducts from '../Screens/LimitedProducts';
import CreateOrEditProducts from '../Screens/CreateOrEditProducts';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const Tab = createBottomTabNavigator();

  const BottomTabs = () => {
    const insets = useSafeAreaInsets();
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: {},
          tabBarActiveBackgroundColor: '#ffffff',
          tabBarStyle: {
            height: 60 + insets.bottom,
            gap: 20,
            backgroundColor: '#dadada',
            borderRadius: 15,
            borderWidth: 1,
            position: 'fixed',
            bottom: 0,
            marginHorizontal: '1%',
          },
          tabBarLabelStyle: { display: 'none' },
          tabBarButton: props => {
            const { children, onPress } = props;
            const RouteName = [
              'All Products',
              'Limited Products',
              'Create Products',
            ];

            const tabIndex = RouteName.indexOf(route.name);
            const isSelected = activeTab === tabIndex;
            return (
              <Pressable
                onPress={() => {
                  setActiveTab(tabIndex);
                  onPress();
                }}
                style={{
                  width: '100%',
                  flex: 1,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isSelected ? '#ffffff' : 'transparent',
                }}
              >
                {children}
              </Pressable>
            );
          },
        })}
      >
        <Tab.Screen
          name="All Products"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="dashboard" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Limited Products"
          component={LimitedProducts}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="production-quantity-limits"
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create Products"
          component={CreateOrEditProducts}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="create" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  // color scheme dark or light
  return (
    <NavigationContainer>
      <BottomTabs />
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
