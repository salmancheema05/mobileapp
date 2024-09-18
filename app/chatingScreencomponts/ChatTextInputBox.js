import React, { useState, useContext } from "react";
import { View, Image, TouchableOpacity, TextInput } from "react-native";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { styles } from "../style/chatingScreenStyle";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as ImageManipulator from "expo-image-manipulator";
import io from "socket.io-client";
import { portio } from "../../api/baseurl";
import { Context } from "../../Contextapi/Provider";
function ChatTextInputBox({ friendId, userid, inputControllBoxFlex }) {
  const { setMessages, Messages } = useContext(Context);
  const [textMessage, setTextMessage] = useState("");
  const [fileMessage, setfileMessage] = useState(null);
  const [recordingInstance, setRecordingInstance] = useState(null);
  const [microphoneShow, setMicrophoneShow] = useState(true);
  const takePicture = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    const resizedImage = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 800, height: 800 } }],
      { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
    );
    const imageObject = { ...result };
    imageObject.uri = resizedImage.uri;
    console.log("resizedImage", imageObject);
    setfileMessage(imageObject);
    setMicrophoneShow(false);
  };
  const send = async () => {
    try {
      const socket = io(portio);
      const message_Id = Date.now();
      let newMessage = null;
      if (fileMessage == null) {
        newMessage = {
          id: message_Id,
          chat: textMessage,
          created_at: new Date(),
          senderid: userid,
          receiverid: friendId,
        };
      } else {
        newMessage = {
          type: "image",
          id: message_Id,
          chat: textMessage,
          created_at: new Date(),
          senderid: userid,
          receiverid: friendId,
          mimeType: fileMessage.mimeType,
          name: fileMessage.name,
          fileuri: fileMessage.uri,
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
      setMessages([...Messages, newMessage]);

      setTextMessage("");
      setMicrophoneShow(true);
    } catch (error) {
      console.error(error);
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
          id: message_Id,
          created_at: new Date(),
          senderid: userid,
          receiverid: friendId,
          chat: audioFile,
          type: "audiovoice",
          audiostatus: false,
        };
        setMessages([...Messages, newVoiceMessage]);
        socket.emit("newMessageFromMe", newVoiceMessage);
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
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
  );
}
export default ChatTextInputBox;
