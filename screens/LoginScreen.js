import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View,KeyboardAvoidingView,TextInput,TouchableOpacity,Alert} from 'react-native';
import { styles } from './style/loginStyle'
function LoginScreen({navigation}) {
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={{flex:1}}
    >
        <View style={styles.headerone}>
            <Text style={styles.logo}>Chat App</Text>
        </View>
        <View style={styles.body}>
            <View style={styles.mainbody}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputFieldBox}>
                    <TextInput style={styles.inputfield} placeholder='User Name' />
                    <TextInput style={styles.inputfield} placeholder='Password'/>
                    <Text style={styles.signupText}>Create Account</Text>
                    <TouchableOpacity style={styles.signupBox} onPress={()=>navigation.navigate("signupScreen")}>
                        <Text style={styles.signup}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("homeScreen")}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>     
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
