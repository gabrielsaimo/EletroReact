import React from "react";
import { Image, Text, View } from "react-native";
export default function ResumoChechout({ route, navigation }) {
  console.log(
    "🚀 ~ file: ResumoCheckout.js ~ line 4 ~ ResumoChechout ~ route",
    route.params
  );
  return (
    <View>
      <View
        style={{
          paddingVertical: 30,
          paddingHorizontal: "10%",
          marginLeft: "auto",
          marginRight: "auto",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
          backgroundColor: "#FFF",
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10 }}
          source={require("../Components/assets/resumo.png")}
        />
        <Text style={{ fontSize: 18 }}> Revise seu pedido </Text>
        <View style={{ width: 30, height: 30 }} />
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: "#CED4DA",
          width: "100%",
        }}
      />
      <Text> aqui</Text>
    </View>
  );
}
