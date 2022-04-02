import React, { Component, useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";

import MyComponent from "./Search/SearchBarHome";
import Local from "./Local";
import Banner from "./Banner";
import SkeletonLoading from "../loadingPage/SkeletonLoading";

export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      image: [],
    };
  }

  componentDidMount = () => {
    var imagens =
      "https://eletrosom.com/shell/ws/integrador/banners/?version=15";
    fetch(imagens)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          image: resJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    var categoria_prod =
      "https://eletrosom.com/shell/ws/integrador/listaProdutos?departamento=923&version=15";
    fetch(categoria_prod)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ marginBottom: 115, height: "100%" }}>
        <MyComponent />
        <Local style={{ width: 10, high: 20 }} />

        <View>
          <Image source={{ uri: this.state.image.img }} />
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => String(item.codigo)}
          renderItem={({ item }) => (
            <View>
              {!item.emEstoque ? null : (
                <View style={{ alignItems: "center", flex: 1 }}>
                  <TouchableOpacity
                    style={styles.buttonContainerStyle}
                    onPress={() => navigate("Produto", { sku: item.codigo })}
                  >
                    <Image
                      source={{ uri: item.imagem }}
                      style={{
                        width: 100,
                        height: 110,
                        resizeMode: "contain",
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          maxWidth: 210,
                          width: "100%",
                        }}
                      >
                        {item.nome}
                      </Text>
                      <Text
                        style={{
                          textDecorationLine: "line-through",
                          fontSize: 12,
                        }}
                      >
                        {item.precoDe}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "blue",
                          fontSize: 20,
                        }}
                      >
                        {item.precoPor}
                      </Text>
                      <Text style={{ color: "blue", fontSize: 15 }}>
                        {item.formaPagamento}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = {
  buttonContainerStyle: {
    height: 130,
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
