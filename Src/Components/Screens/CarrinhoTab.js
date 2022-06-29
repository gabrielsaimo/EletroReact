import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { AuthContext } from "../../Contexts/Auth";
import { IconButton } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import { Snackbar } from "react-native-paper";
import NumberFormat from "react-number-format";
export default function MeusCartoes({ route }) {
  const { URL_PROD } = process.env;
  const navigation = useNavigation();
  const { user1, Compra, multcar, arrayCompra, Comprar, confiCompra } =
    useContext(AuthContext);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  console.log("🚀 ~ file: CarrinhoTab.js ~ line 28 ~ MeusCartoes ~ load", load);
  const [intervalo, setIntervalo] = useState(false);
  const isFocused = useIsFocused();
  const [visible, setVisible] = React.useState(false);
  const [cepvisible, setVisiblecep] = useState(false);
  const [TextInput_cep, setTextCep] = useState("");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  useEffect(() => {
    let isMounted = true;
    Meucarrinho();
    return () => {
      isMounted = false;
    };
  }, [Comprar, load, isFocused]);

  const Meucarrinho = () =>
    load === true ||
    TextInput_cep.length > 8 ||
    isFocused == true ||
    JSON.stringify(Comprar).length > 3
      ? fetch(`${URL_PROD}carrinho`, {
          method: "POST",
          headers: {
            Accept: "aplication/json",
            "Content-type": "aplication/json",
          },
          body: JSON.stringify({
            checkout: {
              produtos:
                JSON.stringify(Comprar).length > 2
                  ? JSON.stringify(Comprar)
                  : multcar,
              cep: TextInput_cep,
            },
            version: 15,
          })
            .replace(/[//\\]/g, "")
            .replace('"[', "[")
            .replace(']"', "]")
            .replace(/"}{"/g, '"},{"'),
        })
          .then((res) => res.json())
          .then((resData) => {
            setData(resData);
            setLoad(false);
            if (intervalo === true) {
              setIntervalo(false);
            }
            if (resData.retorno.frete[0].cep === "") {
              setVisiblecep(false);
            } else {
              setVisiblecep(true);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoad(false);
          })
      : {};

  function Clickcep() {
    cepvisible ? setVisiblecep(true) : setVisiblecep(false);
    if (TextInput_cep.length > 8) {
      Meucarrinho();
    } else {
      Alert.alert("Ops!", "Campo de CEP não preencido corretamente", [
        { text: "OK" },
      ]);
      setVisiblecep(false);
    }
  }
  function additem(sku) {
    setLoad(true);
    if (intervalo === false) {
      setIntervalo(true);
    }
    let array = JSON.parse(
      JSON.stringify(Comprar).length > 2
        ? JSON.stringify(Comprar)
        : multcar.replace(/"}{"/g, '"},{"')
    );
    const objIndex = array.findIndex((obj) => obj.sku == sku);
    array[objIndex].qtde = Number(array[objIndex].qtde) + 1;
    JSON.stringify(Comprar).length > 2
      ? confiCompra(
          undefined,
          undefined,
          undefined,
          JSON.stringify(array)
            .replace(array[objIndex].qtde + ",", array[objIndex].qtde)
            .replace(
              array[objIndex].qtde + '"k',
              '"' + array[objIndex].qtde + '","k'
            )
            .replace(/true,/g, "")
            .replace(/true/g, "")
            .replace(/"}{"/g, '"},{"')
        )
      : Compra(
          undefined,
          undefined,
          undefined,
          JSON.stringify(array)
            .replace(array[objIndex].qtde + ",", array[objIndex].qtde)
            .replace(
              array[objIndex].qtde + '"k',
              '"' + array[objIndex].qtde + '","k'
            )
            .replace(/true,/g, "")
            .replace(/true/g, "")
            .replace(/"}{"/g, '"},{"')
        );
  }
  function tiraitem(sku, qtd) {
    setLoad(true);
    if (intervalo === false) {
      setIntervalo(true);
    }

    let array = JSON.parse(
      JSON.stringify(Comprar).length > 2
        ? JSON.stringify(Comprar)
        : multcar.replace(/"}{"/g, '"},{"')
    );
    const objIndex = array.findIndex((obj) => obj.sku == sku);
    array[objIndex].qtde = Number(array[objIndex].qtde) - 1;

    JSON.stringify(Comprar).length > 2
      ? confiCompra(
          undefined,
          undefined,
          undefined,
          JSON.stringify(array)
            .replace(array[objIndex].qtde + ",", array[objIndex].qtde)
            .replace(
              array[objIndex].qtde + '"k',
              '"' + array[objIndex].qtde + '","k'
            )
            .replace(/true,/g, "")
            .replace(/true/g, "")
            .replace(/"}{"/g, '"},{"')
        )
      : Compra(
          undefined,
          undefined,
          undefined,
          JSON.stringify(array)
            .replace(array[objIndex].qtde + ",", array[objIndex].qtde)
            .replace(
              array[objIndex].qtde + '"k',
              '"' + array[objIndex].qtde + '","k'
            )
            .replace(/true,/g, "")
            .replace(/true/g, "")
            .replace(/"}{"/g, '"},{"')
        );
  }
  //! Excli qdt
  function removeitem(sku, qtd) {
    setLoad(true);
    if (intervalo === false) {
      setIntervalo(true);
    }
    let array = JSON.parse(
      JSON.stringify(Comprar).length > 2
        ? JSON.stringify(Comprar)
        : multcar.replace(/"}{"/g, '"},{"')
    );
    const objIndex = array.findIndex((obj) => obj.sku == sku);
    array[objIndex] = delete array[objIndex];
    JSON.stringify(Comprar).length > 2
      ? confiCompra(
          undefined,
          undefined,
          JSON.stringify(array)
            .replace(/true,/g, "")
            .replace(/true/g, "")
            .replace(/"}{"/g, '"},{"')
        )
      : Compra(
          undefined,
          undefined,
          JSON.stringify(array)
            .replace(/true,/g, "")
            .replace(/true/g, "")
            .replace(/"}{"/g, '"},{"')
        );
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", height: "100%" }}>
      <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }} />
      {load == false ? (
        <>
          {multcar !== "{}" &&
          multcar.length > 10 &&
          data.toString().length > 5 ? (
            <>
              <FlatList
                data={data.retorno.produtos}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={10}
                refreshing={load}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => (
                  <View style={{ backgroundColor: "#FFF", paddingBottom: 100 }}>
                    <View>
                      {cepvisible ? (
                        <></>
                      ) : (
                        <View>
                          <View
                            style={{
                              height: 2,
                              backgroundColor: "#CED4DA",
                              width: "100%",
                              borderRadius: 20,
                            }}
                          />
                          <View>
                            <Text
                              style={{
                                marginVertical: 5,
                                color: "#6A7075",
                                paddingLeft: 10,
                              }}
                            >
                              Calcule seu frete
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <TextInputMask
                              type="zip-code"
                              placeholder="Digite seu Cep"
                              onChangeText={(data) => {
                                data.length == 9 ? setTextCep(data) : {};
                              }}
                              keyboardType={"numeric"}
                              maxLength={9}
                              height={50}
                              borderWidth={1}
                              borderColor={"#A0A5AA"}
                              width={"75%"}
                              marginLeft={10}
                              backgroundColor={"#fff"}
                              paddingHorizontal={10}
                              borderRadius={5}
                              underlineColorAndroid="transparent"
                              value={TextInput_cep}
                            />
                            <IconButton
                              icon={require("../assets/pin_gps.png")}
                              disabled={intervalo}
                              onPress={() => Clickcep()}
                              activeOpacity={0.7}
                              style={{
                                width: 50,
                                height: 50,
                                marginTop: 0,
                                marginLeft: "4%",
                                paddingRight: 3,
                                backgroundColor: !intervalo
                                  ? "#FFDB00"
                                  : "#E4E4E4",
                                borderRadius: 5,
                              }}
                            />
                          </View>
                        </View>
                      )}

                      {cepvisible ? (
                        <>
                          {data.retorno.frete[0].cep != "" ? (
                            <>
                              {data.retorno.frete[0].codigoFrete === null ? (
                                <>
                                  <View
                                    style={{
                                      width: "90%",
                                      justifyContent: "center",
                                      marginVertical: 10,
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                      height: 50,
                                      alignItems: "center",
                                      backgroundColor: "#ff5454",
                                      borderRadius: 10,
                                    }}
                                  >
                                    <Text>{"Indisponivel para esse CEP"}</Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: "blue",
                                      marginLeft: 15,
                                      marginTop: 10,
                                    }}
                                    onPress={() =>
                                      !cepvisible
                                        ? [setVisiblecep(true), setTextCep("")]
                                        : [setVisiblecep(false), setTextCep("")]
                                    }
                                  >
                                    Alterar{">"}
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <View
                                    style={{
                                      height: 2,
                                      backgroundColor: "#CED4DA",
                                      width: "100%",
                                      borderRadius: 20,
                                    }}
                                  />
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      marginRight: 15,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        marginLeft: 15,
                                        marginTop: 10,
                                        fontSize: 20,
                                        color: "#6A7075",
                                      }}
                                    >
                                      CEP - {data.retorno.frete[0].cep}
                                    </Text>
                                    <Text
                                      style={{
                                        color: "blue",
                                        marginLeft: 15,
                                        marginTop: 10,
                                      }}
                                      onPress={() =>
                                        !cepvisible
                                          ? [
                                              setVisiblecep(true),
                                              setTextCep(""),
                                            ]
                                          : [
                                              setVisiblecep(false),
                                              setTextCep(""),
                                            ]
                                      }
                                    >
                                      Alterar{">"}
                                    </Text>
                                  </View>

                                  <View style={{ padding: 10 }}>
                                    <Text>{data.retorno.frete[0].prazo}</Text>
                                  </View>
                                </>
                              )}
                            </>
                          ) : (
                            <ActivityIndicator />
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </View>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#FFF",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        paddingTop: 10,
                      }}
                    >
                      <Text style={{ color: "#6A7075" }}>
                        Produtos (
                        {Object.keys(data.retorno.produtos).length === undefined
                          ? 0
                          : data.retorno.produtos.length}
                        ){" "}
                      </Text>
                      <Text style={{ fontWeight: "bold", color: "#6A7075" }}>
                        R$ {data.retorno.totalGeral},00
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#FFF",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ color: "#6A7075" }}>Frete</Text>
                      <Text style={{ fontWeight: "bold", color: "#6A7075" }}>
                        {data.retorno.frete[0].valor == "R$ 0,00" &&
                        data.retorno.frete[0].cep !== ""
                          ? "Grátis"
                          : data.retorno.frete[0].valor}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 2,
                        backgroundColor: "#CED4DA",
                        width: "95%",
                        marginHorizontal: "2.5%",
                        borderRadius: 20,
                      }}
                    />
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#FFF",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        paddingTop: 10,
                      }}
                    >
                      <Text style={{ color: "#6A7075" }}>Total</Text>
                      <NumberFormat
                        value={
                          parseFloat(
                            data.retorno.frete[0].valor
                              .replace(/R[$ ]/g, "")
                              .replace(".", "")
                          ) +
                          Number(data.retorno.totalGeral) +
                          (data.retorno.frete[0].valor != "R$ 0,00"
                            ? data.retorno.frete[0].valor
                                .replace(".", "")
                                .replace(/R[$ ]/g, "")
                                .replace(/ [0-9][0-9][0-9][0-9],/g, "")
                                .replace(/ [0-9][0-9][0-9],/g, "")
                                .replace(/ [0-9][0-9],/g, "")
                                .replace(/ [0-9],/g, "")
                            : data.retorno.frete[0].valor
                                .replace(/R[$ ]/g, "")
                                .replace(/ [0-9][0-9][0-9][0-9],/g, "")
                                .replace(/ [0-9][0-9][0-9],/g, "")
                                .replace(/ [0-9][0-9],/g, "")
                                .replace(/ [0-9],/g, "")
                          ).toString() +
                          ",0"
                        }
                        displayType="text"
                        thousandSeparator
                        prefix="R$ "
                        renderText={(value) => (
                          <Text
                            style={{
                              fontSize: 25,
                              color: "#1534C8",
                              fontWeight: "bold",
                            }}
                          >
                            {value.length > 11
                              ? value
                                  .replace(",", ".")
                                  .substring(0, value.length - 1)
                                  .replace("-", "")
                              : value
                                  .substring(0, value.length - 1)
                                  .replace("-", "")}
                          </Text>
                        )}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#9BCB3D",
                          padding: 15,
                          paddingHorizontal: 75,
                          borderRadius: 5,
                          marginVertical: 30,
                        }}
                        onPress={() => {
                          user1.idCliente != null
                            ? navigation.navigate("Endereços", {
                                rota: "carrinho",
                                cart: JSON.stringify(data.retorno.produtos),
                                valorTotal: data.retorno.totalGeral,
                                valorGeral: data.retorno.totalGeral,
                              })
                            : onToggleSnackBar();
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFF",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          Prosseguir para compra
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 50 }}>
                      <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        action={{
                          label: "Logar",
                          onPress: () =>
                            navigation.navigate("Login", { rota: "carrinho" }),
                        }}
                      >
                        Logue para prosseguir
                      </Snackbar>
                    </View>
                  </View>
                )}
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
                      ></Image>
                      <View style={{ maxWidth: "60%" }}>
                        <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
                        <Text style={{ fontSize: 10 }}> CÓD - {item.sku} </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#CED4DA",
                        width: "90%",
                        borderRadius: 20,
                        marginVertical: 10,
                        marginHorizontal: "5%",
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                      }}
                    >
                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        {item.quantidade <= 1 ? (
                          <TouchableOpacity
                            style={{
                              width: 40,
                              height: 40,
                              borderWidth: 1,
                              borderTopLeftRadius: 4,
                              borderBottomLeftRadius: 4,
                              marginRight: -1,
                              alignItems: "center",
                              borderColor: "#E5E5E5",
                            }}
                            disabled={intervalo}
                            onPress={() => removeitem(item.sku)}
                          >
                            <Image
                              style={{
                                width: 35,
                                height: 35,
                                tintColor: "red",
                              }}
                              source={require("../../../Src/Components/assets/delete_icon.png")}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{
                              width: 40,
                              height: 40,
                              borderWidth: 1,
                              borderTopLeftRadius: 4,
                              borderBottomLeftRadius: 4,
                              marginRight: -1,
                              alignItems: "center",
                              borderColor: "#E5E5E5",
                            }}
                            disabled={intervalo}
                            onPress={() => tiraitem(item.sku)}
                          >
                            <Text
                              style={{
                                fontSize: 28,
                                color: intervalo ? "#E4E4E4" : "#1534C8",
                                fontWeight: "bold",
                              }}
                            >
                              {"−"}
                            </Text>
                          </TouchableOpacity>
                        )}

                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            alignItems: "center",
                            borderColor: "#E5E5E5",
                          }}
                        >
                          <Text style={{ fontSize: 28 }}>
                            {item.quantidade}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={{
                            width: 40,
                            height: 40,
                            borderWidth: 1,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            alignItems: "center",
                            borderColor: "#E5E5E5",
                          }}
                          disabled={intervalo}
                          onPress={() => {
                            additem(item.sku, item.quantidade);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 28,
                              color: intervalo ? "#E4E4E4" : "#1534C8",
                            }}
                          >
                            {"+"}
                          </Text>
                        </TouchableOpacity>
                      </View>

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
                )}
              />
            </>
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
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}
