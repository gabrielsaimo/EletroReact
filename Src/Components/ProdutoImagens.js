import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
export default App = ({ sku }) => {
  const { width } = Dimensions.get("window");
  const height = width * 0.6;

  const [active, isActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      isActive(slide);
    }
  };
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
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 0 }}>
      {isLoading ? (
        <View style={{ marginTop: 10, width, height: 200 }}>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 10, width, height: 200 }}>
          <FlatList
            horizontal
            pagingEnabled
            onScroll={change}
            showsHorizontalScrollIndicator={false}
            data={data.imagem}
            keyExtractor={(item) => item.img}
            renderItem={({ item }) => (
              <View>
                <Image
                  style={{
                    width,
                    height: 200,
                    resizeMode: "contain",
                    backgroundColor: "#fff",
                  }}
                  key={item}
                  source={{ uri: item.img }}
                ></Image>
              </View>
            )}
          />

          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
            }}
          >
            {data.imagem.map? (data.imagem.map((i, k) => (
              <Text key={k} style={k == active ? styles.setbol : styles.bol}>
                ⬤
              </Text>
            ))):(<></>)}
          </View >
          
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  bol: {
    color: "#D4D4D4",
    margin: 3,
  },
  setbol: {
    color: "#000",
    margin: 3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
