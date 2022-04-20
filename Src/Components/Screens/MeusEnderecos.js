import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Appbar } from "react-native-paper";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusEnderecos({ route, navigation }) {
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
  const SearchBar = () => {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center" }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={"Meus endereços"}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action />
      </Appbar.Header>
    );
  };
  return (
    <View style={{ marginBottom: 70 }}>
      <SearchBar />
      <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }}></View>
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
                    marginLeft: "85%",
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
        onPress={()=>navigation.navigate("add_config_endereco")}
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#BAC8FF",
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

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    width: 300,
    fontSize: 16,
  },
  card2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    //justifyContent:'space-around'
  },
  texteletro: {
    fontSize: 30,
    color: "#1534C8",
    fontWeight: "bold",
    marginLeft: 3,
  },
  textponto: {
    fontSize: 30,
    color: "#FFDB00",
    fontWeight: "bold",
    marginLeft: 3,
  },
  textcom: {
    fontSize: 30,
    color: "#1534C8",
    marginLeft: 3,
  },
});
