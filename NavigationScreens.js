import React, { useState, useEffect, useContext } from "react";
import ChatingScreen from "./screens/ChatingScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Context } from "./Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./screens/Profile";
import SearchScreen from "./screens/SearchScreen";
import { portio } from "./api/baseurl";
import io, { connect } from "socket.io-client";
import { AppState, View } from "react-native";
import { AllFriendsApi } from "../ChatAPP/api/fetchFriendsApi";
let allFriendsGlobal = null;
const NavigationScreens = () => {
  const { isLogin, setAllFriends } = useContext(Context);
  const Stack = createStackNavigator();
  const socket = io(portio);
  const activestatusUpdate = (data) => {
    const indexToUpdate = allFriendsGlobal.findIndex(
      (item) => item.id === data.friendid
    );
    if (indexToUpdate !== -1) {
      allFriendsGlobal[indexToUpdate].activestatus = data.activestatus;
    }
    setAllFriends(null);
    setAllFriends(allFriendsGlobal);
  };
  const userActive = async () => {
    try {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      const id = parsed.id;
      const result = await AllFriendsApi(id);
      setAllFriends(result.data);
      allFriendsGlobal = result.data;
      socket.emit("yourFriendonline", {
        friendid: id,
        activestatus: "online",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const appClose = async () => {
    const getData = await AsyncStorage.getItem("data");
    const parsed = JSON.parse(getData);
    const userId = parsed.id;
    socket.emit("yourFriendOffline", {
      friendid: userId,
      activestatus: "offline",
    });
  };
  socket.on("inactivestatus", (data) => {
    if (allFriendsGlobal.length > 0) {
      activestatusUpdate(data);
    }
  });
  socket.on("activestatus", (data) => {
    if (allFriendsGlobal.length > 0) {
      activestatusUpdate(data);
    }
  });

  useEffect(() => {
    //await AsyncStorage.removeItem('data');

    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("app close");
        await appClose();
      } else if (nextAppState === "active") {
        console.log("app open1  ");
        await userActive();
      }
    };
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
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
