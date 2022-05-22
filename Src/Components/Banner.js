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
const { URL_PROD } = process.env;
export default App = () => {
  const { width } = Dimensions.get("window");
  const height = (width * 40) / 95;
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
    fetch(`${URL_PROD}/shell/ws/integrador/banners/?version=15`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.error(error);
        setLoading(true);
      })
      .finally(() => setLoading(false));
  }, [isLoading]);

  return (
    <View style={{ flex: 0 }}>
      {isLoading ? (
        <View style={{ width, height }}>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      ) : (
        <View style={{ width, height, marginVertical: 20 }}>
          <FlatList
            horizontal
            pagingEnabled
            onScroll={change}
            showsHorizontalScrollIndicator={false}
            data={data.banners}
            keyExtractor={(item) => item.img}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 10 }}>
                <Image
                  style={{
                    width: Math.round(width - 20),
                    height,
                    resizeMode: "contain",
                    borderRadius: 5,
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
              bottom: -40,
              alignSelf: "center",
            }}
          >
            {data.banners ? (
              data.banners.map((i, k) => (
                <Text
                  key={k}
                  style={[
                    k == active ? styles.setbol : styles.bol,
                    { fontSize: 35, fontWeight: "bold" },
                  ]}
                >
                  ⚊
                </Text>
              ))
            ) : (
              <></>
            )}
          </View>
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
    color: "#0D71F0",
    margin: 3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
