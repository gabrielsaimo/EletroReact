import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { URL_PROD } = process.env;
export default function App({ volt, sku, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const onClick = (item, close) => {
    var RandomNumber = Math.floor(Math.random() * 100) + 1;
    item !== null
      ? navigation.navigate("Produto", {
          sku2: item.sku,
          filhos: item.voltagem.value,
          key: Math.floor(Math.random() * 100) + 1,
        })
      : navigation.navigate("Produto", {
          close: close,
          key: RandomNumber,
        });
    // Or whatever unique identifier you have in your items
  };

  useEffect(() => {
    fetch(
      `${URL_PROD}detalhaProdutos?sku=${sku}&version=15`
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error + " produtoFilhos.js"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 0, alignItems: "center", marginTop: 10 }}>
      <Text style={{ fontSize: 20 }}>Selecione a voltagem</Text>
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
            height: 200,
            alignSelf: "center",
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={20}
            refreshing={isLoading} //! tirar se não for necessário
            data={data.filhos}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <View>
                {item.stock > 0 ? (
                  <TouchableOpacity onPress={() => onClick(item)}>
                    <View
                      style={[
                        item.voltagem.value === volt
                          ? { borderColor: "blue" }
                          : { borderColor: "gray" },
                        {
                          width: 100,
                          height: 50,
                          backgroundColor: "#FF",
                          alignSelf: "center",
                          borderRadius: 5,
                          marginHorizontal: 1,
                          borderWidth: 2,
                        },
                      ]}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          alignSelf: "center",
                          padding: 13,
                        }}
                      >
                        <View style={{ width: "100%", height: 50 }}>
                          <Text>{item.voltagem.value}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            )}
          />
          <TouchableOpacity></TouchableOpacity>
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
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#9b59b6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderColor: "rgba(0,0,0,0.5)",
  },
});
