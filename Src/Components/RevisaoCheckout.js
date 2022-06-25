import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import NumberFormat from "react-number-format";
export default function RevisaoCheckout({ route, navigation }) {
  const {
    endereco,
    cart,
    valorTotal,
    valorGeral,
    frete,
    pagSelect,
    codParcela,
    codParcela2,
    rota,
    cartao,
    cartao2,
    xparcela,
    xparcela2,
    vpacelas,
    vpacelas2,
  } = route.params;

  const [data2, setData2] = useState(JSON.parse(cart));
  const [data, setData] = useState(JSON.parse(endereco));
  const [dataFrete, setDatafrete] = useState(JSON.parse(frete));
  const CHAVE_API = "m7RNi13C1RbmbZs9T1GlXuKMc5AxUIqU";
  return (
    <View>
      <FlatList
        data={data2}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                backgroundColor: "#9BCB3D",
                zIndex: 1,
                height: 5,
                width: "80%",
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
                source={require("../Components/assets/resumo.png")}
              />
              <Text style={{ fontSize: 18 }}> Revise seu pedido </Text>
              <View style={{ width: 30, height: 30 }} />
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
        ListFooterComponent={() => (
          <>
            <View
              style={{
                height: 4,
                backgroundColor: "#CED4DA",
                width: "100%",
                borderRadius: 20,
              }}
            />
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20,

                width: "100%",

                backgroundColor: "#FFF",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#6A7075",
                  }}
                >
                  Endereço de Entrega
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Endereços", {
                      rota: "carrinho",
                      cart: cart,
                      valorTotal: valorGeral,
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
                  padding: 20,
                  backgroundColor: "#F8F9FA",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 3 }}>
                  {data.endereco}, {data.numero} - {data.bairro}
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 3 }}>
                  {data.cidade}
                  {"/"}
                  {data.estado}
                  {" - CEP: "}
                  {data.cep}
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 3 }}>
                  {"Destinatário: "}
                  {data.nome}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#6A7075",
                  }}
                >
                  Forma de Entrega
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.push("Checkout", {
                      rota: "carrinho",
                      cart: cart,
                      endereco: endereco,
                      valorTotal: valorGeral,
                      valorGeral: valorGeral,
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
                  backgroundColor: "#F8F9FA",
                  borderRadius: 10,
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ padding: 20, width: "70%" }}>
                  <Text style={{ fontSize: 15, marginBottom: 3 }}>
                    {"Via: "}
                    {dataFrete.descricao}
                  </Text>
                  <Text style={{ fontSize: 15, marginBottom: 3 }}>
                    {"Receba "}
                    {dataFrete.prazo}
                  </Text>
                </View>
                <View style={{ padding: -20, width: "100%" }}>
                  <Text
                    style={{
                      color: "#1534C8",
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
                  >
                    {dataFrete.valor === "R$ 0,00"
                      ? "Frete Grátis"
                      : dataFrete.valor}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#6A7075",
                  }}
                >
                  Forma de pagamento
                </Text>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ fontSize: 13, color: "#1534C8" }}>
                    {"Alterar >"}
                  </Text>
                </TouchableOpacity>
              </View>
              {pagSelect === "boleto_bradesco" ? (
                <View
                  style={{
                    backgroundColor: "#F8F9FA",
                    borderRadius: 10,
                    marginTop: 10,
                    paddingHorizontal: 30,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      tintColor: "#1534C8",
                    }}
                    source={require("../Components/assets/boleto.png")}
                  />
                  <View style={{ width: "80%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      Boleto bancário
                    </Text>
                    <Text>
                      O boleto será enviado para o seu e-mail no fechamento do
                      pedido.
                    </Text>
                  </View>
                </View>
              ) : pagSelect === "pagamento_um_cartao" ? (
                <View>
                  <View
                    style={{
                      backgroundColor: "#E9ECEF",
                      borderRadius: 10,
                      height: 100,
                      marginVertical: 10,
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
                          {xparcela}x de {vpacelas.replace(" s/ juros", "")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      backgroundColor: "#E9ECEF",
                      borderRadius: 10,
                      height: 90,
                      marginVertical: 5,
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
                              margin: 10,
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
                            width: 100,
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
                              margin: 10,
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
                            width: 100,
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
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <View>
                  <Text style={{ marginBottom: 10 }}>Produtos</Text>
                  <Text style={{ marginBottom: 10 }}>Frete</Text>
                </View>
                <View>
                  <Text style={{ marginBottom: 10 }}>R$ {valorGeral},00</Text>
                  <Text style={{ marginBottom: 10 }}>
                    {dataFrete.valor === "R$ 0,00" ? "Grátis" : dataFrete.valor}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                  borderRadius: 20,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text>Total do pedido</Text>
                  <View style={{ marginTop: 10 }}>
                    {pagSelect === "pagamento_um_cartao" ? (
                      <Text>Parcelas</Text>
                    ) : pagSelect === "pagamento_dois_cartoes" ? (
                      <>
                        <Text style={{ fontSize: 11 }}>
                          Parcelas (cartão 1)
                        </Text>
                        <Text style={{ fontSize: 11 }}>
                          Parcelas (cartão 2)
                        </Text>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
                <View>
                  <NumberFormat
                    value={valorTotal.replace("-", "") + ",0"}
                    displayType="text"
                    thousandSeparator
                    prefix="R$ "
                    renderText={(value) => (
                      <Text
                        style={{
                          fontSize: 20,
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
                  <View style={{ marginTop: 10 }}>
                    {pagSelect === "pagamento_um_cartao" ? (
                      <Text>
                        {xparcela}x de {vpacelas.replace(" s/ juros", "")}
                      </Text>
                    ) : pagSelect === "pagamento_dois_cartoes" ? (
                      <>
                        <Text style={{ fontSize: 11 }}>
                          {xparcela}x de {vpacelas.replace(" s/ juros", "")}
                        </Text>
                        <Text style={{ fontSize: 11 }}>
                          {xparcela2}x de {vpacelas2.replace(" s/ juros", "")}
                        </Text>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#9BCB3D",
                  borderRadius: 5,
                  padding: 20,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  marginBottom: 10,
                  marginTop: 20,
                }}
                onPress={() => {}}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Finalizar compra
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </View>
  );
}
