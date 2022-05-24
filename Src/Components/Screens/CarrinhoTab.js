import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
} from "react-native";

export default class CarrinhoTab extends Component {
  render() {
    return (
      <SafeAreaView style={{ height: "100%", backgroundColor: "#FFF" }}>
        <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 7 }} />

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              alignSelf: "center",
              marginLeft: 10,
              backgroundColor: "#EDF2FF",
              borderRadius: 100,
              width: 75,
              height: 75,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 55,
                marginLeft: "auto",
                marginRight: "auto",
                marginVertical: 10,
              }}
              source={require("../assets/carrinho.png")}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Seu carrinho está vazio
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 55,
                textAlign: "center",
                marginTop: "5%",
              }}
            >
              Oque voce acha de aprovetar as melhores ofertas na Eletrosom
            </Text>
            <Image
              style={{ height: "60%", width: "75%", marginTop: "15%" }}
              source={require("../assets/tela_vazia.png")}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
