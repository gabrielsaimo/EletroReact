import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../Contexts/Auth";
import { useIsFocused } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusCartoes({ route, navigation }) {
  const { URL_PROD } = process.env;
  const { Cartao, user1, multcar, arrayCompra } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, [isFocused]);

  async function Meucarrinho() {
    setLoad(true);
    await fetch(`${URL_PROD}carrinho`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        checkout: {
          produtos: multcar,
          cep: "",
        },
        version: 15,
      })
        .replace(/[//\\]/g, "")
        .replace('"[', "[")
        .replace(']"', "]"),
    })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        console.log([resData, setLoad(false)]);
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao carregar o carrinho");
      });
  }

  useEffect(() => {
    onRefresh;
    Meucarrinho();
  }, [refreshing, isFocused, multcar, arrayCompra]);

  return (
    <View style={{ marginBottom: 70 }}>
      <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }}></View>
      {load == false ? (
        <>
          {multcar !== "{}" ? (
            <FlatList
              data={data.retorno.produtos}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 15,
                      width: "100%",
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: item.imagem }}
                    ></Image>
                    <View style={{ maxWidth: "70%" }}>
                      <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
                      <Text>{item.sku}</Text>
                    </View>
                  </View>
                  <View>
                    <Text>{item.quantidade}</Text>
                  </View>
                  <View>
                    <Text>{item.valorUnitario}</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <View style={{ marginBottom: 70 }}>
              <View style={{ marginTop: 30 }}>
                <View
                  style={{
                    alignSelf: "center",
                    marginLeft: 10,
                    backgroundColor: "#EDF2FF",
                    borderRadius: 100,
                    width: 75,
                    height: 75,
                  }}
                >
                  <Image
                    style={{
                      width: 50,
                      height: 55,
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginVertical: 10,
                    }}
                    source={require("../assets/carrinho.png")}
                  />
                </View>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Seu carrinho está vazio
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      marginHorizontal: 55,
                      textAlign: "center",
                      marginTop: "5%",
                    }}
                  >
                    Oque voce acha de aprovetar as melhores ofertas na Eletrosom
                  </Text>
                  <Image
                    style={{ height: "65%", width: "75%", marginTop: "15%" }}
                    source={require("../assets/tela_vazia.png")}
                  />
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </View>
  );
}
