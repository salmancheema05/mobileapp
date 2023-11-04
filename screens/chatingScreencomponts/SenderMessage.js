import React, { useContext } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { styles } from "../style/chatingScreenStyle";
import AudioPlay from "./AudioPlay";

function SenderMessage({ item }) {
  return (
    <View style={styles.senderMessageContainer}>
      {item.type === "audiovoice" ? (
        <AudioPlay
          item={item}
          by="sender"
          playStopButton="white"
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          thumbTintColor="white"
        />
      ) : item.type == "image" ? (
        <>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.fileuri }}
          />
        </>
      ) : (
        <View>
          <Text style={styles.senderText}>{item.chat}</Text>
        </View>
      )}
    </View>
  );
}

export default SenderMessage;
