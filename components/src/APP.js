import 'react-native-gesture-handler';
import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomHeader, CustomDrawerConten} from './index';
import {
  HomeScreen,
  HomeScreenDetail,
  MoreScreen,
  HistoryScreen,
  SearchScreen,
  CartScreen,
} from './tab';
import {NotificationsScreen} from './drawer';
import {
  RegistersScreen,
  LoginScreen,
  ForgotPasswordScreen,
  StartsScreen,
} from './auth';
import {IMAGE} from './constants/image';

const NavigationHandler = () => ({
  headerShown: false,
});

const StackHome = createStackNavigator();
function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={NavigationHandler}
      />
      <StackHome.Screen
        name="More"
        component={MoreScreen}
        options={NavigationHandler}
      />
      <StackHome.Screen
        name="HomeDetail"
        component={HomeScreenDetail}
        options={NavigationHandler}
      />
      {/* <StackHome.Screen
        name="CartTour"
        component={CartScreen}
        options={NavigationHandler}
      /> */}
    </StackHome.Navigator>
  );
}

const StackCart = createStackNavigator();
export function CartStack() {
  return (
    <StackCart.Navigator initialRouteName="Cart">
      <StackCart.Screen
        name="Cart"
        component={CartScreen}
        options={NavigationHandler}
      />
    </StackCart.Navigator>
  );
}

const StackHistory = createStackNavigator();
function HistoryStack() {
  return (
    <StackHistory.Navigator initialRouteName="History">
      <StackHistory.Screen
        name="History"
        component={HistoryScreen}
        options={NavigationHandler}
      />
    </StackHistory.Navigator>
  );
}

const StackSearch = createStackNavigator();
function SearchStack() {
  return (
    <StackSearch.Navigator initialRouteName="Search">
      <StackSearch.Screen
        name="Search"
        component={SearchScreen}
        options={NavigationHandler}
      />
    </StackSearch.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? IMAGE.ICON_HOMEBLACK : IMAGE.ICON_HOME;
          } else if (route.name === 'Search') {
            iconName = focused ? IMAGE.IMG_SEARCHBLACK : IMAGE.IMG_SEARCH;
          } else if (route.name === 'History') {
            iconName = focused ? IMAGE.ICON_HISTORY_BLACK : IMAGE.ICON_HISTORY;
          } else if (route.name === 'Cart') {
            iconName = focused ? IMAGE.ICON_CART_BLACK : IMAGE.ICON_CART;
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Cart" component={CartStack} />
    </Tab.Navigator>
  );
}
const Drawer = createDrawerNavigator();
function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerConten navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
const StackApp = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Start">
        <StackApp.Screen
          name="Start"
          component={StartsScreen}
          options={NavigationHandler}
        />
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={NavigationHandler}
        />
        <StackApp.Screen
          name="Register"
          component={RegistersScreen}
          options={NavigationHandler}
        />
        <StackApp.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={NavigationHandler}
        />
        <StackApp.Screen
          name="HomeApp"
          component={DrawerNavigator}
          options={NavigationHandler}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
