import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../components/TabBar';

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="upload" options={{ title: '' }} />
      <Tabs.Screen name="cdps" options={{ title: 'CDPS' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

export default _layout;
