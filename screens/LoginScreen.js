import React, { useState, useContext } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./style/loginStyle";
import { loginApi } from "../api/userapi";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../Contextapi/Provider";
import { portio } from "../api/baseurl";
import io from "socket.io-client";
function LoginScreen({ navigation }) {
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
          navigation.navigate("homescreen");
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
              placeholder="User Name"
            />
            <TextInput
              style={styles.inputfield}
              onChangeText={(newText) => setUserPassword(newText)}
              placeholder="Password"
            />
            <Text style={styles.signupText}>Create Account</Text>
            <TouchableOpacity
              style={styles.signupBox}
              onPress={() => navigation.navigate("signupScreen")}
            >
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => userLogin()}>
              <Text style={styles.buttonTitle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
