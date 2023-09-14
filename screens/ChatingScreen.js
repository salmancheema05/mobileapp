import React, { useState, useContext, useEffect } from "react";
import { Text, View, Keyboard, Image, TouchableOpacity } from "react-native";
import { styles } from "./style/chatingScreenStyle";
import defaultImage from "../assets/images/3.png";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { Context } from "../Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { portio } from "../api/baseurl";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
let userIdGrobal = null;
function ChatingScreen({ route }) {
  const [flex, setFlex] = useState(0.15);
  const [userid, setUserid] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const { friendId, firstname, lastname, userImage } = route.params;
  const { setOpenMenu, allFriends, setAllFriends } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [activeStatusUpdate, setActiveStatusUpdate] = useState("offline");
  useEffect(() => {
    if (allFriends != null) {
      for (let i = 0; i < allFriends.length; i++) {
        if (
          friendId == allFriends[i].id &&
          allFriends[i].activestatus == "online"
        ) {
          // console.log("ok code", allFriends[i]);
          setActiveStatusUpdate("online");
        } else {
          setActiveStatusUpdate("offline");
        }
      }
    } else {
      setActiveStatusUpdate("offline");
    }
  }, [allFriends]);
  useEffect(() => {
    setOpenMenu(false);
    const userInformation = async () => {
      try {
        const getData = await AsyncStorage.getItem("data");
        const parsed = JSON.parse(getData);
        const id = parsed.id;
        const firstname = parsed.firstname;
        const lastname = parsed.lastname;
        setUserid(id);
        userIdGrobal = id;
        setUserFirstName(firstname);
        setUserLastName(lastname);
      } catch (error) {
        console.error(error);
      }
    };
    userInformation();
    const socket = io(portio);
    socket.on("sendMessage", (newMessage) => {
      if (
        friendId == newMessage.user._id &&
        userIdGrobal == newMessage.receiverId
      ) {
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, newMessage)
        );
      }
    });
  }, []);

  const takePicture = async () => {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images], // You can specify the file types you want to allow here
    });
    const documentMessage = {
      _id: Math.random().toString(36).substring(7),
      text: result.name,
      createdAt: new Date(),
      user: {
        _id: userid,
      },
      document: {
        name: result.name,
        size: result.size,
        uri: result.uri,
      },
    };
    onSend([documentMessage]);
  };
  const onSend = (messagesarry) => {
    const socket = io(portio);
    const receiverId = friendId;
    const newMessage = { ...messagesarry[0], receiverId };
    socket.emit("newMessageFromMe", newMessage);
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: flex, backgroundColor: "#1D50CF" }}>
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 60 / 2,
            position: "absolute",
            top: 40,
            left: 40,
          }}
          source={{ uri: `data:image/jpg;base64,${userImage}` }}
        />
        <Text style={styles.chatingUserName}>{firstname + " " + lastname}</Text>
        {activeStatusUpdate == "online" ? (
          <Text style={styles.chatingUserStatus}>Online</Text>
        ) : (
          <Text style={styles.chatingUserStatus}>offline</Text>
        )}
      </View>
      <View style={styles.chatingBox}>
        <GiftedChat
          onSend={(messages) => onSend(messages)}
          messages={messages}
          user={{
            _id: userid,
            name: userFirstName + " " + userLastName,
          }}
          renderSend={(props) => {
            return (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => takePicture()}>
                  <FontAwesome
                    name="picture-o"
                    size={20}
                    color="#007BFF"
                    style={{ margin: 15 }}
                  />
                </TouchableOpacity>
                <Send {...props}>
                  <FontAwesome
                    name="send"
                    size={20}
                    color="#007BFF"
                    style={{ margin: 10 }}
                  />
                </Send>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default ChatingScreen;
