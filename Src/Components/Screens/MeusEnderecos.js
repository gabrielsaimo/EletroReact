import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusEnderecos({ route }) {
  const id = route.params.idCliente;
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const enderecos = () => {
    try {
      fetch(
        "https://eletrosom.com/shell/ws/integrador/listaMeusEnderecos?idCliente=" +
          id +
          "&lista=Todos"
      )
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          setRefreshing(false);
        })
        .catch((error) => setRefreshing(true));
    } catch (error) {
      console.log("erro porem sem id" + error);
      if (e && id == null) {
        setError(e);
        console.log("aqui" + error);
      }
    }
  };
  useEffect(() => {
    enderecos();
  }, [refreshing]);

  return (
    <View style={{ marginTop: 50 }}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ margin: 15 }}
      >
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <View
              style={{
                paddingHorizontal: 10,
                paddingBottom: 20,
                marginVertical: 20,
                backgroundColor: "#F8F9FA",
              }}
            >
              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "#1534C8", fontWeight: "bold" }}>
                  {item.nomeEndereco}
                </Text>

                <Text
                  onPress={() => console.log(item.idEndereco)}
                  style={{
                    position: "absolute",
                    marginLeft: 300,
                    color: "#1534C8",
                    fontWeight: "bold",
                  }}
                >
                  Editar
                </Text>
              </View>
              <Text>
                {item.endereco}, {item.numero}, {item.complemento}
              </Text>
              <Text>Bairro: {item.bairro}</Text>
              <Text>
                {item.cidade}/{item.estado} - {item.cep}
              </Text>
              <Text>Destinatário: {item.nome}</Text>
            </View>
          )}
        ></FlatList>
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor:'#BAC8FF',
            height: 50,
            paddingVertical: 12,
            borderRadius: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#1534C8",
                fontWeight: "bold",
                fontSize: 30,
                marginTop: -13,
              }}
            >
              +{" "}
            </Text>
            <Text style={{ color: "#1534C8", fontWeight: "bold" }}>
              {" "}
              Adicionar endereco{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
