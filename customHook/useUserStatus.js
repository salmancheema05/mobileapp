import { useContext } from "react";
import { Context } from "../Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllFriendsApi } from "../api/fetchFriendsApi";
import io from "socket.io-client";
import { portio } from "../api/baseurl";

let allFriendsGlobal = null;
const useUserStatus = () => {
  const { setAllFriends } = useContext(Context);
  const userActive = async () => {
    try {
      const socket = io(portio);
      const getData = await AsyncStorage.getItem("data");
      if (getData != null) {
        const parsed = JSON.parse(getData);
        const id = parsed.id;
        const result = await AllFriendsApi(id);
        setAllFriends(result.data);
        allFriendsGlobal = result.data;
        socket.emit("yourFriendonline", {
          friendid: id,
          activestatus: "online",
        });
      }
    } catch (error) {
      console.error("user Active", error);
    }
  };
  const activestatusUpdate = (data) => {
    const indexToUpdate = allFriendsGlobal.findIndex(
      (item) => item.id === data.friendid
    );
    if (indexToUpdate !== -1) {
      allFriendsGlobal[indexToUpdate].activestatus = data.activestatus;
    }
    setAllFriends(null);
    setAllFriends(allFriendsGlobal);
  };

  return { userActive, activestatusUpdate };
};
export default useUserStatus;
