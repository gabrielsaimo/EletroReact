import { StyleSheet } from "react-native";
export default StyleSheet.create({
  textBrancog: {
    fontSize: 11,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  abosolutrow: {
    flexDirection: "row",
    position: "absolute",
    marginTop: 5,
    marginLeft: 5,
  },
  corpotag1: {
    width: "48%",
    paddingVertical: 7,
    backgroundColor: "#1534C8",
    alignItems: "center",
    borderRadius: 6,
  },
  tag1: {
    width: "62%",
    paddingVertical: 7,
    backgroundColor: "#FFDB01",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 6,
    flexDirection: "row",
  },
  textstartazul: {
    fontSize: 11,
    alignSelf: "flex-start",
    color: "#1534C8",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonContainerStyle: {
    height: 170,
    marginTop: 5,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 5,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: Platform.OS === "ios" ? 0.5 : 0,
    borderRadius: 2,
    borderColor:
      Platform.OS === "ios" ? "rgb(225, 225, 225)" : "rgba(0,0,0,.0)",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
  },
  buttonContainerStyle1: {
    height: 280,
    margin: 0.5,
    width: "99.5%",
    paddingTop: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: Platform.OS === "ios" ? 0.5 : 0,
    borderRadius: 2,
    borderColor:
      Platform.OS === "ios" ? "rgb(225, 225, 225)" : "rgba(0,0,0,.0)",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
  },
});
//const s = require('./style');
