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
    flexDirection: "row",
  },
  senderMessageContainer: {
    width: "50%",
    padding: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  senderMessageBox: {
    backgroundColor: "#1D50CF",
    marginBottom: 10,
    padding: 5,
    width: "auto",
    justifyConten: "flex-end",
  },
  senderText: {
    color: "white",
  },
  receiverMessageContainer: {
    flex: 1,
    width: "50%",
    padding: 5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  receiverMessageBox: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 5,
  },
  receiverText: {
    color: "black",
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
