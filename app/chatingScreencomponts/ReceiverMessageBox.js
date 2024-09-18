import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "../style/chatingScreenStyle";
import AudioPlay from "./AudioPlay";
function ReceiverMessageBox({ item }) {
  return (
    <View style={styles.receiverMessageContainer}>
      {item.type == "audiovoice" ? (
        <AudioPlay
          item={item}
          by="receiver"
          bgColor="white"
          playStopButton="#1D50CF"
          minimumTrackTintColor="#1D50CF"
          maximumTrackTintColor="#1D50CF"
          thumbTintColor="#1D50CF"
        />
      ) : item.type == "image" ? (
        <>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: `data:image/jpeg;base64,${item.fileuri}` }}
          />
        </>
      ) : (
        <View>
          <Text style={styles.receiverText}>{item.chat}</Text>
        </View>
      )}
    </View>
  );
}

export default ReceiverMessageBox;
