import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
const { URL_PROD } = process.env;
export default function Pedido({ route }) {
  const navigation = useNavigation();
  const baseURL = `${URL_PROD}listaMeusPedidos?incrementId=${route.params.id}&vesrsion=15`;
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: Pedido.js ~ line 11 ~ data", data);

  async function Rest() {
    const response = await axios.get(`${baseURL}`);
    setData([...data, ...response.data]);
  }
  function SearchBar() {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center", zIndex: 99 }}
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
    <SafeAreaView>
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
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                          }}
                        >
                          <Image></Image>
                          <Text>{ii.nomeProduto}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Text>{i.edi.pedido_realizado.data_pedido}</Text>
                          <Text>{" | "}</Text>
                          <Text>#{ii.sku}</Text>
                        </View>
                        <Text>Valor {ii.precoUnitario}</Text>
                        <Text>Qtd {ii.qtde}</Text>
                      </>
                    ))}

                    <View>
                      <Text>{data[0].statusPagamento}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text>{i.edi.em_transito.data}</Text>
                        <Text>{i.edi.em_transito.status}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>{i.edi.entregue.data}</Text>
                        <Text>{i.edi.entregue.status}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>{i.edi.envio_transportadora.data}</Text>
                        <Text>{i.edi.envio_transportadora.status}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>{i.edi.faturado.data}</Text>
                        <Text>{i.edi.faturado.status}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>{i.edi.pagamento.data}</Text>
                        <Text>{i.edi.pagamento.status}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>{i.edi.pedido_realizado.data_pedido}</Text>
                        <Text>{i.edi.pedido_realizado.hora_pedido}</Text>
                      </View>
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
                        <Text>{data[0].bairroEntrega}</Text>
                        <Text>{data[0].cepEntrega}</Text>
                        <Text>{data[0].cidadeEntrega}</Text>
                        <Text>{data[0].enderecoEntrega}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        margin: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#E4E4E4",
                        padding: 10,
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
                    <Text>{data[0].Pedido}</Text>
                    <Text>{data[0].linkBoleto}</Text>
                    <Text>{data[0].totalPedido}</Text>
                    <Text>{data[0].desconto}</Text>
                    <Text>{data[0].formaPagamento}</Text>
                    <Text>{data[0].boleto_linha_digitavel}</Text>
                    <Text>{data[0].incrementId}</Text>
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
