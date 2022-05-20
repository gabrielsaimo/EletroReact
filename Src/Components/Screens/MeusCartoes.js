import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusCartoes({ route, navigation }) {
  const id = route.params.idCliente;
  const { Cartao, arraycard } = useContext(AuthContext);

  const [data1, setData1] = useState(arraycard);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  console.log(data1);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const SearchBar = () => {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center" }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={"Meus Cartões"}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action />
      </Appbar.Header>
    );
  };
  useEffect(() => {
    setData1(arraycard);
  }, [refreshing, isFocused]);
  const go = async () => {};
  return (
    <View style={{ marginBottom: 70 }}>
      <SearchBar />
      <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }}></View>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ margin: 15 }}
      >
        <FlatList
          data={data1}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <View
              style={{
                paddingHorizontal: 10,
                marginVertical: 15,
                backgroundColor: "#F8F9FA",
                borderRadius: 25,
                height: 100,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <View>
                  <Image
                    style={[
                      {
                        marginVertical: 25,
                        marginRight: 30,
                      },
                      item.cod === "EL"
                        ? { width: 77, height: 28 }
                        : { width: 72, height: 45 },
                    ]}
                    source={
                      item.cod === "MC"
                        ? require("../../../Src/Components/assets/master_card.png")
                        : item.cod === "VI"
                        ? require("../../../Src/Components/assets/visa.png")
                        : item.cod === "AE"
                        ? require("../../../Src/Components/assets/american_express.png")
                        : item.cod === "DN"
                        ? require("../../../Src/Components/assets/diners.png")
                        : item.cod === "EL"
                        ? require("../../../Src/Components/assets/elo.png")
                        : item.cod === "HI"
                        ? require("../../../Src/Components/assets/hipercard.png")
                        : require("../../../Src/Components/assets/card_icon.png")
                    }
                  />
                </View>
                <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                  <Text
                    style={{ color: "#000", fontWeight: "bold", fontSize: 20 }}
                  >
                    {item.cardnome}
                  </Text>
                  <Text
                    style={{
                      color: "#6A7075",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {"**** **** **** "}
                    {item.numero.substring(15, 19)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("add_config_cartao", { idCliente: id })
          }
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#BAC8FF",
            height: 50,
            paddingVertical: 12,
            borderRadius: 5,
            marginBottom: 30,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#1534C8",
                fontWeight: "bold",
                fontSize: 30,
                marginTop: -13,
              }}
            >
              +{" "}
            </Text>
            <Text style={{ color: "#1534C8", fontWeight: "bold" }}>
              {" "}
              Adicionar cartão
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
