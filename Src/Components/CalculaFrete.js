import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import CepCorreios from "./CepCorreios";
const { URL_PROD } = process.env;
export default function CalculaFrete({ cep, sku }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  console.log(cep);
  console.log(data);

  useEffect(() => {
    fetch(`${URL_PROD}/shell/ws/integrador/consultaFrete?sku=${sku}&cep=${cep}`)
      .then((response) => response.json())
      .then((json) => setData(json[0]))
      .catch((error) => console.error(error + " produtoFilhos.js"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 0 }}>
      {isLoading ? (
        <View style={{ height: 150 }}></View>
      ) : (
        <View>
          {!data ? (
            <Text>Cep Invalido</Text>
          ) : (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton
                  style={{ marginLeft: 0 }}
                  icon={require("../Components/assets/iconfrete.png")}
                  color="blue"
                  size={35}
                />
                {data.valor === "R$ 0,00" ? (
                  <Text style={{ color: "blue", fontSize: 20 }}>
                    Frete grátis
                  </Text>
                ) : (
                  <Text style={{ color: "blue", fontSize: 20 }}>
                    Frete por {data.valor}
                  </Text>
                )}
              </View>
              <View style={{ marginLeft: 15, marginRight: 15 }}>
                <CepCorreios sku={sku} cep={cep} />
                <Text style={{ marginVertical: 10 }}>
                  Prazo de entrega {data.prazo}
                </Text>
              </View>
            </View>
          )}
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
