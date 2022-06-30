import React, { useContext, useEffect, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import styles from "./Styles/Style.js";
import { Searchbar, Appbar, IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";
import Local from "./Local";
import SkeletonLoading from "./SkeletonLoading";
import { AuthContext } from "../Contexts/Auth";
import { useNavigation } from "@react-navigation/native";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function Buscar({ route }) {
  const { URL_PROD } = process.env;
  const { user1 } = useContext(AuthContext);
  const baseURL = `${URL_PROD}busca2?q=${route.params.q}
    &dir=asc&version=15`;
  const perPage = "?q=react&per_page=${perPage}&page=${page}";
  const [data, setData] = useState([]);
  const [search, setSeach] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState(route.params.q);
  const [filter_on, setFilter_on] = useState(0);
  const { height, width } = Dimensions.get("window");
  const [columns, setColumns] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    loadApi();
    return;
  }, [refreshing]);

  async function loadApi() {
    if (user1.idCliente !== null) {
      await fetch(
        `${URL_PROD}busca2?q=` +
          route.params.q +
          "&idCliente=" +
          user1.idCliente +
          "&dir=asc&version=15"
      )
        .then((res) => res.json())
        .then((resData) => {
          if (resData.codigoMensagem === 303) {
            console.log(resData.codigoMensagem);
            alert(resData.mensagem);
            navigation.goBack();
          } else {
            setData(resData);
          }
          setPage(page + 1);
          setLoading(false);
          setRefreshing(false);
          return;
        })
        .catch((error) => {
          console.error(error);
          alert("Erro na busca do produto");
          navigation.goBack();
          return;
        });
    } else {
      await fetch(baseURL)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.codigoMensagem === 303) {
            console.log(resData.codigoMensagem);
            alert(resData.mensagem);
            navigation.goBack();
          } else {
            setData(resData);
            return;
          }
          setPage(page + 1);
          setLoading(false);
          setRefreshing(false);
          return;
        })
        .catch((error) => {
          console.error(error);
          alert("Erro na busca do produto");
          setRefreshing(true);
          return;
        });
    }
  }
  function ListItem({ data, navigation }) {
    async function excluir(sku) {
      await fetch(`${URL_PROD}excluirFavoritos`, {
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
      await fetch(`${URL_PROD}addFavoritos`, {
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
      <View style={{ alignItems: "center", flex: 1 }}>
        {data.codigo !== undefined ? (
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

            {data.percentual > 0 ? (
              <View style={styles.abosolutrow}>
                <View style={styles.corpotag1}>
                  <Text style={styles.textBrancog}>{data.percentual}% off</Text>
                </View>
                <View style={styles.tag1}>
                  <Text style={styles.textstartazul}>12x s/juros</Text>
                </View>
              </View>
            ) : (
              <View style={styles.abosolutrow}>
                <View style={[styles.tag1, { width: "100%" }]}>
                  <Text style={styles.textstartazul}>12x s/juros</Text>
                </View>
              </View>
            )}
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "60%" }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    maxWidth: 260,
                    width: "100%",
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
              <View
                style={[
                  data.favorito
                    ? { marginLeft: -3, marginTop: -15 }
                    : { marginTop: -10 },
                  { width: "25%" },
                ]}
              >
                <IconButton
                  icon={
                    data.favorito
                      ? require("../Components/assets/favorito.png")
                      : require("../Components/assets/heart.png")
                  }
                  color={data.favorito ? "#FFDB00" : "#6A7075"}
                  size={data.favorito ? 37 : 30}
                  onPress={() => {
                    data.favorito ? excluir(data.codigo) : add(data.codigo);
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  }
  function ListItem2({ data, navigation }) {
    async function excluir(sku) {
      await fetch(`${URL_PROD}excluirFavoritos`, {
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
      await fetch(`${URL_PROD}addFavoritos`, {
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
      <View style={{ alignItems: "center" }}>
        {data.codigo !== undefined ? (
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
                    <View style={[styles.abosolutrow, { marginTop: -10 }]}>
                      <View style={styles.tag1}>
                        <Text style={styles.textstartazul}>12x s/juros</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={[styles.abosolutrow, { marginTop: -10 }]}>
                      <View style={styles.corpotag1}>
                        <Text style={styles.textBrancog}>
                          {data.percentual}% off
                        </Text>
                      </View>
                      <View style={[styles.tag1, { width: "50%" }]}>
                        <Text style={styles.textstartazul}>12x s/juros</Text>
                      </View>
                    </View>
                  )}
                  <View
                    style={
                      data.favorito
                        ? {
                            flexDirection: "row",
                            position: "absolute",
                            top: -10,
                            right: -58,
                            alignSelf: "center",
                            zIndex: 999,
                          }
                        : {
                            flexDirection: "row",
                            position: "absolute",
                            top: -5,
                            right: -50,
                            alignSelf: "center",
                            zIndex: 999,
                          }
                    }
                  >
                    <IconButton
                      icon={
                        data.favorito
                          ? require("./assets/favorito.png")
                          : require("./assets/heart.png")
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
                          width: "180%",
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
        ) : (
          <></>
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
  function BuscarNovo() {
    return (
      <Appbar.Header style={{ backgroundColor: "#1534C8", width: "85%" }}>
        <Appbar.Action icon="close" onPress={() => setSeach(false)} />
        <Searchbar
          inputStyle={{ backgroundColor: "white" }}
          style={{
            fontSize: 12,
            elevation: 0,
            borderRadius: 10,
            high: 20,
            marginTop: 15,
            margin: 10,
          }}
          containerStyle={{
            backgroundColor: "blue",
            borderWidth: 1,
            borderRadius: 5,
          }}
          onSubmitEditing={() =>
            navigation.navigate("Buscar", { q: searchQuery })
          }
          placeholder="Buscar item"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Appbar.Header>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ width: "100%", height: "100%" }}>
        {search === true ? <BuscarNovo /> : <SearchBar />}
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
                source={require("./../../Src/Components/assets/grade1.png")}
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
                source={require("./../../Src/Components/assets/grade.png")}
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
              source={require("./../../Src/Components/assets/filtro.png")}
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
        <SkeletonLoading visible={loading}>
          <FlatList
            data={data}
            // onEndReachedThreshold={0.3}
            initialNumToRender={data.length - 1}
            refreshing={loading}
            keyExtractor={(item, index) => index}
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
