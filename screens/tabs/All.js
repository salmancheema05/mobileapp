import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { styles } from "../style/HomeStyle";
import defaultImage from "../../assets/images/3.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { portio } from "../../api/baseurl";
import io from "socket.io-client";
import { Context } from "../../Contextapi/Provider";
function All({ navigation }) {
  const { allFriends } = useContext(Context);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.chatListBox}>
        <FlatList
          data={allFriends}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userBox}
              onPress={() =>
                navigation.navigate("chatingscreen", {
                  friendId: item.id,
                  firstname: item.firstname,
                  lastname: item.lastname,
                  userImage: item.image_name,
                })
              }
            >
              {item.image_name ? (
                <Image
                  style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                  source={{ uri: `data:image/jpg;base64,${item.image_name}` }}
                />
              ) : (
                <Image
                  style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                  source={defaultImage}
                />
              )}
              <Text style={styles.UserName}>
                {item.firstname + " " + item.lastname}
              </Text>
              {item.activestatus == "online" ? (
                <Text style={styles.loginStatus}></Text>
              ) : null}
              <Text style={styles.lastMessage}>
                hello Akshara Where r u ?....
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default All;
