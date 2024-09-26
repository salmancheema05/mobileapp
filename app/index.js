import React, { useEffect, useContext } from "react";
import { Text, View, AppState } from "react-native";
import { Context } from "../Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import useUserStatus from "../customHook/useUserStatus";
import io from "socket.io-client";
import { portio } from "../api/baseurl";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  const { setLogin } = useContext(Context);
  const navigation = useNavigation();
  const { userActive, activestatusUpdate } = useUserStatus();
  const { loginbuttonClicked } = useContext(Context);
  const socket = io(portio);

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
      const subscription = AppState.addEventListener(
        "change",
        handleAppStateChange
      );
      return () => {
        subscription.remove();
      };
    }
  }, []);
  useEffect(() => {
    const userData = async () => {
      try {
        const getData = await AsyncStorage.getItem("data");
        if (getData == null) {
          setTimeout(() => {
            setLogin(false);
            navigation.navigate("login");
          }, 3000);
        } else {
          setTimeout(() => {
            setLogin(true);
            navigation.navigate("home");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1D50CF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="light" />
      <Text style={{ fontSize: 50, fontWeight: "bold", color: "white" }}>
        Chat App
      </Text>
    </View>
  );
}
