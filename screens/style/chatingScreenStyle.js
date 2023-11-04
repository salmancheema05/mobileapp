import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  chatHeaderBox: {
    backgroundColor: "#1D50CF",
    flexDirection: "row",
  },
  chatHeaderImageBox: {
    width: "25%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: "5%",
  },
  chatUserContentBox: {
    width: "75%",
  },
  chatingUserName: {
    position: "absolute",
    left: "4%",
    top: "35%",
    color: "white",
    fontWeight: "bold",
  },
  chatingUserStatus: {
    position: "absolute",
    left: "4%",
    top: "55%",
    color: "white",
    fontWeight: "bold",
  },
  chatBox: {
    flex: 1,
  },
  senderMessageContainer: {
    backgroundColor: "#1D50CF",
    margin: "1%",
    maxWidth: "50%",
    padding: 10,
    alignSelf: "flex-end",
  },
  receiverMessageContainer: {
    backgroundColor: "white",
    margin: "1%",
    maxWidth: "50%",
    padding: 10,
    alignSelf: "flex-start",
  },

  InputControllBox: {
    padding: 3,
    width: "100%",
    flexDirection: "row",
  },
  textInputWithGallaryBox: {
    width: "85%",
    height: "100%",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 50,
  },
  gallaryIcon: {
    position: "absolute",
    right: 10,
    top: "25%",
  },
  chatingButtonBox: {
    flex: 1,
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  chatingMicrophone: {
    backgroundColor: "#1D50CF",
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,

    // borderRadius: 150,
  },
  textInputBox: {
    width: "90%",
  },
  senderText: {
    color: "white",
  },
  senderImageBox: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWithtextInputBox: {
    width: "70%",
    borderRadius: 50,
    backgroundColor: "pink",
  },
});
