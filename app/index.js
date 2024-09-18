import React, { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Context } from "../Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
export default function SplashScreen() {
  const { setLogin } = useContext(Context);
  const navigation = useNavigation();
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
