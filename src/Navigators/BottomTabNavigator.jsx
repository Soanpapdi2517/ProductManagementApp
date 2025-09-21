import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Dashboard from '../Screens/Dashboard';
import LimitedProducts from '../Screens/LimitedProducts';
import CreateOrEditProducts from '../Screens/CreateOrEditProducts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const BottomTabsNav = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: true,
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
        tabBarButton: props => {
          const { children, onPress } = props;
          return (
            <Pressable
              onPress={() => {
                onPress();
              }}
              style={{
                width: '100%',
                flex: 1,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
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
        name="Create or Edit Products"
        component={CreateOrEditProducts}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="create" size={30} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Create Products');
              }}
              style={({ pressed }) => [
                styles.headerBtn,
                pressed && { backgroundColor: '#d0cecee9' },
              ]}
            >
              <Feather name="plus" size={30} color="#000000" />
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNav;

const styles = StyleSheet.create({
  headerBtn: {
    marginRight: 4,
    borderRadius: 50,
    padding: 4,
  },
});
