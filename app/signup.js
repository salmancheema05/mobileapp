import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "./style/loginStyle";
import { signupApi } from "../api/userapi";
import { useNavigation } from "expo-router";
function SignupScreen() {
  const navigation = useNavigation();
  const [radioCheck, setRadioCheck] = useState({ value: null });
  const [textFields, setTextFields] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const selectGender = (value) => {
    setRadioCheck({ value: value });
    setTextFields({ ...textFields, gender: value });
  };
  const signup = async () => {
    try {
      const {
        firstname,
        lastname,
        email,
        username,
        password,
        confirmpassword,
        gender,
      } = textFields;
      if (
        firstname.trim() == "" ||
        lastname.trim() == "" ||
        email.trim() == "" ||
        username.trim() == "" ||
        password.trim() == "" ||
        confirmpassword.trim() == "" ||
        gender == ""
      ) {
        Alert.alert("Required All Fields");
      } else if (password != confirmpassword) {
        Alert.alert("Your confirm Password is wrong");
      } else {
        const updatedTextFields = { ...textFields };
        delete updatedTextFields.confirmpassword;
        const result = await signupApi(updatedTextFields);
        if (result.status == 200) {
          if (result.data.error) {
            Alert.alert(result.data.error);
          } else {
            Alert.alert(result.data.message);
            setTextFields({
              firstname: "",
              lastname: "",
              email: "",
              username: "",
              password: "",
              confirmpassword: "",
              gender: "",
            });
            setRadioCheck({ value: null });
            navigation.navigate("login");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                value={textFields.firstname}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setTextFields({ ...textFields, firstname: text })
                }
                placeholder="First Name"
              />
              <TextInput
                style={styles.signupInputField}
                value={textFields.lastname}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setTextFields({ ...textFields, lastname: text })
                }
                placeholder="Last Name"
              />
              <TextInput
                style={styles.signupInputField}
                value={textFields.email}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setTextFields({ ...textFields, email: text })
                }
                placeholder="Email"
              />
              <TextInput
                style={styles.signupInputField}
                value={textFields.username}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setTextFields({ ...textFields, username: text })
                }
                placeholder="User Name"
              />

              <TextInput
                style={styles.signupInputField}
                value={textFields.password}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setTextFields({ ...textFields, password: text })
                }
                secureTextEntry={true}
                placeholder="Password"
              />
              <TextInput
                style={styles.signupInputField}
                value={textFields.confirmpassword}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setTextFields({ ...textFields, confirmpassword: text })
                }
                secureTextEntry={true}
                placeholder="Confirm Password"
              />
              <View style={styles.radioBox}>
                <TouchableOpacity
                  style={styles.RadioButton}
                  onPress={() => selectGender("male")}
                >
                  {radioCheck.value == "male" ? (
                    <View style={styles.RadioButtonChecked}></View>
                  ) : null}
                </TouchableOpacity>
                <Text style={styles.RadioButtonText}>Male</Text>
                <TouchableOpacity
                  style={styles.RadioButton}
                  onPress={() => selectGender("female")}
                >
                  {radioCheck.value == "female" ? (
                    <View style={styles.RadioButtonChecked}></View>
                  ) : null}
                </TouchableOpacity>
                <Text style={styles.RadioButtonText}>Female</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => signup()}>
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
