import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  headerone: {
    flex: 0.2,
    backgroundColor: "#1D50CF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    backgroundColor: "#1D50CF",
  },
  mainbody: {
    flex: 0.95,
    backgroundColor: "white",
    borderRadius: 70,
  },
  title: {
    position: "absolute",
    top: 40,
    left: "35%",
    fontSize: 40,
    fontWeight: "bold",
    color: "#1D50CF",
  },
  inputFieldBox: {
    marginTop: 100,
  },
  inputfield: {
    marginBottom: 50,
    borderBottomWidth: 3,
    borderBottomColor: "#1D50CF",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#1D50CF",
    marginLeft: "35%",
    width: 130,
    height: 60,
    marginTop: 0,
  },
  loginbutton: {
    backgroundColor: "#1D50CF",
    marginLeft: "35%",
    width: 130,
    height: 45,
  },
  buttonTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    padding: 5,
  },
  signupText: {
    position: "absolute",
    color: "#1D50CF",
    top: 130,
    left: 60,
    fontSize: 17,
  },
  signupBox: {
    position: "absolute",
    top: 133,
    left: 180,
  },
  signup: {
    color: "#1D50CF",
    fontWeight: "bold",
  },
  signupInputField: {
    marginBottom: 30,
    borderBottomWidth: 3,
    borderBottomColor: "#1D50CF",
    marginHorizontal: 30,
  },
  radioBox: {
    width: "100%",
    height: "10%",
    paddingHorizontal: 40,
    flexDirection: "row",
  },
  RadioButton: {
    borderWidth: 2,
    borderColor: "lightgray",
    width: 25,
    height: 25,
    borderRadius: 15,
    marginLeft: 5,
    padding: 3,
  },
  RadioButtonChecked: {
    backgroundColor: "#1D50CF",
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  RadioButtonText: {
    marginTop: 3,
    marginLeft: 3,
  },
});
