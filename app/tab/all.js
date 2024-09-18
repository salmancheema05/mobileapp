import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { styles } from "../style/HomeStyle";
import defaultImage from "../../assets/images/3.png";
import { Context } from "../../Contextapi/Provider";
import useUserStatus from "../../customHook/useUserStatus";
import { useNavigation } from "expo-router";
function All() {
  const navigation = useNavigation();
  const { allFriends, loginbuttonClicked, setLoginButtonClicked } =
    useContext(Context);
  const { userActive } = useUserStatus();
  useEffect(() => {
    const allFriendsDisplay = async () => {
      if (loginbuttonClicked == true) {
        await userActive();
        setLoginButtonClicked(false);
      }
    };
    allFriendsDisplay();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.chatListBox}>
        <FlatList
          data={allFriends}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userBox}
              onPress={() =>
                navigation.navigate("chatingscreen", {
                  friendId: item.id,
                  firstname: item.firstname,
                  lastname: item.lastname,
                  userImage: item.image_name,
                })
              }
            >
              {item.image_name ? (
                <Image
                  style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                  source={{ uri: `data:image/jpg;base64,${item.image_name}` }}
                />
              ) : (
                <Image
                  style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                  source={defaultImage}
                />
              )}
              <Text style={styles.UserName}>
                {item.firstname + " " + item.lastname}
              </Text>
              {item.activestatus == "online" ? (
                <Text style={styles.loginStatus}></Text>
              ) : null}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default All;
