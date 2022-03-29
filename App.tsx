import React from 'react';
import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SelectScreen from './src/screens/SelectScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { Dimensions,StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

const win = Dimensions.get('window');

export type RootStackParamList = {
  Home : any;
  Login: any;
  Register : any;
  Select : any;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>  
      <Stack.Navigator>  
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  background: {
    color : 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
  }

});

