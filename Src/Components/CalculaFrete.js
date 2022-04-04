import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CepCorreios from "./CepCorreios";
export default function CalculaFrete({ cep, sku, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  console.log(cep);
  console.log(data);

  useEffect(() => {
    fetch(
      "https://eletrosom.com/shell/ws/integrador/consultaFrete?sku=" +
        sku +
        "&cep=" +
        cep
    )
      .then((response) => response.json())
      .then((json) => setData(json[0]))
      .catch((error) => console.error(error + " produtoFilhos.js"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 0 }}>
      {!data ? (
        <Text>cep invalido</Text>
      ) : (
        <View>
          <Text>{data.valor}</Text>
          <CepCorreios sku={sku} cep={cep} />
          <Text>{data.prazo}</Text>
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
