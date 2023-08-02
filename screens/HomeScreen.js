import React,{useState} from 'react'
import { Text, View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { styles } from "./style/HomeStyle"
import All from './tabs/All';
import GroupeScreen from './tabs/GroupeScreen'
import RequstScreen from './tabs/RequstScreen'
function HomeScreen({navigation}) {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <View style={styles.homeHeader}>
        <View style={styles.contactBox}>
          <Text style={styles.contactText}>Contact</Text>
        </View>
      </View>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor:"white",
        tabBarInactiveTintColor: 'gray',
        tabBarStyle:{backgroundColor:'#1D50CF'},
        tabBarIndicatorStyle:{backgroundColor:'white'}
      }}>
        <Tab.Screen name="all" component={All}  />
        <Tab.Screen name="group" component={GroupeScreen} />
        <Tab.Screen name="request" component={RequstScreen} />
      </Tab.Navigator>
    </>
    
  )  
}

export default HomeScreen
