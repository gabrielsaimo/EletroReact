import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Local from "../Local";
import { Appbar, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";

export default function FavoritosTab() {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [columns, setColumns] = useState(1);
  const [error, setError] = useState(null);
  AsyncStorage.getItem("idCliente").then((idCliente) => {
    setId(idCliente);
  });
  console.log(id);
  const Favoriotos = async () => {
    try {
      await fetch(
        "https://www.eletrosom.com/shell/ws/integrador/listaFavoritos",
        {
          method: "POST",
          headers: {
            Accept: "aplication/json",
            "Content-type": "aplication/json",
          },
          body: JSON.stringify({
            cliente: id,
            version: 15,
          }),
        }
      )
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
        });
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };
  console.log(data);
  useEffect(() => {
      Favoriotos();
    
  }, []);
  if (error == null) {
    Favoriotos();
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
        <Appbar.Content title={"Favoritos"} style={{ alignItems: "center" }} />
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
    <View style={{ width: "100%", height: "100%" }}>
      <SearchBar />
      <Local style={{ zIndex: 100 }} />
      <Options />
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
    </View>
  );
}
function ListItem({ data, navigation }) {
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
            icon={require("../assets/favorito.png")}
            color={"#FFDB00"}
            size={37}
            onPress={() => ({})}
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
                    style={{
                      width: 120,
                      height: 120,
                      marginLeft: 35,
                    }}
                  />
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
                      onPress={() => ({})}
                    />
                  </View>
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
