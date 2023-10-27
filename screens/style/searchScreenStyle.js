import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  searchListBox: {
    flex: 1,
  },
  searchUserBox: {
    flex: 1,
    flexDirection: "row",
    margin: 6,
  },
  searchImageBox: {
    width: "25%",
  },
  searchUserDetailBox: {
    flex: 1,
    flexDirection: "column",
  },
  searchUserNameBox: {
    width: "100%",
    height: "50%",
  },
  searchUserName: {
    margin: 5,
  },
  searchremoveButton: {
    backgroundColor: "#1D50CF",
    width: "100%",
    padding: 5,
  },
  searchButtonText: {
    textAlign: "center",
    color: "white",
  },
  groupButtonBox: {
    flex: 1,
    flexDirection: "row",
  },
  searchGroupButton: {
    backgroundColor: "#1D50CF",
    width: "48%",
    padding: 5,
    marginHorizontal: 3,
  },
  searchBox: {
    flex: 0.13,
    backgroundColor: "#1D50CF",
    flexDirection: "row",
  },
  searchArrowBox: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarBox: {
    height: "100%",
    width: "85%",
    padding: 5,
    justifyContent: "center",
  },
  requestButtonBox: {
    flex: 1,
    flexDirection: "row",
  },
  requestButton: {
    flex: 1,
    backgroundColor: "#1D50CF",
    width: "50%",
    height: "100%",
    marginLeft: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  requestButtonText: {
    color: "white",
  },
});
