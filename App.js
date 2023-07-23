import React,{useState} from 'react';
import ChatingScreen from './screens/ChatingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GroupeScreen from './screens/GroupeScreen';
import RequestScreen from './screens/RequstScreen';
RequestScreen
const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='splashScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="loginscreen" component={LoginScreen} />
        <Stack.Screen name="signupScreen" component={SignupScreen} />
        <Stack.Screen name="homeScreen" component={HomeScreen} />
        <Stack.Screen name="chatingScreen" component={ChatingScreen} />
        <Stack.Screen name="groupescreen" component={GroupeScreen} />
        <Stack.Screen name="requestscreen" component={RequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default  App