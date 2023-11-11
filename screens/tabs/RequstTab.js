import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { styles } from "../style/searchScreenStyle";
import defaultImage from "../../assets/images/3.png";
import { receiveRequests } from "../../api/requestApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
import { Context } from "../../Contextapi/Provider";
import io from "socket.io-client";
import { portio } from "../../api/baseurl";
import useAcceptButton from "../../customHook/useAcceptButton";
let requestArray = null;
function RequestTab() {
  const socket = io(portio);
  const { allRequest, setAllRequest, requestsCount, setRequestsCount } =
    useContext(Context);
  const { accept, cancelRequst } = useAcceptButton(allRequest, setAllRequest);
  const totalNewRequests = () => {
    let count = 0;
    const allRequestLength = requestArray.length;
    for (let i = 0; i < allRequestLength; i++) {
      if (requestArray[i].request_status == "pending") {
        count++;
      }
    }
    setRequestsCount(count);
  };
  const requestData = async () => {
    try {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      const result = await receiveRequests(parsed.id);
      requestArray = result.data;
      setAllRequest(result.data);
      totalNewRequests();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const cancelbutton = (sender_id, receiver_id) => {
    cancelRequst(sender_id, receiver_id, "requesttab");
    const allRequestLength = requestArray.length;
    let array = [];
    for (let i = 0; i < allRequestLength; i++) {
      if (
        requestArray[i].sender_id == sender_id &&
        requestArray[i].receiver_id == receiver_id
      ) {
        delete requestArray[i];
      } else {
        array.push(requestArray[i]);
      }
    }
    setAllRequest(array);
    setRequestsCount(requestsCount - 1);
  };
  useEffect(() => {
    requestData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchListBox}>
        <FlatList
          data={allRequest}
          renderItem={({ item }) => (
            <View style={styles.searchUserBox}>
              <View style={styles.searchImageBox}>
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
              </View>
              <View style={styles.searchUserDetailBox}>
                <View style={styles.searchUserNameBox}>
                  <Text style={styles.searchUserName}>
                    {item.firstname + " " + item.lastname}{" "}
                  </Text>
                </View>
                {item.request_status == "pending" ? (
                  <View style={styles.requestButtonBox}>
                    <TouchableOpacity
                      style={styles.requestButton}
                      onPress={() => accept(item.sender_id, item.receiver_id)}
                    >
                      <Text style={styles.requestButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.requestButton}
                      onPress={() =>
                        cancelbutton(item.sender_id, item.receiver_id)
                      }
                    >
                      <Text style={styles.requestButtonText}>cancel</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.searchremoveButton}
                    onPress={() =>
                      cancelbutton(item.sender_id, item.receiver_id)
                    }
                  >
                    <Text style={styles.searchButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default RequestTab;
