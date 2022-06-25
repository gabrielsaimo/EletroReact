import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import styles from "../Styles/Style.js";
const { URL_PROD } = process.env;
import { Appbar, IconButton } from "react-native-paper";
import { AuthContext } from "../../Contexts/Auth";
import StarRating from "react-native-star-rating";
import Local from "../Local";
import SearchBarCata from "../SearchBarCatalogo";
import SkeletonLoading from "../SkeletonLoading";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function CategoriasProduto({ route, navigation }) {
  const baseURL = `${URL_PROD}listaProdutos?departamento=${route.params.item}&version=15`;
  const perPage = "?q=react&per_page=${perPage}&page=${page}";
  const { user1 } = useContext(AuthContext);
  const [search, setSeach] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nun, setNun] = useState(0);
  const [title] = useState(route.params.title);
  const [columns, setColumns] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [filter_on, setFilter_on] = useState(0);
  useEffect(() => {
    loadApi();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  async function loadApi() {
    if (user1.idCliente !== null) {
      await fetch(
        `${URL_PROD}listaProdutos?departamento=${route.params.item}&version=15&idCliente=${user1.idCliente}`
      )
        .then((res) => res.json())
        .then((resData) => {
          if (resData === null) {
            alert("Categoria Vazia :(");
            navigation.goBack();
          } else {
            setData(resData);
          }
          setPage(page + 1);
          setLoading(false);
          if (nun === 1) {
          } else if (nun > 1) {
            alert("Erro de requisição");
            navigation.goBack();
            return;
          }
          setRefreshing(false);
          return;
        })
        .catch((error) => {
          setNun(nun + 1);
          if (nun === 1) {
          } else if (nun > 1) {
            alert("Erro de requisição");
            navigation.goBack();
            return;
          }
          console.error(error + " error 1");
          setRefreshing(true);
        });
    } else {
      await fetch(baseURL)
        .then((res) => res.json())
        .then((resData) => {
          if (resData === null) {
            alert("Categoria Vazia :((");
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
          setNun(nun + 1);
          console.error(error + "error 2");
          return;
        });
    }
  }
  function ListItem({ data, index, navigation }) {
    async function excluir(sku) {
      setRefreshing(true);
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
        .then((resData) => {});
    }

    async function add(sku) {
      setRefreshing(true);
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
        .then((resData) => {});
    }
    return (
      <View style={{ alignItems: "center", flex: 1, width: "100%" }}>
        {data === null
          ? [<></>]
          : [
              <>
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

                    {data.percentual > 0 ? (
                      <View style={styles.abosolutrow}>
                        <View style={styles.corpotag1}>
                          <Text style={styles.textBrancog}>
                            {data.percentual}% off
                          </Text>
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "50%" }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            zIndex: 99,
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
                          { width: "50%" },
                        ]}
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
                            data.favorito
                              ? excluir(data.codigo)
                              : add(data.codigo);
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </>,
            ]}
      </View>
    );
  }
  function ListItem2({ data, index, navigation }) {
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
                    <View style={[styles.abosolutrow, { marginTop: -10 }]}>
                      <View style={styles.tag1}>
                        <Text style={styles.textstartazul}>12x s/juros</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={[styles.abosolutrow, { marginTop: -10 }]}>
                      <View
                        style={[styles.corpotag1, { flexDirection: "row" }]}
                      >
                        <Text style={styles.textBrancog}>
                          {data.percentual}% off
                        </Text>
                      </View>
                      <View style={[styles.tag1, { width: "48%" }]}>
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
                            right: -50,
                            alignSelf: "center",
                          }
                        : {
                            flexDirection: "row",
                            position: "absolute",
                            top: -5,
                            right: -45,
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
                        width: 200,
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

  return (
    <SafeAreaView>
      <View style={{ width: "100%", height: "100%" }}>
        {search === true ? <SearchBarCata /> : <SearchBar />}
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
                ? [<ActivityIndicator />]
                : Object.keys(data).length + " Produtos"}
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

        <SkeletonLoading visible={loading}>
          <FlatList
            data={data}
            // onEndReachedThreshold={0.3}
            keyExtractor={(item, index) => index}
            initialNumToRender={10}
            numColumns={columns}
            key={columns}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item, index }) => (
              <View>
                {columns === 1 ? (
                  <ListItem
                    data={item}
                    index={index}
                    navigation={navigation}
                    navigate={navigator}
                  />
                ) : (
                  <ListItem2
                    data={item}
                    index={index}
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
