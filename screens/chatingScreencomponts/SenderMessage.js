import React, { useContext } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { styles } from "../style/chatingScreenStyle";
import AudioPlay from "./AudioPlay";
import { Context } from "../../Contextapi/Provider";
function SenderMessage() {
  const { Message } = useContext(Context);

  return (
    <View style={styles.senderMessageContainer}>
      {/* <View > */}
      {Message.map((item) => (
        <React.Fragment key={item.messageId}>
          {item.type === "audiovoice" ? (
            <AudioPlay
              item={item}
              by="sender"
              bgColor="#1D50CF"
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
