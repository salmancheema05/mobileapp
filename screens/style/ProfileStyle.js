import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  ImageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuBox: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingTop: 110,
  },
  menuItem: {
    textAlign: "center",
    fontSize: 20,
    color: "#1D50CF",
    fontWeight: "bold",
    marginBottom: 30,
  },
  modalBox: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  modal: {
    flex: 0.25,
    backgroundColor: "white",
    width: "100%",
  },
  titleBox: {
    padding: 20,
    borderBottomWidth: 1,
  },
  buttonBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonStyle: {
    backgroundColor: "#1D50CF",
    width: "27%",
    height: "25%",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    padding: 5,
  },
});
