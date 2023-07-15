import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View,KeyboardAvoidingView,TextInput,TouchableOpacity} from 'react-native';
import { styles } from './style/loginStyle'
function LoginScreen() {
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
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
           
        
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
