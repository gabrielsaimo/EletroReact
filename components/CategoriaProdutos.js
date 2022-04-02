import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Appbar } from "react-native-paper";
import Produto from "./Produto";
import StarRating from "react-native-star-rating";
import Local from "./Local";
import SkeletonLoading from "../loadingPage/SkeletonLoading";
export default function CategoriasProduto({ route, navigation }) {
  const baseURL =
    "https://eletrosom.com/shell/ws/integrador/listaProdutos?departamento=" +
    route.params.item +
    "&version=15";
  const perPage = "?q=react&per_page=${perPage}&page=${page}";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [title] = useState(route.params.title);
  const { height, width } = Dimensions.get("window");
  const itemWidth = (width - 15) / 2;
  const [columns, setColumns] = useState(1);
  useEffect(() => {
    loadApi();
  }, []);

  async function loadApi() {
    const response = await axios.get(`${baseURL}`);

    setData([...data, ...response.data]);
    console.log(itemWidth);
    setPage(page + 1);
    setLoading(false);
  }
  function SearchBar() {
    const _handleSearch = () => (
      <TextInput placeholder="test de imput" value={searchText}></TextInput>
    );
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center", zIndex: 99 }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Action />
        <Appbar.Content title={title} style={{ alignItems: "center" }} />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
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
            icon={require("../assets/grade1.png")}
            onPress={() => setColumns(1)}
          />
          <Appbar.Action
            icon={require("../assets/grade.png")}
            onPress={() => setColumns(2)}
          />
          <Appbar.Action icon="power-on" />
          <Appbar.Action icon={require("../assets/filtro.png")} />
        </Appbar.Header>
      </View>
    );
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <SearchBar />
      <Local style={{ zIndex: 100 }} />
      <Options />
      <SkeletonLoading visible={loading}>
        <FlatList
          data={data}
          // onEndReachedThreshold={0.3}
          keyExtractor={(item) => String(item.codigo)}
          numColumns={columns}
          key={columns}
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
  );
}

function ListItem({ data, navigation }) {
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
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                maxWidth: 260,
                width: "90%",
              }}
            >
              {data.nome.slice(0, 36)}{" "}
            </Text>
            <View style={{ width: 80 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={!data.avaliacao ? 5 : data.avaliacao}
                starSize={15}
                fullStarColor={"#FEA535"}
                emptyStarColor={"#6A7075"}
              />
            </View>
            <Text
              style={{
                fontSize: 10,
                width: "100%",
                textDecorationLine: "line-through",
              }}
            >
              {data.precoDe}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                width: "100%",
                color: "#1534C8",
              }}
            >
              {data.precoPor}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ListItem2({ data, navigation }) {
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
                })
              }
            >
              <View style={{ Width: "100%" }}>
                <View>
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
                        marginLeft: 30,
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
                      {data.nome.slice(0, 50)}{" "}
                    </Text>
                  </View>

                  <View style={{ width: "100%", marginLeft: 15 }}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={!data.avaliacao ? 5 : data.avaliacao}
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
                    {data.precoDe}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 25,
                      width: "200%",
                      color: "#1534C8",
                      marginLeft: 15,
                    }}
                  >
                    {data.precoPor}
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
