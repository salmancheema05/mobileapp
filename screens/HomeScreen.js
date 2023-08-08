import React,{useState,useContext} from 'react'
import { Text, View , TouchableOpacity,TouchableHighlight, Alert} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { styles } from "./style/HomeStyle"
import All from './tabs/All';
import GroupeTab from './tabs/GroupeTab'
import RequestTab from './tabs/RequstTab';
import {Entypo} from '@expo/vector-icons';
import { Context } from '../Contextapi/Provider';
function HomeScreen({navigation}) {
  const Tab = createMaterialTopTabNavigator();
  const {openMenu,setOpenMenu} =useContext(Context)

  return (
    <> 
      <TouchableHighlight style={styles.homeHeader} underlayColor="#1D50CF" onPress={() =>setOpenMenu(false)}>
        <>
          <View style={styles.contactBox}>
            <Text style={styles.contactText}>Contact</Text>
          </View>
          <TouchableOpacity style={{position:'absolute',right:15,top:40}} onPress={()=>setOpenMenu(true)}>
            <Entypo name="dots-three-vertical" size={24} color="white"/>
          </TouchableOpacity>
        </>
      </TouchableHighlight>
      
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor:"white",
        tabBarInactiveTintColor: 'gray',
        tabBarStyle:{backgroundColor:'#1D50CF'},
        tabBarIndicatorStyle:{backgroundColor:'white'}
      }}>
        <Tab.Screen name="all" component={All}  />
        <Tab.Screen name="group" component={GroupeTab} />
        <Tab.Screen name="request" component={RequestTab} />
      </Tab.Navigator>
      {openMenu===true?(<View style={styles.dropdownmenu}>
        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('profile')}>
          <Text style={styles.itemText}>Profile</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.item}onPress={()=>Alert.alert('new group')}>
          <Text style={styles.itemText}>New Group </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=>Alert.alert('logout')}>
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </View> ):null}
    </>
    
  )  
}

export default HomeScreen
