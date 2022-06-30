import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, Text, View } from "react-native";
import axios from "axios";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const { URL_PROD } = process.env;
export default function Pedidos({ route }) {
  const id = route.params.idCliente;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApi();
  }, []);

  const baseURL = `${URL_PROD}listaMeusPedidos?version=15&idCliente=${id}`;

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
        <Appbar.Content
          title={"Lista de Pedidos"}
          style={{ alignItems: "center" }}
        />
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
          initialNumToRender={5}
          refreshing={loading}
          keyExtractor={(item) => item.incrementId}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() =>
                  navigation.navigate("Pedido", { id: item.incrementId })
                }
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <Text>Pedido: {item.incrementId}</Text>
                    <Text>{item.dataPedido}</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ marginBottom: 5 }}>
                    Status: {item.statusPagamento}
                  </Text>
                  <Text style={{ marginBottom: 5 }}>
                    Via: {item.formaPagamento}
                  </Text>
                </View>
                <View>
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <Text style={{ fontSize: 20 }}>{item.totalPedido}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                }}
              />
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
