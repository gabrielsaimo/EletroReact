import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, Text, View } from "react-native";
import axios from "axios";
import { Appbar } from "react-native-paper";
export default function Pedidos({ route, navigation }) {
  const id = route.params.idCliente;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApi();
  }, []);

  const baseURL =
    "https://www.eletrosom.com/shell/ws/integrador/listaMeusPedidos?version=15&idCliente=" +
    id;

  async function loadApi() {
    if (loading) return;
    setLoading(true);
    const response = await axios.get(`${baseURL}`);
    setData([...data, ...response.data]);
  }

  function SearchBar() {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center", zIndex: 99 }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={"Pedidos"} style={{ alignItems: "center" }} />
        <Appbar.Action />
      </Appbar.Header>
    );
  }
  return (
    <View style={{ marginBottom: 85 }}>
      <SearchBar />
      {data.length > 0 && data[0] !== null ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.incrementId}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity style={{ margin: 10 }}>
                <View>
                  <View style={{ position: "absolute", marginLeft: "75%" }}>
                    <Text>{item.dataPedido}</Text>
                  </View>
                  <Text>Pedido: {item.incrementId}</Text>
                </View>
                <View>
                  <Text>{item.statusPagamento}</Text>
                  <Text style={{ marginBottom: 20 }}>
                    {item.formaPagamento}
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    marginLeft: "65%",
                    marginTop: 60,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 20 }}>{item.totalPedido}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 3,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                }}
              ></View>
            </>
          )}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
}

/*
 */
