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
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.filhos}
            keyExtractor={(key, index) => "key" + index}
            renderItem={({ item }) => (
              <View>
                {item.stock > 0 ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Produto", {
                        sku2: item.sku,
                        filhos: item.voltagem.value,
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
