import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Context } from "../Contextapi/Provider";
import { styles } from "./style/ProfileStyle";
import defaultImage from "../assets/images/3.png";
import image1 from "../assets/images/1.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { profileImageApi, GetprofileImageApi } from "../api/userapi";
function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [saveImage, setSaveImage] = useState(null);
  const [model, setModel] = useState(false);
  const { setOpenMenu } = useContext(Context);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
      setModel(true);
    }
  };
  const replace = () => {
    setModel(false);
    pickImage();
  };
  const cencel = () => {
    setSelectedImage(null);
    setModel(false);
  };
  const save = async () => {
    try {
      setModel(false);
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      const formData = new FormData();
      formData.append("file", {
        uri: selectedImage,
        name: "image.jpg",
        type: "file/*", // Accepts any image MIME type
      });
      formData.append("id", parsed.id);
      const result = await profileImageApi(formData);
    } catch (error) {
      console.log(error);
    }
  };
  const displayProfileImage = async () => {
    try {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      const result = await GetprofileImageApi(parsed.id);
      if (result.status == 200) {
        setSaveImage(result.data.message);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userFullName = async () => {
    try {
      const getData = await AsyncStorage.getItem("data");
      const parsed = JSON.parse(getData);
      setUserFirstName(parsed.firstname);
      setUserLastName(parsed.lastname);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    userFullName();
    displayProfileImage();
    setOpenMenu(false);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={model} transparent>
        <View style={styles.modalBox}>
          <View style={styles.modal}>
            <View style={styles.titleBox}>
              <Text style={{ fontSize: 20 }}>Do you want to save image?</Text>
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => cencel()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => replace()}
              >
                <Text style={styles.buttonText}>Replace</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => save()}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1, backgroundColor: "#1D50CF" }}>
        <View style={styles.ImageBox}>
          {selectedImage !== null ? (
            <Image
              style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
              source={{ uri: selectedImage }}
            />
          ) : saveImage !== null ? (
            <Image
              style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
              source={{ uri: `data:image/jpg;base64,${saveImage}` }}
            />
          ) : (
            <Image
              style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
              source={defaultImage}
            />
          )}
        </View>
        <View style={styles.menuBox}>
          <TouchableOpacity>
            <Text style={styles.menuItem}>
              {userFirstName + " " + userLastName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()}>
            <Text style={styles.menuItem}>Take picture</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Create Group</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Profile;
