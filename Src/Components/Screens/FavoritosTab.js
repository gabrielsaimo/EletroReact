import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Local from "../Local";
import { Appbar, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function FavoritosTab() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [columns, setColumns] = useState(1);
  const [error, setError] = useState(null);
  const [filter_on, setFilter_on] = useState(0);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  AsyncStorage.getItem("idCliente").then((idCliente) => {
    setId(idCliente);
  });
  const Favoriotos = () => {
    try {
      fetch("https://www.eletrosom.com/shell/ws/integrador/listaFavoritos", {
        method: "POST",
        headers: {
          Accept: "aplication/json",
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          cliente: id,
          version: 15,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          setRefreshing(false);
        })
        .catch((error) => onRefresh);
    } catch (error) {
      if (e && id == null) {
        setError(e);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (id !== null) {
      Favoriotos();
    } else {
      alert("logue para ver seus Favoritos");
    }
  }, [refreshing]);

  function SearchBar() {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center", zIndex: 99 }}
      >
        <Appbar.Content title={"Favoritos"} style={{ alignItems: "center" }} />
      </Appbar.Header>
    );
  }
  function ListItem({ data, navigation }) {
    function excluir(sku) {
      AsyncStorage.getItem("idCliente").then((idCliente) => {
        fetch(
          "https://www.eletrosom.com/shell/ws/integrador/excluirFavoritos",
          {
            method: "POST",
            headers: {
              Accept: "aplication/json",
              "Content-type": "aplication/json",
            },
            body: JSON.stringify({
              cliente: idCliente,
              sku: sku,
              version: 15,
            }),
          }
        )
          .then((res) => res.json())
          .then((resData) => {
            setRefreshing(true);
          });
      });
    }
    return (
      <View style={{ alignItems: "center", flex: 1 }}>
        <TouchableOpacity
          style={styles.buttonContainerStyle}
          onPress={() =>
            navigation.navigate("Produto", {
              sku: data.codigo,
              precode: data.precoDe,
            })
          }
        >
          <Image
            source={{ uri: data.imagem }}
            style={
              data.emEstoque === 0
                ? {
                    width: 120,
                    height: 120,
                    resizeMode: "contain",
                    margin: 10,
                    opacity: 0.2,
                  }
                : { width: 120, height: 120, resizeMode: "contain", margin: 10 }
            }
          />
          {data.emEstoque === 0 ? (
            <>
              <View
                style={{
                  width: 100,
                  height: 22,
                  backgroundColor: "#CED4DA",
                  marginLeft: -120,
                  marginRight: 20,
                  marginTop: 50,
                  borderRadius: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#000", fontWeight: "bold" }}>
                  Esgotado
                </Text>
              </View>
            </>
          ) : (
            <></>
          )}
          <View
            style={
              data.favorito
                ? {
                    flexDirection: "row",
                    position: "absolute",
                    top: -10,
                    right: -10,
                    alignSelf: "center",
                    zIndex: 99,
                  }
                : {
                    flexDirection: "row",
                    position: "absolute",
                    top: -5,
                    right: -5,
                    alignSelf: "center",
                    zIndex: 99,
                  }
            }
          >
            <IconButton
              icon={require("../assets/favorito.png")}
              color={"#FFDB00"}
              size={37}
              onPress={() => excluir(data.codigo)}
            />
          </View>
          {!data.avaliacao > 0 ? (
            <></>
          ) : (
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
              <Text>{data.avaliacao}% off</Text>
            </View>
          )}

          <View style={data.emEstoque === 0 ? { opacity: 0.3 } : {}}>
            <Text
              numberOfLines={2}
              style={{
                fontWeight: "bold",
                fontSize: 13,
                maxWidth: 260,
                width: "80%",
              }}
            >
              {data.nome}
            </Text>
            <Text
              style={{
                fontSize: 10,
                width: "100%",
                textDecorationLine: "line-through",
              }}
            >
              R$ {data.precoDe}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                width: "100%",
                color: "#1534C8",
              }}
            >
              R$ {data.precoPor}
            </Text>
            <Text
              style={{
                color: "blue",
                fontSize: 10,
                width: "200%",
              }}
            >
              {data.formaPagamento}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  function ListItem2({ data, navigation }) {
    function excluir(sku) {
      AsyncStorage.getItem("idCliente").then((idCliente) => {
        fetch(
          "https://www.eletrosom.com/shell/ws/integrador/excluirFavoritos",
          {
            method: "POST",
            headers: {
              Accept: "aplication/json",
              "Content-type": "aplication/json",
            },
            body: JSON.stringify({
              cliente: idCliente,
              sku: sku,
              version: 15,
            }),
          }
        )
          .then((res) => res.json())
          .then((resData) => {
            setRefreshing(true);
          });
      });
    }
    return (
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "100%" }}>
          <View>
            <TouchableOpacity
              style={styles.buttonContainerStyle1}
              onPress={() =>
                navigation.navigate("Produto", {
                  sku: data.codigo,
                  title: data.nome,
                  precode: data.precoDe,
                })
              }
            >
              <View style={{ Width: "100%" }}>
                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      Width: "200%",
                    }}
                  >
                    <Image
                      source={{ uri: data.imagem }}
                      style={
                        data.emEstoque === 0
                          ? {
                              width: 120,
                              height: 120,
                              resizeMode: "contain",
                              marginLeft: 35,
                              opacity: 0.2,
                            }
                          : {
                              width: 120,
                              height: 120,
                              resizeMode: "contain",
                              marginLeft: 35,
                            }
                      }
                    />
                    {data.emEstoque === 0 ? (
                      <>
                        <View
                          style={{
                            width: 100,
                            height: 22,
                            backgroundColor: "#CED4DA",
                            marginTop: -70,
                            marginBottom: 48,
                            borderRadius: 20,
                            marginLeft: 35,
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontWeight: "bold" }}>Esgotado</Text>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                    <View
                      style={{
                        flexDirection: "row",
                        position: "absolute",
                        top: -25,
                        right: -50,
                        alignSelf: "center",
                      }}
                    >
                      <IconButton
                        icon={require("../assets/favorito.png")}
                        color={"#FFDB00"}
                        size={37}
                        onPress={() => excluir(data.codigo)}
                      />
                    </View>
                  </View>
                </View>

                <View
                  style={
                    data.emEstoque === 0
                      ? { opacity: 0.3, maxWidth: "50%" }
                      : { maxWidth: "50%" }
                  }
                >
                  <View>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontWeight: "bold",
                        fontSize: 13,
                        width: "200%",
                        marginLeft: 15,
                      }}
                    >
                      {data.nome}
                    </Text>
                  </View>

                  <View style={{ width: "100%", marginLeft: 15 }}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={data.avaliacao}
                      starSize={15}
                      fullStarColor={"#FEA535"}
                      emptyStarColor={"#6A7075"}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      width: "200%",
                      textDecorationLine: "line-through",
                      marginLeft: 15,
                    }}
                  >
                    R$ {data.precoDe}
                  </Text>

                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 25,
                      width: "400%",
                      color: "#1534C8",
                      marginLeft: 15,
                    }}
                  >
                    R$ {data.precoPor}
                  </Text>
                  <Text
                    style={{
                      color: "blue",
                      fontSize: 10,
                      width: "200%",
                      marginLeft: 15,
                    }}
                  >
                    {data.formaPagamento}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <SearchBar />
      <Local style={{ zIndex: 100 }} />
      <View
        style={{
          height: 50,
          flexDirection: "row",
          width: "100%",
          paddingVertical: 10,
          backgroundColor: "#FFF",
        }}
      >
        <View style={{ width: "48%", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {Object.keys(data).length === 0
              ? ["Calculando...", <ActivityIndicator />]
              : Object.keys(data).length - 1 + " Produtos"}
          </Text>
        </View>
        <View flexDirection={"row"}>
          <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            onPress={() => [setColumns(1), setFilter_on(0)]}
          >
            <Image
              style={[
                columns === 1
                  ? { tintColor: "#1534C8" }
                  : { tintColor: "#CED4DA" },
                { height: 25, width: 25 },
              ]}
              source={require("../../../Src/Components/assets/grade1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            onPress={() => [setColumns(2), setFilter_on(0)]}
          >
            <Image
              style={[
                columns === 2
                  ? { tintColor: "#1534C8" }
                  : { tintColor: "#CED4DA" },
                { height: 25, width: 25 },
              ]}
              source={require("../../../Src/Components/assets/grade.png")}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginHorizontal: 8,
              fontSize: 25,
              marginTop: -7,
              color: "#CED4DA",
            }}
          >
            |
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setFilter_on(1)}
          style={{ marginHorizontal: 8, flexDirection: "row" }}
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../../../Src/Components/assets/filtro.png")}
          />
          <Text
            style={{
              color: "#1534C8",
              fontWeight: "bold",
              marginTop: 5,
              fontSize: 15,
              marginLeft: 5,
            }}
          >
            Filtrar
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {id != null ? (
          <FlatList
            data={data}
            numColumns={columns}
            key={columns}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <View>
                {columns === 1 ? (
                  <ListItem
                    data={item}
                    navigation={navigation}
                    navigate={navigator}
                  />
                ) : (
                  <ListItem2
                    data={item}
                    navigation={navigation}
                    navigate={navigator}
                  />
                )}
              </View>
            )}
          ></FlatList>
        ) : (
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Text> Vazio</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    height: 140,
    marginTop: 3,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
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
    height: 270,
    margin: 0.5,
    width: "99.5%",

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
