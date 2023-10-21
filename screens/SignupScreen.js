import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./style/loginStyle";
function SignupScreen() {
  return (
    <>
      <View style={styles.headerone}>
        <Text style={styles.logo}>Chat App</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.mainbody}>
          <ScrollView>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputFieldBox}>
              <TextInput
                style={styles.signupInputField}
                placeholder="First Name"
              />
              <TextInput
                style={styles.signupInputField}
                placeholder="Last Name"
              />
              <TextInput
                style={styles.signupInputField}
                placeholder="User Name"
              />
              <TextInput
                style={styles.signupInputField}
                placeholder="Password"
              />
              <TextInput
                style={styles.signupInputField}
                placeholder="Confirm Password"
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

export default SignupScreen;
