import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  homeHeader: {
    flex: 0.1,
    backgroundColor: "#1D50CF",
  },
  contactBox: {
    flex: 2,
    justifyContent: "flex-end",
  },
  contactText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
  },
  chatListBox: {
    flex: 1,
  },
  userBox: {
    margin: 10,
  },
  UserName: {
    position: "absolute",
    left: 90,
    top: 15,
    fontWeight: "bold",
  },
  loginStatus: {
    position: "absolute",
    backgroundColor: "green",
    width: 15,
    height: 15,
    borderRadius: 100,
    left: 60,
    top: 60,
  },
  acceptButton: {
    position: "absolute",
    left: 122,
    top: 50,
    backgroundColor: "#1D50CF",
    width: "30%",
  },
  acceptText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    padding: 3,
  },
  cancelButton: {
    position: "absolute",
    left: 250,
    top: 50,
    backgroundColor: "#1D50CF",
    width: "30%",
  },
  removeButton: {
    position: "absolute",
    left: 100,
    top: 50,
    backgroundColor: "#1D50CF",
    width: "70%",
  },
  dropdownmenu: {
    position: "absolute",
    right: 10,
    top: 40,
    backgroundColor: "white",
    width: 150,
    height: "auto",
    zIndex: 1, // works on ios
    elevation: 1,
  },
  itemText: {
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
  },
});
