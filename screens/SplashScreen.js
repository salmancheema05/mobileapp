import React, { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Context } from "../Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SplashScreen({ navigation }) {
  const { setLogin } = useContext(Context);
  useEffect(() => {
    const userData = async () => {
      try {
        const getData = await AsyncStorage.getItem("data");
        if (getData == null) {
          setTimeout(() => {
            setLogin(false);
            navigation.navigate("loginscreen");
          }, 3000);
        } else {
          setTimeout(() => {
            setLogin(true);
            navigation.navigate("homescreen");
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
