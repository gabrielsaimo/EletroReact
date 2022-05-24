import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
const { URL_PROD } = process.env;
import SearchBarHome from "../SearchBarHome";
import Local from "../Local";
import Banner from "../Banner";
import SkeletonLoading from "../SkeletonLoading";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/Auth";
const { width } = Dimensions.get("window");
const width2 = width - 180;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function HomeTab() {
  const { user1 } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    componentDidMount();
  }, [refreshing]);
  const componentDidMount = async () => {
    if (user1.idCliente === null) {
      await fetch(`${URL_PROD}/shell/ws/integrador/listaProdutos?`)
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson);
          setLoading(false);
          setRefreshing(false);
        })
        .catch((error) => {
          console.error(error);
          setRefreshing(false);
          setRefreshing(true);
        });
    } else {
      await fetch(
        `${URL_PROD}/shell/ws/integrador/listaProdutos?idCliente=${user1.idCliente}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson);
          setLoading(false);
          setRefreshing(false);
        })
        .catch((error) => {
          console.error(error);
          setRefreshing(true);
        });
    }
  };

  async function excluir(sku) {
    await fetch(`${URL_PROD}/shell/ws/integrador/excluirFavoritos`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        cliente: user1.idCliente,
        sku: sku,
        version: 15,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setRefreshing(true);
      });
  }
  async function add(sku) {
    await fetch(`${URL_PROD}/shell/ws/integrador/addFavoritos`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        cliente: user1.idCliente,
        sku: sku,
        version: 15,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setRefreshing(true);
      });
  }

  return (
    <SafeAreaView>
      <View style={{ height: "100%", width, backgroundColor: "#FFF" }}>
        <SearchBarHome />
        <Local style={{ width: 10, high: 20 }} />
        {refreshing ? <ActivityIndicator /> : null}
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Banner />
          <SkeletonLoading visible={isLoading}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <View>
                  {!item.emEstoque ? null : (
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <TouchableOpacity
                        style={styles.buttonContainerStyle}
                        onPress={() =>
                          navigation.navigate("Produto", {
                            sku: item.codigo,
                            precode: item.precoDe,
                          })
                        }
                      >
                        <Image
                          source={{ uri: item.imagem }}
                          style={{
                            width: 115,
                            height: 115,
                            resizeMode: "contain",
                            margin: 10,
                          }}
                        />
                        <View
                          sky={index}
                          style={
                            item.favorito
                              ? {
                                  flexDirection: "row",
                                  position: "absolute",
                                  top: -10,
                                  right: -10,
                                  alignSelf: "center",
                                }
                              : {
                                  flexDirection: "row",
                                  position: "absolute",
                                  top: -5,
                                  right: -5,
                                  alignSelf: "center",
                                }
                          }
                        >
                          <IconButton
                            icon={
                              item.favorito
                                ? require("../assets/favorito.png")
                                : require("../assets/heart.png")
                            }
                            color={item.favorito ? "#FFDB00" : "#6A7075"}
                            size={item.favorito ? 37 : 30}
                            onPress={() => {
                              item.favorito
                                ? excluir(item.codigo)
                                : add(item.codigo);
                            }}
                          />
                        </View>
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
                          {item.percentual > 0 ? (
                            <Text
                              style={{
                                textDecorationLine: "line-through",
                                fontSize: 12,
                              }}
                            >
                              R$ {item.precoDe}
                            </Text>
                          ) : (
                            <View style={{ height: 20 }}></View>
                          )}

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
    </SafeAreaView>
  );
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
