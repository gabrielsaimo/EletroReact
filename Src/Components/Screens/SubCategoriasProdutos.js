import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Text,
  View,
} from "react-native";
import Local from "../Local";

export default function SubCategoriasProdutos({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState(route.params.sub);
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <Local />
          <FlatList
            data={data}
            style={{ height: "100 %" }}
            keyExtractor={(item) => String(item.idSub)}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center", flex: 1 }}>
                <TouchableOpacity
                  style={styles.buttonContainerStyle}
                  onPress={() =>
                    navigation.navigate("CategoriasProduto", {
                      item: item.idSub,
                      title: item.nomeSub,
                    })
                  }
                >
                  <Text style={{ fontSize: 18, color: "#6A7075" }}>
                    {item.nomeSub}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
}
const styles = {
  buttonContainerStyle: {
    height: 56,
    marginTop: 3,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
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
};
