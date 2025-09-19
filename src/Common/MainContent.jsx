import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Dashboard from '../Screens/Dashboard';
import LimitedProducts from '../Screens/LimitedProducts';
import CreateOrEditProducts from '../Screens/CreateOrEditProducts';
import { NavigationContainer } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainContent = () => {

  const Tab = createBottomTabNavigator();

  const BottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: '#ffffff',
          tabBarStyle: {
            height: 100,
            gap: 20,
            backgroundColor: '#dadada',
            borderRadius: 25,
            borderWidth: 1,
            position: 'fixed',
            bottom: 0,
          },
          tabBarButton: props => {
            const { children, accessibilityState, onPress } = props;
            const focused = accessibilityState?.selected;
            console.log(accessibilityState);
            return (
              <Pressable
                onPress={onPress}
                style={{
                  flex: 1,
                  borderRadius: 12, // 👈 makes it rounded
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {children}
              </Pressable>
            );
          },
        }}
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
            headerRight: () => (
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
              >
                <Text style={styles.btnText}>+</Text>
              </Pressable>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
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
