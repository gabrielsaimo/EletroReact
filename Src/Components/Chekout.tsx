import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Contexts/Auth";
import NumberFormat from "react-number-format";
import DialogInput from "react-native-dialog-input";
import { Alert } from "react-native";
type Props = {};
export default function Checkout({ route, navigation }) {
  const { URL_PROD } = process.env;
  const { user1, multcar, Comprar } = useContext(AuthContext);
  const {
    rota,
    cart,
    endereco,
    valorTotal,
    valorGeral,
    cartao,
    cartao2,
    codParcela,
    codParcela2,
    vpacelas,
    vpacelas2,
    xparcela,
    xparcela2,
    CVV,
    CVV2,
    pagSelectR,
  } = route.params;
  const [frete, setFreteN] = useState(0);
  const [fretecets, setCetsFrete] = useState(0);
  const [valorFrete, setvalorFrete] = useState(0);
  console.log(
    "🚀 ~ file: Chekout.tsx ~ line 31 ~ Checkout ~ valorFrete",
    valorFrete
  );
  const [total, setTotal] = useState(0);
  const [data, setData] = useState(JSON.parse(endereco));
  const [data2, setData2] = useState(JSON.parse(cart));
  const [visibleCupom, setVisibleCupom] = useState(false);
  const [Buy, setBuy] = useState([]);
  const [cupom, setCupom] = useState("");
  const [dataCupom, setDataCupom] = useState([]); //!
  const [desconto, setDesconto] = useState(0); //!
  const [value, setValue] = useState(null);
  const [pagamento, setPagamento] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pagSelect, setPagSelect] = useState(null);
  const [data3, setDat3] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [valorFinal, setValorTotal] = useState(0);
  const [reload, setReload] = useState(false);
  function Pagamento() {
    fetch(`${URL_PROD}pagamentoDisponiveisCliente`, {
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
          idCliente: user1.idCliente,
          valorTotalcomFrete: value,
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
        setPagamentos(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function Cupom(cupom) {
    fetch(`${URL_PROD}consultaCupom`, {
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
          cupom: cupom,
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
        if (resData.retorno.descontoCupom !== "0,00") {
          var emoje = "🤩🤩🤩";
          setDesconto(resData.retorno.descontoCupom);
          setDataCupom(resData);
          setValorTotal(resData.retorno.valorTotal);
          Alert.alert(resData.retorno.message, emoje, [{ text: "OK" }]);
        } else {
          var emoje = "😕😕😕";
          Alert.alert(resData.retorno.message, emoje, [{ text: "OK" }]);
        }
        setPagSelect(null);

        setReload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (valorFinal != 0 && desconto != "0,00") {
      var val =
        fretecets -
        Number(
          desconto
            .replace(".", "")
            .replace(/[0-9][0-9][0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9][0-9],/g, "")
            .replace(/[0-9][0-9],/g, "")
            .replace(/[0-9],/g, "")
            .replace("-", "")
        );
      calc = val.toString().replace("-", "");
      if (calc.toString().length === 1) {
        var calc = "0" + calc;
      }
      if (calc < 0 && desconto > 0 && desconto != "0,00") {
        setTotal(
          Number(frete) +
            Number(valorFinal.replace(".", "").replace(/,[0-9][0-9]/, "")) +
            "," +
            fretecets -
            Number(
              desconto
                .replace(".", "")
                .replace(/[0-9][0-9][0-9][0-9][0-9],/g, "")
                .replace(/[0-9][0-9][0-9][0-9],/g, "")
                .replace(/[0-9][0-9][0-9],/g, "")
                .replace(/[0-9][0-9],/g, "")
                .replace(/[0-9],/g, "")
                .replace("-", "")
            )
        );
      } else {
        setTotal(
          Number(frete) +
            Number(valorFinal.replace(".", "").replace(/,[0-9][0-9]/, "")) +
            1 +
            "," +
            calc
        );
      }
    } else {
      var soma = Number(frete) + Number(valorTotal) + "," + fretecets;
      setTotal(soma);
    }

    fetch(`${URL_PROD}consultaFrete`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        version: 17,
        id: 0,
        estado: null,
        cep: null,
        descricao: null,
        valor: null,
        prazo: null,
        codigoFrete: null,
        selecionadoIcon: null,
        selecionado: false,
        frete: {
          produtos:
            JSON.stringify(Comprar).length > 2
              ? JSON.stringify(Comprar)
              : multcar,
          cep: data.cep,
          total_com_desconto: valorTotal,
        },
      })
        .replace(/[//\\]/g, "")
        .replace('"[', "[")
        .replace(']"', "]")
        .replace(/"}{"/g, '"},{"'),
    })
      .then((res) => res.json())
      .then((resData) => {
        setDat3(resData);
      })
      .catch((error) => {
        console.log(error);
      });
    if (pagamento === true) {
      Pagamento();
    }
    setReload(false);
  }, [pagamento, reload]);

  return (
    <View style={{ backgroundColor: "#FFF" }}>
      {pagamento ? (
        <>
          <View style={{ height: "15%" }}>
            <View
              style={{
                backgroundColor: "#9BCB3D",
                zIndex: 1,
                height: 5,
                width: "60%",
              }}
            />
            <View
              style={{
                paddingVertical: 30,
                paddingHorizontal: "10%",
                marginLeft: "auto",
                marginRight: "auto",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
                backgroundColor: "#FFF",
              }}
            >
              <Image
                style={{ width: 30, height: 30, marginRight: 10 }}
                source={require("../Components/assets/grana.png")}
              />
              <Text style={{ fontSize: 18 }}>
                {" "}
                Selecione a forma de pagamento{" "}
              </Text>
              <View style={{ width: 30, height: 30 }} />
            </View>
            <View
              style={{
                height: 2,
                backgroundColor: "#CED4DA",
                width: "100%",
              }}
            />
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            style={{ height: "18.33%" }}
            data={pagamentos.formaPagamento}
            keyExtractor={(item, index) => index}
            initialNumToRender={3}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  style={{
                    height: "90%",
                    margin: 10,
                    borderWidth: pagSelect === item.codigoPagamento ? 0 : 1,
                    width: 130,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      pagSelect === item.codigoPagamento ? "#1534C8" : "#FFF",
                    paddingHorizontal: 16,
                    borderColor: "#6A7075",
                  }}
                  onPress={() => {
                    setPagSelect(item.codigoPagamento),
                      item.codigoPagamento === "pagamento_um_cartao"
                        ? navigation.navigate("Meus Cartões", {
                            rota: "chekout",
                            tipo: item.codigoPagamento,
                            valor: total,
                            endereco: endereco,
                            pagSelect: item.codigoPagamento,
                            cart: cart,
                            valorTotal: valorTotal,
                            valorGeral: valorGeral,
                          })
                        : item.codigoPagamento === "pagamento_dois_cartoes"
                        ? navigation.navigate("Meus Cartões", {
                            rota: "chekout",
                            tipo: item.codigoPagamento,
                            valor: total,
                            endereco: endereco,
                            pagSelect: item.codigoPagamento,
                            cart: cart,
                            valorTotal: valorTotal,
                            valorGeral: valorGeral,
                          })
                        : {};
                  }}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Image
                      style={{
                        width: 45,
                        height: 45,
                        tintColor:
                          pagSelect === item.codigoPagamento
                            ? "#FFF"
                            : "#1534C8",
                      }}
                      source={
                        item.codigoPagamento === "boleto_bradesco"
                          ? require("../Components/assets/boleto.png")
                          : item.codigoPagamento === "pagamento_um_cartao"
                          ? require("../Components/assets/creditcard.png")
                          : require("../Components/assets/2creditcard.png")
                      }
                    />
                    <Text
                      style={{
                        color:
                          pagSelect === item.codigoPagamento
                            ? "#FFF"
                            : "#1534C8",
                      }}
                    >
                      {item.descricaoPagamento}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={{ height: "33.33%" }}>
            <View style={{ flex: 0.9 }}>
              {pagSelect === "pagamento_um_cartao" &&
              codParcela2 !== undefined &&
              vpacelas === undefined ? (
                <View>
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
                            JSON.parse(cartao).item.cod === "EL"
                              ? { width: 77, height: 28 }
                              : JSON.parse(cartao).item.cod === undefined
                              ? { width: 70, height: 49 }
                              : { width: 72, height: 45 },
                          ]}
                          source={
                            JSON.parse(cartao).item.cod === "MC"
                              ? require("../../Src/Components/assets/master_card.png")
                              : JSON.parse(cartao).item.cod === "VI"
                              ? require("../../Src/Components/assets/visa.png")
                              : JSON.parse(cartao).item.cod === "AE"
                              ? require("../../Src/Components/assets/american_express.png")
                              : JSON.parse(cartao).item.cod === "DN" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  2
                                ) === "30" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  2
                                ) === "36" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  2
                                ) === "38"
                              ? require("../../Src/Components/assets/diners.png")
                              : JSON.parse(cartao).item.cod === "EL"
                              ? require("../../Src/Components/assets/elo.png")
                              : JSON.parse(cartao).item.cod === "HI" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  4
                                ) === "6062"
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
                            fontSize: 15,
                          }}
                        >
                          {JSON.parse(cartao).item.numero.substring(0, 4) ===
                          "6062"
                            ? "Hipercard"
                            : JSON.parse(cartao).item.numero.substring(0, 2) ===
                                "30" ||
                              JSON.parse(cartao).item.numero.substring(0, 2) ===
                                "36" ||
                              JSON.parse(cartao).item.numero.substring(0, 2) ===
                                "38"
                            ? "Diners"
                            : JSON.parse(cartao).item.cardnome}
                        </Text>
                        <Text
                          style={{
                            color: "#6A7075",
                            fontWeight: "bold",
                            fontSize: 13,
                            marginTop: 5,
                          }}
                        >
                          {"****"}
                          {JSON.parse(cartao).item.numero.substring(
                            JSON.parse(cartao).item.numero.length - 4,
                            JSON.parse(cartao).item.numero.length
                          )}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginHorizontal: 20,
                        }}
                      >
                        <View style={{ alignItems: "flex-end", width: "100%" }}>
                          <Text style={{ fontSize: 15, color: "#6A7075" }}>
                            Parcelas
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 15,
                            color: "#1534C8",
                            fontWeight: "bold",
                          }}
                        >
                          {xparcela2}x de {vpacelas2.replace(" s/ juros", "")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : pagSelect === pagSelectR ? (
                <View>
                  <View
                    style={{
                      backgroundColor: "#E9ECEF",
                      borderRadius: 10,
                      height: 90,
                      marginVertical: 5,
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
                            JSON.parse(cartao).item.cod === "EL"
                              ? { width: 77, height: 28 }
                              : JSON.parse(cartao).item.cod === undefined
                              ? { width: 70, height: 49 }
                              : { width: 72, height: 45 },
                          ]}
                          source={
                            JSON.parse(cartao).item.cod === "MC"
                              ? require("../../Src/Components/assets/master_card.png")
                              : JSON.parse(cartao).item.cod === "VI"
                              ? require("../../Src/Components/assets/visa.png")
                              : JSON.parse(cartao).item.cod === "AE"
                              ? require("../../Src/Components/assets/american_express.png")
                              : JSON.parse(cartao).item.cod === "DN" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  2
                                ) === "30" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  2
                                ) === "36" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  2
                                ) === "38"
                              ? require("../../Src/Components/assets/diners.png")
                              : JSON.parse(cartao).item.cod === "EL"
                              ? require("../../Src/Components/assets/elo.png")
                              : JSON.parse(cartao).item.cod === "HI" ||
                                JSON.parse(cartao).item.numero.substring(
                                  0,
                                  4
                                ) === "6062"
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
                            width:
                              JSON.parse(cartao).item.cardnome === "Visa"
                                ? 90
                                : 100,
                            fontSize: 15,
                          }}
                        >
                          {JSON.parse(cartao).item.numero.substring(0, 4) ===
                          "6062"
                            ? "Hipercard"
                            : JSON.parse(cartao).item.numero.substring(0, 2) ===
                                "30" ||
                              JSON.parse(cartao).item.numero.substring(0, 2) ===
                                "36" ||
                              JSON.parse(cartao).item.numero.substring(0, 2) ===
                                "38"
                            ? "Diners"
                            : JSON.parse(cartao).item.cardnome}
                        </Text>
                        <Text
                          style={{
                            color: "#6A7075",
                            fontWeight: "bold",
                            fontSize: 13,
                            marginTop: 5,
                          }}
                        >
                          {"****"}
                          {JSON.parse(cartao).item.numero.substring(
                            JSON.parse(cartao).item.numero.length - 4,
                            JSON.parse(cartao).item.numero.length
                          )}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginHorizontal: 20,
                        }}
                      >
                        <View style={{ alignItems: "flex-end", width: "100%" }}>
                          <Text style={{ fontSize: 15, color: "#6A7075" }}>
                            Parcelas
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 15,
                            color: "#1534C8",
                            fontWeight: "bold",
                          }}
                        >
                          {xparcela}x de {vpacelas.replace(" s/ juros", "")}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#E9ECEF",
                      borderRadius: 10,
                      height: 90,
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
                              width: 100,
                              marginVertical: 25,
                              marginRight: 30,
                            },
                            JSON.parse(cartao2).item.cod === "EL"
                              ? { width: 77, height: 28 }
                              : JSON.parse(cartao2).item.cod === undefined
                              ? { width: 70, height: 49 }
                              : { width: 72, height: 45 },
                          ]}
                          source={
                            JSON.parse(cartao2).item.cod === "MC"
                              ? require("../../Src/Components/assets/master_card.png")
                              : JSON.parse(cartao2).item.cod === "VI"
                              ? require("../../Src/Components/assets/visa.png")
                              : JSON.parse(cartao2).item.cod === "AE"
                              ? require("../../Src/Components/assets/american_express.png")
                              : JSON.parse(cartao2).item.cod === "DN" ||
                                JSON.parse(cartao2).item.numero.substring(
                                  0,
                                  2
                                ) === "30" ||
                                JSON.parse(cartao2).item.numero.substring(
                                  0,
                                  2
                                ) === "36" ||
                                JSON.parse(cartao2).item.numero.substring(
                                  0,
                                  2
                                ) === "38"
                              ? require("../../Src/Components/assets/diners.png")
                              : JSON.parse(cartao2).item.cod === "EL"
                              ? require("../../Src/Components/assets/elo.png")
                              : JSON.parse(cartao2).item.cod === "HI" ||
                                JSON.parse(cartao2).item.numero.substring(
                                  0,
                                  4
                                ) === "6062"
                              ? require("../../Src/Components/assets/hipercard.png")
                              : require("../../Src/Components/assets/card_icon.png")
                          }
                        />
                      </View>
                      <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <Text
                          style={{
                            color: "#343A40",
                            width:
                              JSON.parse(cartao2).item.cardnome === "Visa"
                                ? 90
                                : 100,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          {JSON.parse(cartao2).item.numero.substring(0, 4) ===
                          "6062"
                            ? "Hipercard"
                            : JSON.parse(cartao2).item.numero.substring(
                                0,
                                2
                              ) === "30" ||
                              JSON.parse(cartao2).item.numero.substring(
                                0,
                                2
                              ) === "36" ||
                              JSON.parse(cartao2).item.numero.substring(
                                0,
                                2
                              ) === "38"
                            ? "Diners"
                            : JSON.parse(cartao2).item.cardnome}
                        </Text>
                        <Text
                          style={{
                            color: "#6A7075",
                            fontWeight: "bold",
                            fontSize: 13,
                            marginTop: 5,
                          }}
                        >
                          {"****"}
                          {JSON.parse(cartao2).item.numero.substring(
                            JSON.parse(cartao2).item.numero.length - 4,
                            JSON.parse(cartao2).item.numero.length
                          )}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginHorizontal: 20,
                        }}
                      >
                        <View style={{ alignItems: "flex-end", width: "100%" }}>
                          <Text style={{ fontSize: 15, color: "#6A7075" }}>
                            Parcelas
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 15,
                            color: "#1534C8",
                            fontWeight: "bold",
                          }}
                        >
                          {xparcela2}x de {vpacelas2.replace(" s/ juros", "")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : pagSelect === "boleto_bradesco" ? (
                <>
                  <View
                    style={{
                      backgroundColor: "#FFF",
                      alignItems: "center",
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                      Atenção
                    </Text>
                    <Text>{"Opção válida apenas para pagamento à vista."}</Text>
                    <Text>
                      O boleto deve ser impresso após a finalização do pedido.
                      Este boleto tem validade de 2 dias úteis após a
                      finalização da compra.
                    </Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
            <View style={{ flex: 0.2 }}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#BAC8FF",
                  marginHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
                onPress={() => setVisibleCupom(true)}
              >
                <Text style={{ fontWeight: "bold", color: "#1534C8" }}>
                  {desconto !== 0 && desconto != "0,00"
                    ? "Alterar"
                    : "Adicionar"}
                  {" cupom de desconto >"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <DialogInput
              isDialogVisible={visibleCupom}
              cancelText={"Cancelar"}
              submitText={"Usar"}
              title={"Cupom"}
              message={""}
              hintInput={""}
              submitInput={(inputText) => {
                setCupom(inputText);
                setVisibleCupom(false);
                Cupom(inputText);
              }}
              closeDialog={() => {
                setVisibleCupom(false);
              }}
            />
          </View>
          <View style={{ height: "33.33%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginHorizontal: 20,
              }}
            >
              <View>
                <Text style={{ marginBottom: 15 }}>Produtos</Text>
                {desconto != 0 && desconto != "0,00" ? (
                  <>
                    <Text style={{ marginBottom: 15 }}>Desconto </Text>
                  </>
                ) : (
                  <></>
                )}
                <Text style={{ marginBottom: 15 }}>Frete</Text>
              </View>
              <View>
                <NumberFormat
                  value={valorTotal + ",00,0"}
                  displayType="text"
                  thousandSeparator
                  prefix="R$ "
                  renderText={(value) => (
                    <Text style={{ marginBottom: 15 }}>
                      {value.length > 11
                        ? value
                            .replace(",", ".")
                            .substring(0, value.length - 1)
                            .replace("-", "")
                        : value.substring(0, value.length - 1).replace("-", "")}
                    </Text>
                  )}
                />
                {desconto != 0 && desconto != "0,00" ? (
                  <Text style={{ marginBottom: 15 }}>R$ -{desconto}</Text>
                ) : (
                  <></>
                )}
                <Text style={{ marginBottom: 15 }}>
                  {valorFrete === "R$ 0,00" ? "Grátis" : valorFrete}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              <Text>Total</Text>
              <NumberFormat
                value={total + ",0"}
                displayType="text"
                thousandSeparator
                prefix="R$ "
                renderText={(value) => (
                  <Text style={{ fontSize: 20 }}>
                    {value.length > 11
                      ? value
                          .replace(",", ".")
                          .substring(0, value.length - 1)
                          .replace("-", "")
                      : value.substring(0, value.length - 1).replace("-", "")}
                  </Text>
                )}
              />
            </View>
            <View>
              {console.log(pagSelect, xparcela2, xparcela)}
              <TouchableOpacity
                style={{
                  backgroundColor:
                    pagSelect === null
                      ? "#e4e4e4"
                      : pagSelect === "pagamento_um_cartao" &&
                        cartao !== undefined &&
                        cartao2 === undefined
                      ? "#9BCB3D"
                      : pagSelect === "pagamento_dois_cartoes" &&
                        xparcela2 !== undefined &&
                        xparcela !== undefined
                      ? "#9BCB3D"
                      : pagSelect === "boleto_bradesco"
                      ? "#9BCB3D"
                      : "#e4e4e4",
                  borderRadius: 5,
                  padding: 20,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  marginBottom: 10,
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
                disabled={
                  pagSelect === null
                    ? true
                    : pagSelect === "pagamento_um_cartao" &&
                      cartao !== undefined &&
                      cartao2 === undefined
                    ? false
                    : pagSelect === "pagamento_dois_cartoes" &&
                      xparcela2 !== undefined &&
                      xparcela !== undefined
                    ? false
                    : pagSelect === "boleto_bradesco"
                    ? false
                    : true
                }
                onPress={() =>
                  navigation.navigate("Revisão", {
                    endereco: endereco,
                    cart: cart,
                    valorTotal: total,
                    pagSelect: pagSelect,
                    valorGeral: valorGeral,
                    frete: value,
                    cartao: cartao,
                    cartao2: cartao2,
                    endereco: endereco,
                    codParcela: codParcela,
                    codParcela2: codParcela2,
                    xparcela: xparcela,
                    xparcela2: xparcela2,
                    CVV: CVV,
                    CVV2,
                    vpacelas: vpacelas,
                    vpacelas2: vpacelas2,
                  })
                }
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Prosseguir para resumo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <FlatList
          data={data2}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={10}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <View
              style={{
                backgroundColor: "#FFF",
              }}
            >
              <View
                style={{
                  height: 2,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                  borderRadius: 20,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 20,
                  width: "100%",
                  paddingVertical: 20,
                }}
              >
                <Image
                  style={{ width: 100, height: 100, marginRight: 10 }}
                  source={{ uri: item.imagem }}
                />
                <View style={{ maxWidth: "60%" }}>
                  <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
                  <Text style={{ fontSize: 10 }}> CÓD - {item.sku} </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#1534C8",
                      fontSize: 20,
                    }}
                  >
                    R$ {Number(item.valorUnitario)},00
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              <View
                style={{
                  backgroundColor: "#9BCB3D",
                  zIndex: 1,
                  height: 5,
                  width: "40%",
                }}
              />
              <View
                style={{
                  paddingVertical: 30,
                  paddingHorizontal: "10%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-around",
                  backgroundColor: "#FFF",
                }}
              >
                <Image
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  source={require("../Components/assets/entrega.png")}
                />
                <Text style={{ fontSize: 18 }}>
                  {" "}
                  Selecione a forma de entrega{" "}
                </Text>
                <View style={{ width: 30, height: 30 }} />
              </View>
              <View
                style={{
                  height: 2,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                }}
              />
              <View
                style={{
                  paddingVertical: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-around",
                  backgroundColor: "#FFF",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6A7075",
                    }}
                  >
                    {" "}
                    Endereço de Entrega{" "}
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {" "}
                    {data.endereco}, {data.numero}{" "}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.goBack({
                      endereco: endereco,
                      cart: cart,
                      valorTotal: total,
                      pagSelect: pagSelect,
                      valorGeral: valorGeral,
                      frete: value,
                    })
                  }
                >
                  <Text style={{ fontSize: 13, color: "#1534C8" }}>
                    {"Alterar >"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 2,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                }}
              />
            </>
          )}
          ListFooterComponent={() => (
            <FlatList
              data={data3}
              keyExtractor={(item, index) => index}
              initialNumToRender={3}
              renderItem={({ item, index }) => (
                <View>
                  {item.descricao === null ? (
                    <View
                      style={{
                        margin: 20,
                        padding: 10,
                        alignItems: "center",
                        backgroundColor: "#ff5454",
                        borderRadius: 10,
                      }}
                    >
                      <Text>{"Indisponivel para esse CEP"}</Text>
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          marginHorizontal: 10,
                          backgroundColor:
                            selected === index ? "#D3EDEC" : "#F8F9FA",
                          borderRadius: 15,
                          flexDirection: "row",
                          marginBottom: 15,
                        }}
                        onPress={() => {
                          setValue(JSON.stringify(item));
                          setSelected(index);
                        }}
                      >
                        <View
                          style={{ justifyContent: "center", marginRight: 10 }}
                        >
                          {selected === index ? (
                            <Image
                              style={{ width: 20, height: 20 }}
                              source={require("../Components/assets/selected.png")}
                            />
                          ) : (
                            <Image
                              style={{ width: 20, height: 20 }}
                              source={require("../Components/assets/selecte.png")}
                            />
                          )}
                        </View>

                        <View style={{ width: "95%" }}>
                          <Text>Via {item.descricao}</Text>
                          <Text style={{ fontWeight: "bold" }}>
                            {item.valor == "R$ 0,00"
                              ? "Frete Grátis"
                              : item.valor}
                            {
                              (setFreteN(
                                item.valor
                                  .replace("R$ ", "")
                                  .replace(".", "")
                                  .replace(/,[0-9][0-9]/g, "")
                              ),
                              setCetsFrete(
                                item.valor
                                  .replace("R$ ", "")
                                  .replace(/[0-9].[0-9][0-9][0-9],/g, "")
                                  .replace(/[0-9][0-9][0-9],/g, "")
                                  .replace(/[0-9][0-9],/g, "")
                                  .replace(/[0-9],/g, "")
                              ),
                              selected === index ? (
                                setvalorFrete(item.valor)
                              ) : (
                                <></>
                              ))
                            }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
              ListFooterComponent={() => (
                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        selected === null ? "#E4E4E4" : "#9BCB3D",
                      borderRadius: 5,
                      padding: 20,
                      paddingHorizontal: 15,
                      alignItems: "center",
                      marginBottom: 10,
                      marginTop: 20,
                      marginHorizontal: 20,
                    }}
                    disabled={selected === null ? true : false}
                    onPress={() => {
                      setPagamento(true), Pagamento();
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      Prossegir para pagamento
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            />
          )}
          ListFooterComponentStyle={{ marginVertical: 30 }}
        />
      )}
    </View>
  );
}
