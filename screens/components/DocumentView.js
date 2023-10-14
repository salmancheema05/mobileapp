import React from "react";
import {
  View,
  Text,
  Image,
  Video,
  Linking,
  TouchableOpacity,
} from "react-native";

const DocumentView = ({ currentMessage }) => {
  if (currentMessage.document) {
    const { uri, type, name } = currentMessage.document;

    switch (type) {
      case "file":
        // Render a link to the document
        return (
          <TouchableOpacity onPress={() => Linking.openURL(uri)}>
            <Text>{name}</Text>
          </TouchableOpacity>
        );
      case "image":
        // Render an image preview
        return <Image source={{ uri }} style={{ width: 200, height: 200 }} />;
      case "video":
        // Render a video preview
        return <Video source={{ uri }} style={{ width: 200, height: 200 }} />;
      default:
        return null;
    }
  }

  // Render regular text messages
  return <Text>{currentMessage.text}</Text>;
};
export default DocumentView;
