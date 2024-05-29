import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import Drawer from './Drawer';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  return (
    <SafeAreaView style = {{flex:1}}>
      <NavigationContainer>
        <Drawer></Drawer>
      </NavigationContainer>
    </SafeAreaView>
  );
}