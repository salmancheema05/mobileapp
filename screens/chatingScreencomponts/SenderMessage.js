import React, { useState, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "../style/chatingScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Context } from "../../Contextapi/Provider";

function SenderMessage() {
  const { Message, setMessage } = useContext(Context);
  const [audioPlayer, setAudioPlayer] = useState(null);
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
  const audioPlayButon = async (audiourl, id, by) => {
    if (by == "sender") {
      const index = Message.findIndex((obj) => obj.messageId === id);
      if (index !== -1) {
        let newArraybySender = [...Message];
        newArraybySender[index].audiostatus = true;
        setMessage(newArraybySender);
      }
    } else {
      const index = receiveMessage.findIndex((obj) => obj.messageId === id);
      if (index !== -1) {
        let newArraybyreceiver = [...receiveMessage];
        newArraybyreceiver[index].audiostatus = true;
        setReceiveMessage(newArraybyreceiver);
      }
    }
    const base64Audio = `data:audio/3gp;base64,${audiourl}`;
    playAudio(base64Audio);
  };
  const stopAudio = async () => {
    if (audioPlayer != null) {
      await audioPlayer.stopAsync();
      setAudioPlayer(null);
    }
  };
  const pause = (id, by) => {
    if (by == "sender") {
      const index = Message.findIndex((obj) => obj.messageId === id);
      if (index !== -1) {
        let newArraybysender = [...Message];
        newArraybysender[index].audiostatus = false;
        setMessage(newArraybysender);
      }
    } else {
      const index = receiveMessage.findIndex((obj) => obj.messageId === id);
      if (index !== -1) {
        let newArraybyreceiver = [...receiveMessage];
        newArraybyreceiver[index].audiostatus = false;
        setReceiveMessage(newArraybyreceiver);
      }
    }
    stopAudio();
  };
  return (
    <View style={styles.senderMessageContainer}>
      {Message.map((item) => (
        <React.Fragment key={item.messageId}>
          {item.type === "audiovoice" ? (
            <View style={styles.senderMessageBox}>
              {item.audiostatus == false ? (
                <TouchableOpacity
                  onPress={() =>
                    audioPlayButon(item.fileuri, item.messageId, "sender")
                  }
                >
                  <AntDesign name="stepforward" size={20} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => pause(item.messageId, "sender")}
                >
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
  );
}

export default SenderMessage;
