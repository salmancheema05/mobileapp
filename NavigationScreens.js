import React, { useState, useEffect, useContext } from "react";
import ChatingScreen from "./screens/ChatingScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Context } from "./Contextapi/Provider";
import Profile from "./screens/Profile";
import SearchScreen from "./screens/SearchScreen";
import { portio } from "./api/baseurl";
import io from "socket.io-client";
import { AppState } from "react-native";
import useUserStatus from "./customHook/useUserStatus";

const NavigationScreens = () => {
  const { userActive, activestatusUpdate } = useUserStatus();
  const { isLogin, loginbuttonClicked } = useContext(Context);
  const Stack = createStackNavigator();
  const socket = io(portio);

  const appClose = async () => {
    console.log("app close");
    // const getData = await AsyncStorage.getItem("data");
    // const parsed = JSON.parse(getData);
    // const userId = parsed.id;
    // socket.emit("yourFriendOffline", {
    //   friendid: userId,
    //   activestatus: "offline",
    // });
  };
  socket.on("inactivestatus", (data) => {
    activestatusUpdate(data);
  });
  socket.on("activestatus", (data) => {
    activestatusUpdate(data);
  });

  useEffect(() => {
    if (loginbuttonClicked == false) {
      const handleAppStateChange = async (nextAppState) => {
        if (nextAppState === "background" || nextAppState === "inactive") {
          await appClose();
        } else if (nextAppState === "active") {
          await userActive();
        }
      };
      AppState.addEventListener("change", handleAppStateChange);
      return () => {
        AppState.removeEventListener("change", handleAppStateChange);
      };
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="homescreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        {isLogin === true ? (
          <>
            <Stack.Screen name="homescreen" component={HomeScreen} />
            <Stack.Screen name="chatingscreen" component={ChatingScreen} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="searchscreen" component={SearchScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="loginscreen" component={LoginScreen} />
            <Stack.Screen name="signupScreen" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationScreens;
