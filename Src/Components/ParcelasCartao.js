import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../Contexts/Auth";

export default function ParcelasCartao({ route, navigation }) {
  const { URL_PROD } = process.env;
  const { user1, multcar, Comprar } = useContext(AuthContext);
  const [Buy, setBuy] = useState([]);
  const [buyok, setBuyOk] = useState(false);
  const { endereco, cart, valorTotal, valorGeral, valor } = route.params;
  const item = JSON.parse(route.params.cartao);
  useEffect(() => {
    fetch(`${URL_PROD}detalhamentoPagamento`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        carrinho: {
          produtos:
            JSON.stringify(Comprar).length > 2
              ? JSON.stringify(Comprar)
              : multcar,
          cep: "38408250",
          codigoPagamento: "pagamento_um_cartao",
          valorTotalcomFrete: valor,
          valorPagoCartaoUm: "",
          idCliente: user1.idCliente,
        },
        version: 17,
      })
        .replace(/[//\\]/g, "")
        .replace('"[', "[")
        .replace(']"', "]")
        .replace(/"}{"/g, '"},{"'),
    })
      .then((res) => res.json())
      .then((resData) => {
        setBuy(resData.formaPagamento.parcelas);
        setBuyOk(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [buyok]);
  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#E9ECEF",
          borderRadius: 10,
          height: 100,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View>
            <Image
              style={[
                {
                  marginVertical: 25,
                  marginRight: 30,
                },
                item.item.cod === "EL"
                  ? { width: 77, height: 28 }
                  : item.item.cod === undefined
                  ? { width: 70, height: 49 }
                  : { width: 72, height: 45 },
              ]}
              source={
                item.item.cod === "MC"
                  ? require("../../Src/Components/assets/master_card.png")
                  : item.item.cod === "VI"
                  ? require("../../Src/Components/assets/visa.png")
                  : item.item.cod === "AE"
                  ? require("../../Src/Components/assets/american_express.png")
                  : item.item.cod === "DN" ||
                    item.item.numero.substring(0, 2) === "30" ||
                    item.item.numero.substring(0, 2) === "36" ||
                    item.item.numero.substring(0, 2) === "38"
                  ? require("../../Src/Components/assets/diners.png")
                  : item.item.cod === "EL"
                  ? require("../../Src/Components/assets/elo.png")
                  : item.item.cod === "HI" ||
                    item.item.numero.substring(0, 4) === "6062"
                  ? require("../../Src/Components/assets/hipercard.png")
                  : require("../../Src/Components/assets/card_icon.png")
              }
            />
          </View>
          <View style={{ marginTop: "auto", marginBottom: "auto" }}>
            <Text
              style={{
                color: "#343A40",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {item.item.numero.substring(0, 4) === "6062"
                ? "Hipercard"
                : item.item.numero.substring(0, 2) === "30" ||
                  item.item.numero.substring(0, 2) === "36" ||
                  item.item.numero.substring(0, 2) === "38"
                ? "Diners"
                : item.item.cardnome}
            </Text>
            <Text
              style={{
                color: "#6A7075",
                fontWeight: "bold",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {"**** **** **** "}
              {item.item.numero.substring(
                item.item.numero.length - 4,
                item.item.numero.length
              )}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={Buy}
        howsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => (
          <View
            style={{
              backgroundColor: "#FFF",
              height: 100,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Checkout", {
                  rota: "parcela",
                  codParcela: item.item.codParcelas,
                  xparcela: item.item.qdeParcelas,
                  vpacelas: item.item.valorParcela,
                  cartao: route.params.cartao,
                  endereco: endereco,
                  cart: cart,
                  valorTotal: valorTotal,
                  valorGeral: valorGeral,
                  valor: valor,
                })
              }
            >
              <Text>
                X {item.item.qdeParcelas} {item.item.valorParcela}
              </Text>
              <Text>{item.item.codParcelas}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
