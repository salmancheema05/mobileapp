import React, { useState, useContext } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { styles } from "./style/loginStyle";
import { loginApi } from "../api/userapi";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../Contextapi/Provider";
import { portio } from "../api/baseurl";
import io from "socket.io-client";
import { useNavigation } from "expo-router";
function LoginScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setLogin, setLoginButtonClicked } = useContext(Context);
  const userLogin = async () => {
    const socket = io(portio);
    try {
      if (userName === "") {
        Alert.alert("enter the your User Name");
      } else if (userPassword === "") {
        Alert.alert("enter the your User Password");
      } else {
        let userData = { username: "", password: "" };
        userData.username = userName;
        userData.password = userPassword;
        const result = await loginApi(userData);
        if (result.status === 200) {
          const token = result.data.message;
          const decoded = jwt_decode(token);
          const newData = { ...decoded.user, token };
          const jsonData = JSON.stringify(newData);

          await AsyncStorage.setItem("data", jsonData);
          setLogin(true);
          setLoginButtonClicked(true);
          navigation.navigate("home");
          socket.emit("login", {
            friendid: decoded.user.id,
            activestatus: "online",
          });
        } else {
          Alert.alert("Your username or password is wrong");
        }
      }
    } catch (error) {
      //console.log(error.response.status)
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
      style={{ flex: 1 }}
    >
      <View style={styles.headerone}>
        <Text style={styles.logo}>Chat App</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.mainbody}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputFieldBox}>
            <TextInput
              style={styles.inputfield}
              onChangeText={(newText) => setUserName(newText)}
              autoCapitalize="none"
              placeholder="User Name"
            />
            <TextInput
              style={styles.inputfield}
              onChangeText={(newText) => setUserPassword(newText)}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Password"
            />
            <Text style={styles.signupText}>Create Account</Text>
            <TouchableOpacity
              style={styles.signupBox}
              onPress={() => navigation.navigate("signup")}
            >
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginbutton}
              onPress={() => userLogin()}
            >
              <Text style={styles.buttonTitle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
