import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function CepCorreios({ cep, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://viacep.com.br/ws/" + cep + "/json/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error + " produtoFilhos.js"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 0 }}>
      {isLoading ? (
        <View
          style={{
            marginTop: 10,
            width: 200,
            height: 100,
            alignSelf: "center",
          }}
        ></View>
      ) : (
        <View
          style={{
            marginTop: 30,
            width: 210,
            height: 100,
            alignSelf: "center",
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(key, index) => "key" + index}
            renderItem={({ item }) => (
              <View>
                {!item.erro ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Produto", {
                        cep: item.cep,
                        logradouro: item.logradouro,
                        bairro: item.bairro,
                        localidade: item.localidade,
                        uf: item.uf,
                      })
                    }
                  >
                    <View
                      style={{
                        width: 100,
                        height: 50,
                        backgroundColor: "#D4D4D4",
                        alignSelf: "center",
                        borderRadius: 5,
                        marginHorizontal: 1,
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          alignSelf: "center",
                          padding: 15,
                        }}
                      >
                        <View style={{ width: "100%", height: 50 }}>
                          <Text>{item.cep}</Text>
                          <Text>{item.logradouro}</Text>
                          <Text>{item.bairro}</Text>
                          <Text>{item.localidade}</Text>
                          <Text>{item.uf}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Text>Cep invalido</Text>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  bol: {
    color: "#D4D4D4",
    margin: 3,
  },
  setbol: {
    color: "#000",
    margin: 3,
  },
});
