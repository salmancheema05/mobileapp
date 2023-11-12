import { useContext } from "react";
import { Context } from "../Contextapi/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { acceptRequests, removeRequestApi } from "../api/requestApi";
import { Alert } from "react-native";
import { portio } from "../api/baseurl";
const useAcceptButton = (state, setState) => {
  const { setAllFriends, allRequest, setAllRequest, setRequestsCount } =
    useContext(Context);
  const socket = io(portio);
  const accept = async (senderid, receiverId, data) => {
    try {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      const receiverid = parsed.id;
      const object = { sender_id: senderid, receiver_id: receiverId };
      const friendId = senderid;
      updateRequestStatuts(friendId, receiverid, "accept", friendId);
      socket.emit("accept", object);
      setAllFriends((prevMessages) => [...prevMessages, data]);
      setRequestsCount((prev) => prev - 1);
    } catch (error) {
      console.error(error);
    }
  };
  const cancelRequst = async (senderId, receiverId, screentype) => {
    try {
      const object = { sender_id: senderId, receiver_id: receiverId };
      const result = await removeRequestApi(object);
      if (screentype == "search") {
        updateRequestStatuts(senderId, null, null, null);
        const array = allRequest.filter(
          (item) =>
            item.sender_id !== senderId && item.receiver_id !== receiverId
        );
        setAllRequest(array);
        setRequestsCount((prev) => prev - 1);
      }

      if (result.status == 200) {
        Alert.alert(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateRequestStatuts = (id, receiver_id, status, senderid) => {
    const index = state.findIndex((obj) => obj.id === id);
    if (index !== -1) {
      let updateArray = [...state];
      updateArray[index].request_status = status;
      updateArray[index].sender_id = senderid;
      updateArray[index].receiver_id = receiver_id;
      setState(updateArray);
    }
  };
  return { accept, cancelRequst, updateRequestStatuts };
};
export default useAcceptButton;
