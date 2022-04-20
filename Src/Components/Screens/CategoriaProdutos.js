import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";
import Local from "../Local";
import SearchBarCata from "../SearchBarCatalogo";
import SkeletonLoading from "../SkeletonLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function CategoriasProduto({ route, navigation }) {
  const [idCliente, setIdcliente] = useState("");
  AsyncStorage.getItem("idCliente").then((idCliente) => {
    setIdcliente(
      "https://eletrosom.com/shell/ws/integrador/listaProdutos?departamento=" +
        route.params.item +
        "&version=15&idCliente=" +
        idCliente
    );
  });
  const baseURL =
    "https://eletrosom.com/shell/ws/integrador/listaProdutos?departamento=" +
    route.params.item +
    "&version=15";
  const perPage = "?q=react&per_page=${perPage}&page=${page}";
  const [search,setSeach] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [title] = useState(route.params.title);

  const { height, width } = Dimensions.get("window");
  const itemWidth = (width - 15) / 2;
  const [columns, setColumns] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    loadApi();
  }, [refreshing]);

  async function loadApi() {
    if (idCliente !== "") {
      fetch(idCliente)
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          setPage(page + 1);
          setLoading(false);
          setRefreshing(false);
        }).catch((error) => {
          console.error(error);
          setRefreshing(true)
        });
    } else {
      fetch(baseURL)
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          setPage(page + 1);
          setLoading(false);
          setRefreshing(false);
        }).catch((error) => {
          console.error(error);
          setRefreshing(true)
        });
    }
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

    function add(sku) {
      AsyncStorage.getItem("idCliente").then((idCliente) => {
        fetch("https://www.eletrosom.com/shell/ws/integrador/addFavoritos", {
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
        })
          .then((res) => res.json())
          .then((resData) => {
            setRefreshing(true);
          });
      });
    }
    return (
      <View style={{ alignItems: "center", flex: 1 }}>
        {!data.emEstoque ? null : (
          <TouchableOpacity
            style={styles.buttonContainerStyle}
            onPress={() =>
              navigation.navigate("Produto", {
                sku: data.codigo,
                title: data.nome,
                precode: data.precoDe,
              })
            }
          >
            <Image
              source={{ uri: data.imagem }}
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
                margin: 10,
              }}
            />
            <View
              style={
                data.favorito
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
                  data.favorito
                    ? require("../assets/favorito.png")
                    : require("../assets/heart.png")
                }
                color={data.favorito ? "#FFDB00" : "#6A7075"}
                size={data.favorito ? 37 : 30}
                onPress={() => {
                  data.favorito ? excluir(data.codigo) : add(data.codigo);
                }}
              />
            </View>
            {!data.percentual > 0 ? (
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
                <Text>{data.percentual}% off</Text>
              </View>
            )}

            <View>
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  maxWidth: 260,
                  width: "90%",
                }}
              >
                {data.nome}
              </Text>
              <View style={{ width: 80 }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={data.avaliacao}
                  starSize={15}
                  fullStarColor={"#FEA535"}
                  emptyStarColor={"#6A7075"}
                />
              </View>
              {!data.percentual > 0 ? (
                <View style={{ height: 15 }}></View>
              ) : (
                <Text
                  style={{
                    fontSize: 10,
                    width: "100%",
                    textDecorationLine: "line-through",
                  }}
                >
                  R$ {data.precoDe}
                </Text>
              )}
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
            </View>
          </TouchableOpacity>
        )}
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

    function add(sku) {
      AsyncStorage.getItem("idCliente").then((idCliente) => {
        fetch("https://www.eletrosom.com/shell/ws/integrador/addFavoritos", {
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
        })
          .then((res) => res.json())
          .then((resData) => {
            setRefreshing(true);
          });
      });
    }
    return (
      <View style={{ alignItems: "center" }}>
        {!data.emEstoque ? null : (
          <View style={{ width: "100%" }}>
            <View>
              <TouchableOpacity
                style={styles.buttonContainerStyle1}
                onPress={() =>
                  navigation.navigate("Produto", {
                    sku: data.codigo,
                    title: data.nome,
                    precode: data.precoDe,
                    favorito: data.favorito,
                  })
                }
              >
                <View style={{ Width: "100%" }}>
                  {!data.percentual > 0 ? (
                    <></>
                  ) : (
                    <View
                      style={{
                        width: 80,
                        height: 20,
                        position: "absolute",
                        backgroundColor: "#FEA535",
                        alignItems: "center",
                        borderRadius: 20,
                        margin: 10,
                        zIndex: 99,
                      }}
                    >
                      <Text>{data.percentual}% off</Text>
                    </View>
                  )}
                  <View
                    style={
                      data.favorito
                        ? {
                            flexDirection: "row",
                            position: "absolute",
                            top: -10,
                            right: -60,
                            alignSelf: "center",
                          }
                        : {
                            flexDirection: "row",
                            position: "absolute",
                            top: -5,
                            right: -50,
                            alignSelf: "center",
                          }
                    }
                  >
                    <IconButton
                      icon={
                        data.favorito
                          ? require("../assets/favorito.png")
                          : require("../assets/heart.png")
                      }
                      color={data.favorito ? "#FFDB00" : "#6A7075"}
                      size={data.favorito ? 37 : 30}
                      onPress={() => {
                        data.favorito ? excluir(data.codigo) : add(data.codigo);
                      }}
                    />
                  </View>
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
                        style={{
                          width: 120,
                          height: 120,
                          marginLeft: 35,
                        }}
                      />
                    </View>
                  </View>

                  <View style={{ maxWidth: "50%" }}>
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
                    {!data.percentual > 0 ? (
                      <View style={{ height: 15.7 }}></View>
                    ) : (
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
                    )}

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
        )}
      </View>
    );
  }

  function SearchBar() {

    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center", zIndex: 99 }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Action />
        <Appbar.Content title={title} style={{ alignItems: "center" }} />
        <Appbar.Action icon="magnify" onPress={() => setSeach(true)} />
        <Appbar.Action
          icon="cart-outline"
          onPress={() => navigation.navigate("CarrinhoTab")}
        />
      </Appbar.Header>
    );
  }

  const Options = () => {
    return (
      <View style={{ marginTop: -35, zIndex: 1 }}>
        <Appbar.Header
          style={{ backgroundColor: "#fff", alignItems: "center" }}
        >
          <Appbar.Content
            title={Object.keys(data).length + " Produtos"}
            style={{ alignItems: "center" }}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Action
            icon={require("../../../Src/Components/assets/grade1.png")}
            onPress={() => setColumns(1)}
          />
          <Appbar.Action
            icon={require("../../../Src/Components/assets/grade.png")}
            onPress={() => setColumns(2)}
          />
          <Appbar.Action icon="power-on" />
          <Appbar.Action
            icon={require("../../../Src/Components/assets/filtro.png")}
          />
        </Appbar.Header>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ width: "100%", height: "100%" }}>
        {search === true ? <SearchBarCata />:<SearchBar />}
        <Local style={{ zIndex: 100 }} />
        <Options />
        <SkeletonLoading visible={loading}>
          <FlatList
            data={data}
            // onEndReachedThreshold={0.3}
            keyExtractor={(item) => String(item.codigo)}
            numColumns={columns}
            key={columns}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
            // onEndReached={loadApi}
            // ListFooterComponent={<FooterList Load={loading}/>}
          />
        </SkeletonLoading>
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
};
