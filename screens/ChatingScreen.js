import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./style/chatingScreenStyle";
import defaultImage from "../assets/images/3.png";
import { Context } from "../Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { portio } from "../api/baseurl";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { chatNewMessage } from "../api/fetchFriendsApi";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { decode } from "base-64";
let userIdGrobal = null;
let audioURI = null;
function ChatingScreen({ route }) {
  const [inputControllBoxFlex, setInputControllBoxFlex] = useState(0.07);
  const [headerBoxFlex, setHeaderBoxFlex] = useState(0.16);
  const [userid, setUserid] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const { friendId, firstname, lastname, userImage } = route.params;
  const { setOpenMenu, allFriends, setAllFriends } = useContext(Context);
  const [activeStatusUpdate, setActiveStatusUpdate] = useState("offline");
  const [Message, setMessage] = useState([]);
  const [receiveMessage, setReceiveMessage] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [fileMessage, setfileMessage] = useState(null);
  const [recordingInstance, setRecordingInstance] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [microphoneShow, setMicrophoneShow] = useState(true);
  useEffect(() => {
    if (allFriends != null) {
      for (let i = 0; i < allFriends.length; i++) {
        if (
          friendId == allFriends[i].id &&
          allFriends[i].activestatus == "online"
        ) {
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
    socket.on("sendMessage", async (newMessage) => {
      //console.log(newMessage);
      if (
        friendId == newMessage.senderId &&
        userIdGrobal == newMessage.receiverId
      ) {
        if (newMessage.type === "image") {
          const decodeData = decode(newMessage.fileuri);
          newMessage.fileuri = decodeData;
          console.log(newMessage);
          // setReceiveMessage((prevMessages) => [...prevMessages, newMessage]);
        } else {
          setReceiveMessage((prevMessages) => [...prevMessages, newMessage]);
        }
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

  const takePicture = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    const maxWidth = 800;
    const maxHeight = 800;
    const quality = 80;

    setfileMessage(result);
    setMicrophoneShow(false);
  };
  const send = async () => {
    try {
      const socket = io(portio);
      const message_Id = Date.now();
      let newMessage = null;
      if (fileMessage == null) {
        newMessage = {
          messageId: message_Id,
          text: textMessage,
          currentDateTime: new Date(),
          senderId: userid,
          receiverId: friendId,
        };
      } else {
        newMessage = {
          messageId: message_Id,
          text: textMessage,
          currentDateTime: new Date(),
          senderId: userid,
          receiverId: friendId,
          mimeType: fileMessage.mimeType,
          name: fileMessage.name,
          fileuri: fileMessage.uri,
          type: "image",
        };
      }
      if (newMessage.fileuri) {
        const imageBlob = await fetch(newMessage.fileuri).then((response) =>
          response.blob()
        );
        const imageObject = { ...newMessage };
        imageObject.fileuri = imageBlob;

        socket.emit("newMessageFromMe", imageObject);
        setfileMessage(null);
      } else {
        socket.emit("newMessageFromMe", newMessage);
      }
      setMessage([...Message, newMessage]);

      setTextMessage("");
      setMicrophoneShow(true);
    } catch (error) {
      console.error(error);
    }
  };
  const voiceRecord = async () => {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecordingInstance(recording);
    } catch (error) {
      console.error("Error starting recording", error);
    }
  };
  const voiceRecordSend = async () => {
    try {
      const socket = io(portio);
      const randomNumber = Math.floor(Math.random() * 1000);
      const message_Id = `${randomNumber}`;
      if (recordingInstance) {
        await recordingInstance.stopAndUnloadAsync();
        const uri = recordingInstance.getURI();

        const audioFile = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        audioURI = uri;
        let newVoiceMessage = {
          messageId: message_Id,
          currentDateTime: new Date(),
          senderId: userid,
          receiverId: friendId,
          fileuri: audioURI,
          type: "audiovoice",
          audiostatus: false,
        };
        setMessage([...Message, newVoiceMessage]);
        let audioObject = { ...newVoiceMessage };
        audioObject.fileuri = audioFile;
        socket.emit("newMessageFromMe", audioObject);
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };
  const playAudio = async (audioURI) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioURI },
        { shouldPlay: true }
      );
      setAudioPlayer(sound);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };
  const audioPlayButon = (audiourl, id) => {
    console.log("receiveaudioid", id);
    const index = Message.findIndex((obj) => obj.messageId === id);
    if (index !== -1) {
      const newArray = [...Message];
      newArray[index] = { ...newArray[index], audiostatus: true };
      setMessage(newArray);
    }
    playAudio(audiourl);
  };
  const stopAudio = async () => {
    if (audioPlayer != null) {
      await audioPlayer.stopAsync();
      setAudioPlayer(null);
    }
  };
  const pause = (id) => {
    const index = Message.findIndex((obj) => obj.messageId === id);
    if (index !== -1) {
      const newArray = [...Message];
      newArray[index] = { ...newArray[index], audiostatus: false };
      setMessage(newArray);
    }
    stopAudio();
  };
  const handlerText = (text) => {
    if (text.length > 0) {
      setTextMessage(text);
      setMicrophoneShow(false);
    } else if (text.length == 0) {
      setTextMessage("");
      setMicrophoneShow(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: headerBoxFlex, ...styles.chatHeaderBox }}>
        <View style={styles.chatHeaderImageBox}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
            }}
            source={{ uri: `data:image/jpg;base64,${userImage}` }}
          />
        </View>
        <View style={styles.chatUserContentBox}>
          <Text style={styles.chatingUserName}>
            {firstname + " " + lastname}
          </Text>
          {activeStatusUpdate == "online" ? (
            <Text style={styles.chatingUserStatus}>Online</Text>
          ) : (
            <Text style={styles.chatingUserStatus}>offline</Text>
          )}
        </View>
      </View>

      <View style={styles.chatBox}>
        <View style={styles.receiverMessageContainer}>
          {receiveMessage.map((item) => (
            <React.Fragment key={item.messageId}>
              {item.type == "audiovoice" ? (
                <View style={styles.receiverMessageBox}>
                  {item.audiostatus == false ? (
                    <TouchableOpacity
                      onPress={() =>
                        audioPlayButon(item.fileuri, item.messageId)
                      }
                    >
                      <AntDesign name="stepforward" size={20} color="white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => pause(item.messageId)}>
                      <AntDesign name="pause" size={24} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              ) : item.type == "image" ? (
                <>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: "" }}
                  />
                </>
              ) : (
                <View style={styles.receiverMessageBox}>
                  <Text style={styles.senderText}>{item.text}</Text>
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.senderMessageContainer}>
          {Message.map((item) => (
            <React.Fragment key={item.messageId}>
              {item.type === "audiovoice" ? (
                <View style={styles.senderMessageBox}>
                  {item.audiostatus == false ? (
                    <TouchableOpacity
                      onPress={() =>
                        audioPlayButon(item.fileuri, item.messageId)
                      }
                    >
                      <AntDesign name="stepforward" size={20} color="white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => pause(item.messageId)}>
                      <AntDesign name="pause" size={24} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              ) : item.type == "image" ? (
                <>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: item.fileuri }}
                  />
                </>
              ) : (
                <View style={styles.senderMessageBox}>
                  <Text style={styles.senderText}>{item.text}</Text>
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      <View style={{ flex: inputControllBoxFlex, ...styles.InputControllBox }}>
        {fileMessage == null ? (
          <View style={styles.textInputWithGallaryBox}>
            <View style={styles.textInputBox}>
              <TextInput
                onChangeText={(text) => handlerText(text)}
                value={textMessage}
                style={{
                  padding: 5,
                }}
                placeholder="Text..."
              />
            </View>
            <View style={styles.gallaryIcon}>
              <TouchableOpacity onPress={takePicture}>
                <MaterialCommunityIcons
                  name="view-gallery-outline"
                  size={20}
                  color="#1D50CF"
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.senderImageBox}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                source={{ uri: fileMessage.uri }}
              />
            </View>
            <View style={styles.imageWithtextInputBox}>
              <TextInput
                onChangeText={(text) => handlerText(text)}
                value={textMessage}
                style={{
                  padding: 5,
                }}
                placeholder="Text..."
              />
            </View>
          </>
        )}

        <View style={styles.chatingButtonBox}>
          {microphoneShow == true ? (
            <TouchableOpacity
              style={styles.chatingMicrophone}
              onPressIn={voiceRecord}
              onPressOut={voiceRecordSend}
            >
              <FontAwesome name="microphone" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.chatingMicrophone} onPress={send}>
              <FontAwesome name="send" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ChatingScreen;
