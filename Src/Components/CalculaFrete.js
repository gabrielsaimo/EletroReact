import { width } from "@fortawesome/free-solid-svg-icons/faClose";
import React, { useEffect, useState, useContext } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import CepCorreios from "./CepCorreios";
const { URL_PROD } = process.env;
export default function CalculaFrete({ cep, sku }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`${URL_PROD}consultaFrete?sku=${sku}&cep=${cep}&version=18`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error + " produtoFilhos.js"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 0 }}>
      {isLoading ? (
        <View
          style={{
            width: width,
            height: 50,
            marginTop: 10,
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data}
          initialNumToRender={4}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <View>
              {!item ? (
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
                    {item.valor === "R$ 0,00" ? (
                      <Text style={{ color: "blue", fontSize: 20 }}>
                        Frete grátis
                      </Text>
                    ) : (
                      <Text style={{ color: "blue", fontSize: 20 }}>
                        Frete por {item.valor}
                      </Text>
                    )}
                  </View>
                  <View style={{ marginLeft: 15, marginRight: 15 }}>
                    <CepCorreios sku={sku} cep={cep} />
                    <Text style={{ marginVertical: 10 }}>
                      Via: {item.descricao}
                    </Text>
                    <Text>Prazo: {item.prazo}</Text>
                  </View>
                </View>
              )}
              <View
                style={{
                  height: 1.5,
                  backgroundColor: "#CED4DA",
                  width: "99%",
                  borderRadius: 20,
                  marginVertical: 10,
                }}
              ></View>
            </View>
          )}
        />
      )}
    </View>
  );
}
