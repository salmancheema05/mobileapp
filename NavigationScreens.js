import React,{useState, useEffect, useContext} from 'react';
import ChatingScreen from './screens/ChatingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context } from './Contextapi/Provider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Profile from './screens/Profile';
const NavigationScreens = () => {
  const  {isLogin,setLogin}= useContext(Context)
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()
  useEffect(() =>{
    const getUserData = async () =>{
      try{
        //await AsyncStorage.removeItem('data');
        const getData = await AsyncStorage.getItem("data")
         if(getData==null){
          setLogin(false)
          console.log('token  null')
        }
        else{
          const parsed = JSON.parse(getData); 
          const token =  parsed.token
          if(token){
            setLogin(parsed.loginstatus)
          }

        }
      }
      catch(error){
        console.log(error)
      }
    }
    getUserData()
    
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='homescreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        {
          isLogin===true?(
            <>  
              <Stack.Screen name="homescreen"    component={HomeScreen} />
              <Stack.Screen name="chatingscreen" component={ChatingScreen} />
              <Stack.Screen name="profile" component={Profile} />
            </>
          ):
          (
            <>
              <Stack.Screen name="loginscreen" component={LoginScreen} />
              <Stack.Screen name="signupScreen" component={SignupScreen} />
           </>
          )
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default NavigationScreens