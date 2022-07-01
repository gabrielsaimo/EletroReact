import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Linking,
  Clipboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
//import { AuthContext } from "../../Contexts/Auth";
const { URL_PROD } = process.env;
type route = {};
export default function Pedido({ route }) {
  const navigation = useNavigation();
  // const { user1 } = useContext(AuthContext);
  const baseURL = `${URL_PROD}listaMeusPedidos?incrementId=${route.params.id}&vesrsion=20`;
  const [data, setData] = useState([]);
  const [Pagamento, setPagamento] = useState("0");
  const [Faturado, setFaturado] = useState("0");
  const [EnvioTras, setEnvioTrans] = useState("0");
  const [Emtransito, setEmTransito] = useState("0");
  const [Entregue, setEntregue] = useState("0");
  async function Rest() {
    const response = await axios.get(`${baseURL}`);
    if (data.length < 1) {
      console.log("🚀 ~ file: Pedido.js ~ line 11 ~ data", [
        ...data,
        ...response.data,
      ]);
      setData([...data, ...response.data]);
    }
  }
  const [copiedText, setCopiedText] = useState("");
  const copyToClipboard = () => {
    Clipboard.setString(data[0].boleto_linha_digitavel);
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  function SearchBar() {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#2034C8", alignItems: "center", zIndex: 99 }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={"Detalhe do pedido"}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action />
      </Appbar.Header>
    );
  }

  useEffect(() => {
    Rest();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SearchBar />
      <FlatList
        data={data}
        initialNumToRender={5}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <View>
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              <>
                {data.map((i, k) => (
                  <>
                    {i.produtos.map((ii, kk) => (
                      <>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginHorizontal: 20,
                          }}
                        >
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            x{ii.qtde} {ii.nomeProduto}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10,
                          }}
                        >
                          <Text>
                            {"   "}
                            {i.edi.pedido_realizado.data_pedido}
                          </Text>
                          <Text>{" | "}</Text>
                          <Text># {data[0].incrementId}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <Text>{ii.precoUnitario}</Text>
                        </View>
                      </>
                    ))}

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginTop: 20,
                      }}
                    >
                      <View style={{ marginTop: 5, marginRight: 5 }}>
                        <View style={{ height: 65, alignItems: "center" }}>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 25,
                              backgroundColor: "#9BCB3D",
                              marginBottom: -1,
                              zIndex: 8,
                            }}
                          />
                          <View
                            style={{
                              marginTop: -14,
                              backgroundColor: "#FFF",
                              height: 10,
                              width: 10,
                              borderRadius: 25,
                              zIndex: 9,
                            }}
                          />
                          <View
                            style={{
                              width: 5,
                              height: 55,
                              backgroundColor:
                                Pagamento === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                            }}
                          />
                        </View>

                        <View style={{ height: 65, alignItems: "center" }}>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 25,
                              backgroundColor:
                                Pagamento === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                              marginBottom: -1,
                              zIndex: 8,
                            }}
                          />
                          {Pagamento === "concluido" ? (
                            <View
                              style={{
                                marginTop: -14,
                                backgroundColor: "#FFF",
                                height: 10,
                                width: 10,
                                borderRadius: 25,
                                zIndex: 9,
                              }}
                            />
                          ) : (
                            <></>
                          )}

                          <View
                            style={{
                              width: 5,
                              height: 55,
                              backgroundColor:
                                Faturado === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                            }}
                          />
                        </View>
                        <View style={{ height: 65, alignItems: "center" }}>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 25,
                              backgroundColor:
                                Faturado === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                              marginBottom: -1,
                              zIndex: 8,
                            }}
                          />
                          {Faturado === "concluido" ? (
                            <View
                              style={{
                                marginTop: -14,
                                backgroundColor: "#FFF",
                                height: 10,
                                width: 10,
                                borderRadius: 25,
                                zIndex: 9,
                              }}
                            />
                          ) : (
                            <></>
                          )}
                          <View
                            style={{
                              width: 5,
                              height: 55,
                              backgroundColor:
                                EnvioTras === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                            }}
                          />
                        </View>
                        <View style={{ height: 65, alignItems: "center" }}>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 25,
                              backgroundColor:
                                EnvioTras === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                              marginBottom: -1,
                              zIndex: 8,
                            }}
                          />
                          {EnvioTras === "concluido" ? (
                            <View
                              style={{
                                marginTop: -14,
                                backgroundColor: "#FFF",
                                height: 10,
                                width: 10,
                                borderRadius: 25,
                                zIndex: 9,
                              }}
                            />
                          ) : (
                            <></>
                          )}
                          <View
                            style={{
                              width: 5,
                              height: 55,
                              backgroundColor:
                                Emtransito === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                            }}
                          />
                        </View>
                        <View style={{ height: 65, alignItems: "center" }}>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 25,
                              backgroundColor:
                                Emtransito === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                            }}
                          />
                          {Emtransito === "concluido" ? (
                            <View
                              style={{
                                marginTop: -14,
                                backgroundColor: "#FFF",
                                height: 10,
                                width: 10,
                                borderRadius: 25,
                                zIndex: 9,
                              }}
                            />
                          ) : (
                            <></>
                          )}
                        </View>
                      </View>
                      <View>
                        <View style={{ height: 65 }}>
                          <View>
                            <Text style={{ fontSize: 18, color: "#9BCB3D" }}>
                              Pagamento
                            </Text>
                          </View>
                          <View>
                            {setPagamento(i.edi.pagamento.status)}
                            <Text>status: {i.edi.pagamento.status}</Text>
                            <Text>
                              {i.edi.pagamento.data_pedido}{" "}
                              {i.edi.pagamento.hora_pedido}
                            </Text>
                          </View>
                        </View>
                        <View style={{ height: 65 }}>
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color:
                                  Pagamento === "concluido"
                                    ? "#9BCB3D"
                                    : "#E4E4E4",
                              }}
                            >
                              Faturado
                            </Text>
                          </View>
                          <View>
                            {setFaturado(i.edi.faturado.status)}
                            <Text
                              style={{
                                color:
                                  Pagamento === "concluido"
                                    ? "#000"
                                    : "#E4E4E4",
                              }}
                            >
                              status: {i.edi.faturado.status}
                            </Text>
                            <Text
                              style={{
                                color:
                                  Pagamento === "concluido"
                                    ? "#000"
                                    : "#E4E4E4",
                              }}
                            >
                              {i.edi.faturado.data_pedido}{" "}
                              {i.edi.faturado.hora_pedido}
                            </Text>
                          </View>
                        </View>
                        <View style={{ height: 65 }}>
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color:
                                  Faturado === "concluido"
                                    ? "#9BCB3D"
                                    : "#E4E4E4",
                              }}
                            >
                              Envio transportadora
                            </Text>
                          </View>
                          <View>
                            {setEnvioTrans(i.edi.envio_transportadora.status)}
                            <Text
                              style={{
                                color:
                                  Faturado === "concluido" ? "#000" : "#E4E4E4",
                              }}
                            >
                              status: {i.edi.envio_transportadora.status}
                            </Text>
                            <Text
                              style={{
                                color:
                                  Faturado === "concluido" ? "#000" : "#E4E4E4",
                              }}
                            >
                              {i.edi.envio_transportadora.data_pedido}{" "}
                              {i.edi.envio_transportadora.hora_pedido}
                            </Text>
                          </View>
                        </View>
                        <View style={{ height: 65 }}>
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color:
                                  EnvioTras === "concluido"
                                    ? "#9BCB3D"
                                    : "#E4E4E4",
                              }}
                            >
                              Em transito
                            </Text>
                          </View>
                          <View>
                            {setEmTransito(i.edi.em_transito.status)}
                            <Text
                              style={{
                                color:
                                  EnvioTras === "concluido"
                                    ? "#000"
                                    : "#E4E4E4",
                              }}
                            >
                              status: {i.edi.em_transito.status}
                            </Text>
                            <Text
                              style={{
                                color:
                                  EnvioTras === "concluido"
                                    ? "#000"
                                    : "#E4E4E4",
                              }}
                            >
                              {i.edi.em_transito.data}
                            </Text>
                          </View>
                        </View>
                        <View style={{ height: 65 }}>
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                color:
                                  Emtransito === "concluido"
                                    ? "#9BCB3D"
                                    : "#E4E4E4",
                              }}
                            >
                              Entregue
                            </Text>
                          </View>
                          {setEntregue(i.edi.entregue.status)}
                          <Text
                            style={{
                              color:
                                Emtransito === "concluido"
                                  ? "#9BCB3D"
                                  : "#E4E4E4",
                            }}
                          >
                            {" "}
                            status:{i.edi.entregue.status}
                          </Text>
                          <Text>{i.edi.entregue.data}</Text>
                        </View>
                      </View>
                      <Text>{/*data[0].statusPagamento*/}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                      <Text>{"Endereço de Entrega"}</Text>
                    </View>
                    <View
                      style={{
                        margin: 10,
                        backgroundColor: "#E4E4E4",
                        padding: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                      }}
                    >
                      <View>
                        <Text>
                          {data[0].enderecoEntrega} {data[0].bairroEntrega}
                        </Text>
                        <Text>{data[0].cepEntrega}</Text>
                        <Text>{data[0].cidadeEntrega}</Text>
                      </View>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text>Forma de Entrega</Text>
                    </View>
                    <View
                      style={{
                        margin: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#E4E4E4",
                        paddingVertical: 10,
                        borderRadius: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text>{i.edi.descricao_transportadora}</Text>
                      </View>

                      <Text>
                        Frete:{" "}
                        {data[0].frete === "R$ 0,00" ? "Grátis" : data[0].frete}
                      </Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text>Forma de Pagmento</Text>
                    </View>
                    <View
                      style={{
                        margin: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#E4E4E4",
                        paddingVertical: 10,
                        borderRadius: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        {data[0].formaPagamento === "Cartão de Crédito" ? (
                          <Image
                            style={{
                              width: 80,
                              height: 80,
                              tintColor: "#1534C8",
                            }}
                            source={require("../assets/card_icon.png")}
                          />
                        ) : (
                          <Image
                            style={{
                              width: 80,
                              height: 80,
                              tintColor: "#1534C8",
                            }}
                            source={require("../assets/boleto.png")}
                          />
                        )}
                      </View>
                      <View>
                        <View>
                          <Text>{data[0].formaPagamento}</Text>
                          <Text>{data[0].totalPedido}</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        marginHorizontal: 15,
                        marginVertical: 20,
                      }}
                    >
                      <View>
                        <Text>Total do pedido</Text>
                      </View>
                      <View>
                        <Text>{data[0].totalPedido}</Text>
                      </View>
                    </View>

                    <View style={{ alignItems: "center", width: "100%" }}>
                      {data[0].boleto_linha_digitavel.length < 10 ? (
                        <></>
                      ) : (
                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "row",
                            backgroundColor: "#E4E4E4E4",
                            height: 50,
                            borderRadius: 10,
                          }}
                        >
                          <View>
                            <Text
                              selectable={true}
                              style={{
                                fontSize: 9,
                                color: "#000",
                                zIndex: 99,
                                paddingHorizontal: 5,
                              }}
                            >
                              {data[0].boleto_linha_digitavel}
                            </Text>
                          </View>

                          <View>
                            <TouchableOpacity
                              style={{
                                justifyContent: "center",
                                backgroundColor: "#1534C8",
                                borderRadius: 10,
                                paddingHorizontal: 5,
                                height: 40,
                                marginRight: 5,
                                alignItems: "center",
                                borderWidth: 2,
                                borderColor: "#FFDB00",
                              }}
                              onPress={() => copyToClipboard()}
                            >
                              <Text
                                style={{
                                  color: "#FFF",
                                  fontWeight: "bold",
                                  height: 30,
                                  fontSize: 18,
                                  paddingHorizontal: 5,
                                }}
                              >
                                Copiar
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}

                      {data[0].boleto_linha_digitavel.length < 10 ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#9BCB3D",
                            alignItems: "center",
                            paddingHorizontal: "30%",
                            paddingVertical: 15,
                            borderRadius: 10,
                            marginVertical: 10,
                          }}
                          onPress={() => {
                            Linking.openURL(data[0].linkBoleto);
                          }}
                        >
                          <Text
                            style={{
                              color: "#FFF",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Baixar Boleto
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                ))}
              </>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
// <Text>{data[0].desconto}</Text>
