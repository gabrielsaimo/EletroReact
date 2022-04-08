import React, { useEffect, useState, useContext } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar } from "react-native-paper";
export default function Pedidos({ route, navigation }) {
  const id = route.params.idCliente;

  console.log(id);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApi();
  }, []);

  const baseURL =
    "https://eletrosom.com/shell/ws/integrador/listaMeusPedidos?version=15&idCliente=" +
    id;

  async function loadApi() {
    if (loading) return;

    setLoading(true);

    const response = await axios.get(`${baseURL}`);
    setData([...data, ...response.data]);
    console.log(`${baseURL}`);
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
    <View>
      <SearchBar/>
      <FlatList
        data={data}
        keyExtractor={(item) => item.incrementId}
        renderItem={({ item }) => (
          <View>
            <Text>{item.incrementId}</Text>
            <Text>{item.dataPedido}</Text>
            <Text>{item.totalPedido}</Text>
            <Text>{item.formaPagamento}</Text>
            <Text>{item.statusPagameto}</Text>
          </View>
        )}
      />
    </View>
  );
}

/*
 */
