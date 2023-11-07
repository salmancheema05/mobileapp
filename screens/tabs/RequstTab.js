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
import image1 from "../../assets/images/1.jpg";
import image2 from "../../assets/images/2.jpg";
import defaultImage from "../../assets/images/3.png";
import { receiveRequests } from "../../api/requestApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
import { Context } from "../../Contextapi/Provider";
let requestArray = null;
function RequestTab() {
  const { allRequest, setAllRequest, setRequestsCount } = useContext(Context);
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
  useEffect(() => {
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
                    <TouchableOpacity style={styles.requestButton}>
                      <Text style={styles.requestButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.requestButton}>
                      <Text style={styles.requestButtonText}>cancel</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.searchremoveButton}>
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
