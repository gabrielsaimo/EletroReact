import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function CepCorreios({ cep, sku, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  console.log(sku);

  useEffect(() => {
    fetch("https://viacep.com.br/ws/" + cep + "/json/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error + " produtoFilhos.js"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 0 }}>
      {!data ? (
        <Text>cep invalido</Text>
      ) : (
        <View>
          <Text>{data.cep}</Text>
          <Text>{data.bairro}</Text>
          <Text>{data.localidade}</Text>
          <Text>{data.logradouro}</Text>
          <Text>{data.uf}</Text>
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
