import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar } from "react-native-paper";
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
        setLoad(false);
      });
  }

  useEffect(() => {
    onRefresh;
    Meucarrinho();
    setData(data);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, [refreshing, isFocused, arrayCompra]);

  return (
    <View style={{ marginBottom: 70 }}>
      <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }}></View>
      {data.lenght > 0 ? (
        <></>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
