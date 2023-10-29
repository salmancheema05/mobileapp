import React, { useContext } from "react";
import { Text, View, Image } from "react-native";
import { styles } from "../style/chatingScreenStyle";
import { Context } from "../../Contextapi/Provider";
import AudioPlay from "./AudioPlay";
function ReceiverMessageBox() {
  const { receiveMessage } = useContext(Context);

  return (
    <View style={styles.receiverMessageContainer}>
      {receiveMessage.map((item) => (
        <React.Fragment key={item.messageId}>
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
            <View style={styles.receiverMessageBox}>
              <Text style={styles.receiverText}>{item.text}</Text>
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

export default ReceiverMessageBox;
