import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  chatHeaderBox: {
    flex: 0.16,
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
    height: "100%",
  },
  InputControllBox: {
    flex: 0.07,
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
  senderMessageBox: {
    alignSelf: "flex-end",
    backgroundColor: "#1D50CF",
    maxWidth: "55%",
    padding: 10,
    color: "white",
    marginRight: 10,
    marginBottom: 20,
  },
  senderText: {
    color: "white",
  },
  receiverMessageBox: {
    alignSelf: "flex-start",
    backgroundColor: "#C1C0C3",
    maxWidth: "55%",
    padding: 10,
    color: "black",
    marginLeft: 10,
    marginBottom: 20,
  },
  receiverText: {
    color: "black",
  },
});
