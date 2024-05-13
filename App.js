import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import Drawer from './Drawer';

export default function App() {
  return (
    <SafeAreaView style = {{flex:1}}>
      <NavigationContainer>
        <Drawer></Drawer>
      </NavigationContainer>
    </SafeAreaView>
  );
}