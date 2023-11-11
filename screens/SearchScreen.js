import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./style/searchScreenStyle";
import image1 from "../assets/images/1.jpg";
import defaultImage from "../assets/images/3.png";
import { searchPeople } from "../api/searchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { acceptRequests, removeRequestApi } from "../api/requestApi";
import io from "socket.io-client";
import { portio } from "../api/baseurl";
import useAcceptButton from "../customHook/useAcceptButton";
const SearchScreen = () => {
  const [allFriends, setAllFriends] = useState(null);
  const { accept, cancelRequst, updateRequestStatuts } = useAcceptButton(
    allFriends,
    setAllFriends
  );

  const userSearch = async (search) => {
    try {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      const id = parsed.id;
      const data = { userid: id, search: search };
      const result = await searchPeople(data);
      if (result.status == 200) {
        setAllFriends(result.data);
      } else {
        setAllFriends(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeRequst = async (senderid, receiverId) => {
    try {
      const object = { sender_id: senderid, receiver_id: receiverId };
      const result = await removeRequestApi(object);
      updateRequestStatuts(receiverId, null, null, null);
      if (result.status == 200) {
        Alert.alert(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequst = async (receiverId) => {
    try {
      const socket = io(portio);
      let object = { sender_id: 0, receiver_id: 0 };
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      const senderid = parsed.id;
      const friendId = receiverId;
      object.sender_id = senderid;
      object.receiver_id = receiverId;
      socket.emit("requestsend", object);
      updateRequestStatuts(friendId, friendId, "pending", senderid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={{ flex: 1 }}
      >
        <View style={styles.searchBox}>
          <View style={styles.searchArrowBox}>
            <TouchableOpacity>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBarBox}>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: "white",
                color: "white",
              }}
              placeholderTextColor="white"
              onChangeText={(usersearch) => userSearch(usersearch)}
              placeholder="Search"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.searchListBox}>
          <FlatList
            data={allFriends}
            renderItem={({ item }) => (
              <View style={styles.searchUserBox}>
                <View style={styles.searchImageBox}>
                  {item.image_name ? (
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                      source={{
                        uri: `data:image/jpg;base64,${item.image_name}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                      source={defaultImage}
                    />
                  )}
                </View>
                <View style={styles.searchUserDetailBox}>
                  <View style={styles.searchUserNameBox}>
                    <Text style={styles.searchUserName}>
                      {item.firstname + " " + item.lastname}{" "}
                    </Text>
                  </View>
                  <View style={styles.searchRequestControl}>
                    {item.request_status == "pending" &&
                    item.sender_id == item.id ? (
                      <View style={styles.groupButtonBox}>
                        <TouchableOpacity
                          style={styles.searchGroupButton}
                          onPress={() =>
                            accept(item.sender_id, item.receiver_id)
                          }
                        >
                          <Text style={styles.searchButtonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.searchGroupButton}
                          onPress={() =>
                            cancelRequst(
                              item.sender_id,
                              item.receiver_id,
                              "search"
                            )
                          }
                        >
                          <Text style={styles.searchButtonText}>cancel</Text>
                        </TouchableOpacity>
                      </View>
                    ) : item.request_status === "pending" &&
                      item.receiver_id == item.id ? (
                      <TouchableOpacity
                        style={styles.searchremoveButton}
                        onPress={() =>
                          removeRequst(item.sender_id, item.receiver_id)
                        }
                      >
                        <Text style={styles.searchButtonText}>
                          Remove Request
                        </Text>
                      </TouchableOpacity>
                    ) : item.request_status === "accept" &&
                      (item.sender_id === item.id ||
                        item.receiver_id === item.id) ? (
                      <TouchableOpacity
                        style={styles.searchremoveButton}
                        onPress={() =>
                          removeRequst(item.sender_id, item.receiver_id)
                        }
                      >
                        <Text style={styles.searchButtonText}>
                          Delete Friend
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.searchremoveButton}
                        onPress={() => sendRequst(item.id)}
                      >
                        <Text style={styles.searchButtonText}>
                          Send Request
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SearchScreen;
