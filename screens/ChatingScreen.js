import React, { useState, useContext, useEffect } from "react";
import { View, SafeAreaView, Keyboard, FlatList } from "react-native";
import { styles } from "./style/chatingScreenStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getChats } from "../api/fetchFriendsApi";
import { Audio } from "expo-av";
import Header from "./chatingScreencomponts/Header";
import ChatTextInputBox from "./chatingScreencomponts/ChatTextInputBox";
import SenderMessage from "./chatingScreencomponts/SenderMessage";
import ReceiverMessageBox from "./chatingScreencomponts/ReceiverMessageBox";
import io from "socket.io-client";
import { portio } from "../api/baseurl";
import { Context } from "../Contextapi/Provider";

let userIdGrobal = null;
function ChatingScreen({ route }) {
  const { setOpenMenu, setMessages, Messages } = useContext(Context);
  const [inputControllBoxFlex, setInputControllBoxFlex] = useState(0.07);
  const [headerBoxFlex, setHeaderBoxFlex] = useState(0.16);
  const [userid, setUserid] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const { friendId, firstname, lastname, userImage } = route.params;
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
    const getAllChats = async () => {
      try {
        const getData = await AsyncStorage.getItem("data");
        const parsed = JSON.parse(getData);
        const id = parsed.id;
        const ids = { senderid: id, receiverid: friendId };
        const result = await getChats(ids);
        setMessages(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    userInformation();
    getAllChats();
    const socket = io(portio);
    socket.on("sendMessage", async (newMessage) => {
      if (
        friendId == newMessage.senderid &&
        userIdGrobal == newMessage.receiverid
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
    Audio.requestPermissionsAsync();
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setInputControllBoxFlex(0.1);
        setHeaderBoxFlex(0.25);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setInputControllBoxFlex(0.07);
        setHeaderBoxFlex(0.16);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        firstname={firstname}
        lastname={lastname}
        userImage={userImage}
        headerBoxFlex={headerBoxFlex}
        friendId={friendId}
      />
      <View style={styles.chatBox}>
        <FlatList
          data={Messages}
          renderItem={({ item }) => (
            <>
              {item.senderid == userid ? (
                <SenderMessage item={item} />
              ) : (
                <ReceiverMessageBox item={item} />
              )}
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <ChatTextInputBox
        friendId={friendId}
        userid={userid}
        inputControllBoxFlex={inputControllBoxFlex}
      />
    </SafeAreaView>
  );
}

export default ChatingScreen;
