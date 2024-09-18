import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { styles } from "./style/HomeStyle";
import All from "./tab/all";
import Request from "./tab/requst";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { Context } from "../Contextapi/Provider";
import { logoutApi } from "../api/userapi";
import io from "socket.io-client";
import { portio } from "../api/baseurl";
import { useNavigation } from "expo-router";
function HomeScreen() {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const socket = io(portio);
  const {
    openMenu,
    setOpenMenu,
    setLogin,
    requestsCount,
    setAllRequest,
    setRequestsCount,
    setAllFriends,
  } = useContext(Context);
  const logout = async () => {
    const getData = await AsyncStorage.getItem("data");
    const parsed = JSON.parse(getData);
    const { id, token } = parsed;
    const userObject = { userid: id, loginstatus: false, token: token };
    const result = await logoutApi(userObject);
    if (result.status == 200) {
      await AsyncStorage.removeItem("data");
      setLogin(false);
      setOpenMenu(false);
      navigation.navigate("login");
      setAllFriends([]);
      setAllRequest(null);
      setRequestsCount(0);
      socket.emit("yourFriendOffline", {
        friendid: id,
        activestatus: "offline",
      });
    }
  };

  useEffect(() => {
    socket.on("requestdatareceive", async (data) => {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      if (data.receiver_id == parsed.id) {
        setAllRequest((prevMessages) => [...prevMessages, data]);
        setRequestsCount(requestsCount + 1);
      }
    });
    socket.on("accepted", async (data) => {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      if (data.sender_id == parsed.id) {
        setAllFriends((prevMessages) => [...prevMessages, data]);
        setRequestsCount(requestsCount - 1);
      }
    });
  }, []);
  return (
    <>
      <TouchableHighlight
        style={styles.homeHeader}
        underlayColor="#1D50CF"
        onPress={() => setOpenMenu(false)}
      >
        <>
          <View style={styles.contactBox}>
            <Text style={styles.contactText}>Contact</Text>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: 40, top: 37 }}
            onPress={() => navigation.navigate("search")}
          >
            <EvilIcons name="search" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 15, top: 40 }}
            onPress={() => setOpenMenu(true)}
          >
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </>
      </TouchableHighlight>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#1D50CF" },
          tabBarIndicatorStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen name="all" component={All} />
        <Tab.Screen
          name="request"
          component={Request}
          options={{
            title: "Request",
            tabBarBadge: () =>
              requestsCount > 0 ? (
                <Text
                  style={{
                    backgroundColor: "white",
                    marginRight: 40,
                    marginTop: 15,
                    paddingTop: 3,
                    textAlign: "center",
                    width: 20,
                    height: 20,
                    borderRadius: 20 / 2,
                    color: "black",
                    fontSize: 10,
                  }}
                >
                  {requestsCount}
                </Text>
              ) : null,
          }}
        />
      </Tab.Navigator>

      {openMenu === true ? (
        <View style={styles.dropdownmenu}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("profile")}
          >
            <Text style={styles.itemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => Alert.alert("new group")}
          >
            <Text style={styles.itemText}>New Group </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => logout()}>
            <Text style={styles.itemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

export default HomeScreen;
