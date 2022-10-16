import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';

import CameraScreen from './screens/CameraScreen';
import DashboardScreen from './screens/DashboardScreen';
import CameraScreen2 from './screens/CameraScreen2';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Camera'>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Camera" component={CameraScreen2}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
