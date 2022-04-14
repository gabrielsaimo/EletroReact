import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function App({ sku, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const onClick = (item, close) => {
    item !== null
      ? navigation.navigate("Produto", {
          sku: item.sku,
          filhos: item.voltagem.value,
        })
      : navigation.navigate("Produto", {
          close: close,
        });
    // Or whatever unique identifier you have in your items
    console.log(close);
  };
  useEffect(() => {
    fetch(
      "https://eletrosom.com/shell/ws/integrador/detalhaProdutos?sku=" +
        sku +
        "&version=15"
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
            data={data.filhos}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <View>
                {item.stock > 0 ? (
                  <TouchableOpacity onPress={() => onClick(item)}>
                    <View
                      style={{
                        width: 100,
                        height: 50,
                        backgroundColor: "#FFF",
                        alignSelf: "center",
                        borderRadius: 5,
                        marginHorizontal: 1,
                        borderWidth: 2,
                        borderColor: "blue",
                      }}
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
          <TouchableOpacity
            style={style.btn}
            onPress={() => onClick(null, false)}
          >
            <Text style={{ color: "#fff" }}>Fechar</Text>
          </TouchableOpacity>
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
