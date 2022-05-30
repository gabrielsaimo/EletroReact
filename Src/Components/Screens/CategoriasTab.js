import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  SectionList,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import Local from "../Local";

const { URL_PROD } = process.env;
export default class CategoriasTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
  }

  componentDidMount = async () => {
    var categoria_prod = `${URL_PROD}listaDepartamentos/?version=16`;
    await fetch(categoria_prod)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.categorias.cat.sub);
        this.setState({
          data: responseJson.categorias.cat,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (error) {
          console.error(error);
          componentDidMount();
        }
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
      <View style={{ width: "100%", height: "100%" }}>
        <Local />
        <FlatList
          data={this.state.data}
          style={{ height: "100 %" }}
          keyExtractor={(item) => String(item.idCat)}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", flex: 1 }}>
              <TouchableOpacity
                style={styles.buttonContainerStyle}
                onPress={() =>
                  navigate("SubCategoriasProdutos", {
                    item: item.idCat,
                    title: item.nomeCat,
                    sub: item.sub,
                  })
                }
              >
                <Image
                  source={{ uri: item.urlCat }}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 18, color: "#6A7075" }}>
                  {item.nomeCat}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
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
