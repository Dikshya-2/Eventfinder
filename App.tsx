import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import EventDetail from './src/screens/EventDetail';
import Favorites from './src/screens/Favorites';
import PushNotification from 'react-native-push-notification';
import Notification from './src/components/Notification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from './src/Navigation/types';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
  let iconName = '';

  if (routeName === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'Favorites') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (routeName === 'Notifications') {
    iconName = focused ? 'notifications' : 'notifications-outline';
  } else if (routeName === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name, focused, color, size),
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Notifications" component={Notification} />
    {/* <Tab.Screen name="Profile" component={Profile} /> */}
  </Tab.Navigator>
);

export default function App() {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'eventfinder-channel',
        channelName: 'EventFinder Notifications',
        channelDescription: 'A channel to categorise EventFinder notifications',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetail}
          options={{ title: 'Event Details' }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ title: 'Favorite Events' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
