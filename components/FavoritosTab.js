import React, { Component } from "react";
import { Button, View, Text } from "react-native";

export default class FavoritosTab extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Favoritos"
          onPress={() => console.log("botão da tela 4 ")}
        />
      </View>
    );
  }
}
