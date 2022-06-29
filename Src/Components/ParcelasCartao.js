import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../Contexts/Auth";

export default function ParcelasCartao({ route, navigation }) {
  const { URL_PROD } = process.env;
  const { user1, multcar, Comprar } = useContext(AuthContext);
  const [Buy, setBuy] = useState([]);
  const [buyok, setBuyOk] = useState(false);
  const [CVV, setCvv1] = useState(0);
  const [CVV2, setCvv2] = useState(0);
  const [valor1c, setvalor1c] = useState(0);
  const [ok1, setOk1] = useState(false);
  const {
    endereco,
    cart,
    valorTotal,
    valorGeral,
    valor,
    total,
    tipo,
    pagSelect,
    codParcela,
    xparcela,
    vpacelas,
    cartao,
    cvv1,
    valorc01,
    cartao1,
    cartao2,
    resto,
  } = route.params;
  const [restov, setRestoV] = useState("");
  const item =
    cartao2 != undefined
      ? JSON.parse(route.params.cartao2)
      : JSON.parse(route.params.cartao);
  useEffect(() => {
    if (valor1c !== undefined && valor1c !== 0) {
      var calc =
        Number(
          valor1c
            .replace("R$", "")
            .replace(".", "")
            .replace(/[0-9][0-9][0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9],/g, "")
            .replace(/[0-9],/g, "")
        ) -
        Number(
          valor
            .replace(".", "")
            .replace(/[0-9][0-9][0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9],/g, "")
            .replace(/[0-9],/g, "")
        );
      var desc =
        Number(
          valor1c
            .replace("R$", "")
            .replace(".", "")
            .replace(/,[0-9][0-9]/g, "")
        ) - Number(valor.replace(".", "").replace(/,[0-9][0-9]/g, ""));
      console.log(desc);
      setRestoV(desc + "," + calc);
    }
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
          valorTotalcomFrete:
            ok1 == true
              ? valor1c.toString().replace("R$", "")
              : resto != undefined
              ? resto
              : valor,
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
  }, [buyok, ok1, resto]);
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={[
                {
                  marginVertical: 25,
                  marginRight: 10,
                },
                item.item.cod === "EL"
                  ? { width: 77, height: 28, marginTop: 35 }
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
            <View>
              <Text
                style={{
                  color: "#343A40",
                  fontWeight: "bold",
                  fontSize: 15,
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
                {"**** "}
                {item.item.numero.substring(
                  item.item.numero.length - 4,
                  item.item.numero.length
                )}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 30,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>CVV </Text>
              <TextInputMask
                style={{
                  height: 30,
                  width: "100%",
                  fontSize: 16,
                  borderColor: "#A0A5AA",
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                }}
                underlineColorAndroid="transparent"
                type={"only-numbers"}
                maxLength={4}
                borderWidth={1}
                borderColor={"#A0A5AA"}
                backgroundColor={"#fff"}
                paddingHorizontal={10}
                borderRadius={5}
                onChangeText={(cvv) => setCvv1(cvv)}
                placeholder="000"
              />
            </View>
          </View>
        </View>
      </View>
      {tipo === "pagamento_dois_cartoes" && ok1 === false ? (
        <>
          <View
            style={{
              marginHorizontal: 10,
              alignItems: "center",
              backgroundColor: "#E9ECEF",
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <TextInputMask
                  style={{
                    height: 30,
                    fontSize: 16,
                    borderColor: "#A0A5AA",
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    textAlign: "right",
                    marginRight: 5,
                  }}
                  onChangeText={(text) => setvalor1c(text)}
                  placeholder={"R$0,00"}
                  type="money"
                  maxLength={valor.toString().length + 3}
                />
                <Text>de R$ {valor}</Text>
              </View>
            </View>
            <Text> Quanto vc deseja pagar com esse cartão?</Text>
          </View>
          {valor1c.toString().replace("R$", "") !== "0,00" &&
          valor1c.toString().replace("R$", "") !== "0" ? (
            <TouchableOpacity
              style={{
                marginTop: 20,
                alignItems: "center",
                backgroundColor: "#9BCB3D",
                marginHorizontal: 10,
                paddingVertical: 15,
                borderRadius: 10,
              }}
              onPress={() => setOk1(true)}
            >
              <View>
                <Text
                  style={{ fontSize: 18, color: "#FFF", fontWeight: "bold" }}
                >
                  Continuar
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </>
      ) : (
        <FlatList
          data={Buy}
          howsHorizontalScrollIndicator={false}
          initialNumToRender={10}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFF",
                  height: 80,
                  marginHorizontal: 10,
                  justifyContent: "center",
                }}
                onPress={() =>
                  CVV.length > 2 || CVV2.length > 2
                    ? valor1c.toString().replace("R$", "") !== "0,00" &&
                      valor1c.toString().replace("R$", "") !== "0"
                      ? navigation.navigate("Meus Cartões", {
                          rota: "parcela",
                          codParcela: item.item.codParcelas,
                          xparcela: item.item.qdeParcelas,
                          vpacelas: item.item.valorParcela,
                          cartao: route.params.cartao,
                          endereco: endereco,
                          pagSelect: pagSelect,
                          cart: cart,
                          valorTotal: valorTotal,
                          valorGeral: valorGeral,
                          valor: valor,
                          total: total,
                          CVV: CVV,
                          valorc1: valor1c.toString().replace("R$", ""),
                          resto: restov.replace(/-/g, ""),
                        })
                      : navigation.navigate("Checkout", {
                          rota: "parcela",
                          codParcela: codParcela,
                          xparcela: xparcela,
                          vpacelas: vpacelas,
                          cartao: cartao,
                          endereco: endereco,
                          cart: cart,
                          valorTotal: valorTotal,
                          valorGeral: valorGeral,
                          valor: valor,
                          total: total,
                          CVV: cvv1,
                          CVV2: CVV,
                          pagSelectR: pagSelect,
                          valorc1: valor1c.toString().replace("R$", ""),
                          codParcela2: item.item.codParcelas,
                          xparcela2: item.item.qdeParcelas,
                          vpacelas2: item.item.valorParcela,
                          cartao2: cartao2,
                        })
                    : Alert.alert("Ops!", "Preencha o CVV corretamente", [
                        { text: "OK" },
                      ])
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginRight: 30,
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        {item.item.qdeParcelas}x{" "}
                      </Text>
                      <Text style={{ fontSize: 18 }}>
                        {item.item.valorParcela}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#1534C8",
                      }}
                    >
                      {">"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED4DA",
                  width: "95%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
