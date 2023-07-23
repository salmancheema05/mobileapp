import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View,KeyboardAvoidingView,TextInput,TouchableOpacity} from 'react-native';
import { styles } from './style/loginStyle'
function SignupScreen() {
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
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.inputFieldBox}>
                    <TextInput style={styles.signupInputField} placeholder='First Name'/>
                    <TextInput style={styles.signupInputField} placeholder='Last Name'/>
                    <TextInput style={styles.signupInputField} placeholder='User Name' />
                    <TextInput style={styles.signupInputField} placeholder='Password'/>
                    <TextInput style={styles.signupInputField} placeholder='Confirm Password'/>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonTitle}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
           
        
    </KeyboardAvoidingView>
  )
}

export default SignupScreen
