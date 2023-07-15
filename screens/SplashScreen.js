import React,{useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
export default function SplashScreen({navigation}) {
  useEffect(()=>{
    setTimeout(()=>{                          
      navigation.navigate("loginscreen")
  }, 3000);
  },[])
  return (
    <View style={{flex:1,backgroundColor:"#1D50CF", justifyContent:"center",alignItems:'center'}} >
        <StatusBar style="light"/>
        <Text style={{fontSize:50,fontWeight:"bold", color:"white"}}>Chat App</Text>
      
    </View>
  );
}