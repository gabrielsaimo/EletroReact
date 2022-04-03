import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

import SearchBarHome from "../SearchBarHome";
import Local from "../Local";
import Banner from "../Banner";
import SkeletonLoading from "../SkeletonLoading";
const { height, width } = Dimensions.get("window");
const width2 = width - 180;
console.log("🚀 ~ file: HomeTab.js ~ line 20 ~ width2", width2);
export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      image: [],
    };
  }

  async componentDidMount() {
    var categoria_prod =
      "https://eletrosom.com/shell/ws/integrador/listaProdutos?departamento=923&version=15";
    await fetch(categoria_prod)
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
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ height: "100%", width }}>
        <SearchBarHome />
        <Local style={{ width: 10, high: 20 }} />

        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          <Banner />
          <SkeletonLoading visible={this.state.isLoading}>
            <FlatList
              data={this.state.data}
              keyExtractor={(item) => String(item.codigo)}
              renderItem={({ item }) => (
                <View>
                  {!item.emEstoque ? null : (
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <TouchableOpacity
                        style={styles.buttonContainerStyle}
                        onPress={() =>
                          navigate("Produto", {
                            sku: item.codigo,
                            precode: item.precoDe,
                          })
                        }
                      >
                        <Image
                          source={{ uri: item.imagem }}
                          style={{
                            width: 120,
                            height: 120,
                            resizeMode: "contain",
                            margin: 10,
                          }}
                        />

                        {item.percentual > 0 ? (
                          <View
                            style={{
                              width: 80,
                              height: 20,
                              position: "absolute",
                              margin: 5,
                              backgroundColor: "#FEA535",
                              alignItems: "center",
                              borderRadius: 20,
                            }}
                          >
                            <Text>{item.percentual}% off</Text>
                          </View>
                        ) : (
                          <></>
                        )}
                        <View style={{ width2 }}>
                          <Text
                            numberOfLines={2}
                            style={{
                              fontWeight: "bold",
                              fontSize: 13,
                              maxWidth: width2,
                            }}
                          >
                            {item.nome}
                          </Text>
                          {item.percentual > 0 ?(<Text
                            style={{
                              textDecorationLine: "line-through",
                              fontSize: 12,
                            }}
                          >
                            R$ {item.precoDe}
                          </Text>):(<View style={{height:20}}></View>)}
                          
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "blue",
                              fontSize: 20,
                            }}
                          >
                            R$ {item.precoPor}
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
          </SkeletonLoading>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  buttonContainerStyle: {
    height: 140,
    marginTop: 3,
    width: "100%",
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
