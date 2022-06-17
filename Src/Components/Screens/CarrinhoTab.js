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
} from "react-native";
import { AuthContext } from "../../Contexts/Auth";
import { IconButton } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusCartoes({ route }) {
  const { URL_PROD } = process.env;
  const navigation = useNavigation();
  const { Cartao, user, multcar, arrayCompra } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [cepvisible, setVisiblecep] = useState(false);
  const [usercep, setUsercep] = useState(user.cep);
  const [TextInput_cep, setTextCep] = useState(usercep);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(5000).then(() => {
      setTimeout(() => {
        setLoad(false);
      }, 3000);
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
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao carregar o carrinho"); //!
      });
  }

  useEffect(() => {
    onRefresh;
    Meucarrinho();
  }, [refreshing, isFocused, multcar, arrayCompra]);
  function Clickcep() {
    Meucarrinho();
    !cepvisible ? setVisiblecep(true) : setVisiblecep(false);
  }
  return (
    <SafeAreaView style={{ marginBottom: 70 }}>
      {console.log(data.length)}
      {console.log(data)}
      <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }} />
      {load == false ? (
        <>
          {multcar !== "{}" &&
          data.codigoMensagem != 325 &&
          data.retorno.totalGeral != 0 &&
          !load ? (
            <>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "#FFF", height: "120%" }}
              >
                <FlatList
                  data={data.retorno.produtos}
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={10}
                  refreshing={load}
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
                        ></Image>
                        <View style={{ maxWidth: "70%" }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {item.nome}
                          </Text>
                          <Text>{item.sku}</Text>
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
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderWidth: 1,
                              borderTopLeftRadius: 4,
                              borderBottomLeftRadius: 4,
                              marginRight: -1,
                              alignItems: "center",
                              borderColor: "#E5E5E5",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                color: "#1534C8",
                                fontWeight: "bold",
                              }}
                            >
                              {"−"}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderTopWidth: 1,
                              borderBottomWidth: 1,
                              alignItems: "center",
                              borderColor: "#E5E5E5",
                            }}
                          >
                            <Text style={{ fontSize: 18 }}>
                              {item.quantidade}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderWidth: 1,
                              borderTopRightRadius: 4,
                              borderBottomRightRadius: 4,
                              alignItems: "center",
                              borderColor: "#E5E5E5",
                            }}
                          >
                            <Text style={{ fontSize: 18, color: "#1534C8" }}>
                              {"+"}
                            </Text>
                          </View>
                        </View>

                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#1534C8",
                            fontSize: 20,
                          }}
                        >
                          R$ {item.valorUnitario.replace(/.0000/g, ",")}
                        </Text>
                      </View>
                    </View>
                  )}
                />
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
                          <TextInput
                            placeholder="Digite seu Cep"
                            onChangeText={(data) => setTextCep(data)}
                            keyboardType={"numeric"}
                            maxLength={8}
                            height={50}
                            borderWidth={1}
                            borderColor={"#A0A5AA"}
                            width={"75%"}
                            marginLeft={10}
                            backgroundColor={"#fff"}
                            paddingHorizontal={10}
                            borderRadius={5}
                            underlineColorAndroid="transparent"
                          >
                            {usercep !== undefined ? usercep : ""}
                          </TextInput>
                          <IconButton
                            icon={require("../assets/pin_gps.png")}
                            onPress={() => Clickcep()}
                            activeOpacity={0.7}
                            style={{
                              width: 50,
                              height: 50,
                              marginTop: 0,
                              marginLeft: "4%",
                              paddingRight: 3,
                              backgroundColor: "#FFDB00",
                              borderRadius: 5,
                            }}
                          ></IconButton>
                        </View>
                      </View>
                    )}

                    {cepvisible ? (
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
                                ? setVisiblecep(true)
                                : setVisiblecep(false)
                            }
                          >
                            Alterar{">"}
                          </Text>
                        </View>

                        <View style={{ padding: 10 }}>
                          <Text>Chega {data.retorno.frete[0].prazo}</Text>
                        </View>
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
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 30,
                        color: "#1534C8",
                      }}
                    >
                      R${" "}
                      {parseFloat(
                        data.retorno.frete[0].valor.replace(/R[$ ]/g, "")
                      ) + Number(data.retorno.totalGeral)}
                      ,
                      {data.retorno.frete[0].valor != "R$ 0,00"
                        ? data.retorno.frete[0].valor
                            .replace(/R[$ ]/g, "")
                            .replace(/ [0-9][0-9],/g, "")
                        : data.retorno.frete[0].valor
                            .replace(/R[$ ]/g, "")
                            .replace(/ [0-9],/g, "")}
                    </Text>
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
                        navigation.navigate("MeusEnderecos", {
                          rota: "carrinho",
                        });
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
                </View>
              </ScrollView>
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
