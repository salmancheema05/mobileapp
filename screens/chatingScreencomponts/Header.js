import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image } from "react-native";
import { Context } from "../../Contextapi/Provider";
import { styles } from "../style/chatingScreenStyle";
function Header({ firstname, lastname, userImage, headerBoxFlex, friendId }) {
  const { allFriends } = useContext(Context);
  const [activeStatusUpdate, setActiveStatusUpdate] = useState("offline");
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
  return (
    <View style={{ flex: headerBoxFlex, ...styles.chatHeaderBox }}>
      <View style={styles.chatHeaderImageBox}>
        {userImage != null ? (
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
            }}
            source={{ uri: `data:image/jpg;base64,${userImage}` }}
          />
        ) : (
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
            }}
            source={require("../../assets/images/3.png")}
          />
        )}
      </View>
      <View style={styles.chatUserContentBox}>
        <Text style={styles.chatingUserName}>{firstname + " " + lastname}</Text>
        {activeStatusUpdate == "online" ? (
          <Text style={styles.chatingUserStatus}>Online</Text>
        ) : (
          <Text style={styles.chatingUserStatus}>offline</Text>
        )}
      </View>
    </View>
  );
}

export default Header;
