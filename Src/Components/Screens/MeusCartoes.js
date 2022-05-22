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
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusCartoes({ route, navigation }) {
  const { user1, arraycard } = useContext(AuthContext);
  const id = user1.idCliente;
  const [data1, setData1] = useState(arraycard);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
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
            <>
              {item.idcliente.idCliente === user1.idCliente ? (
                <View
                  style={{
                    paddingHorizontal: 10,
                    marginVertical: 15,
                    backgroundColor: "#E9ECEF",
                    borderRadius: 10,
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
                            : item.cod === undefined
                            ? { width: 70, height: 49 }
                            : { width: 72, height: 45 },
                        ]}
                        source={
                          item.cod === "MC"
                            ? require("../../../Src/Components/assets/master_card.png")
                            : item.cod === "VI"
                            ? require("../../../Src/Components/assets/visa.png")
                            : item.cod === "AE"
                            ? require("../../../Src/Components/assets/american_express.png")
                            : item.cod === "DN" ||
                              item.numero.substring(0, 2) === "30" ||
                              item.numero.substring(0, 2) === "36" ||
                              item.numero.substring(0, 2) === "38"
                            ? require("../../../Src/Components/assets/diners.png")
                            : item.cod === "EL"
                            ? require("../../../Src/Components/assets/elo.png")
                            : item.cod === "HI" ||
                              item.numero.substring(0, 4) === "6062"
                            ? require("../../../Src/Components/assets/hipercard.png")
                            : require("../../../Src/Components/assets/card_icon.png")
                        }
                      />
                    </View>
                    <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                      <Text
                        style={{
                          color: "#343A40",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        {item.numero.substring(0, 4) === "6062"
                          ? "Hipercard"
                          : item.numero.substring(0, 2) === "30" ||
                            item.numero.substring(0, 2) === "36" ||
                            item.numero.substring(0, 2) === "38"
                          ? "Diners"
                          : item.cardnome}
                      </Text>
                      <Text
                        style={{
                          color: "#6A7075",
                          fontWeight: "bold",
                          fontSize: 15,
                          marginTop: 5,
                        }}
                      >
                        {"**** **** **** "}
                        {item.numero.substring(
                          item.numero.length - 4,
                          item.numero.length
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </>
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
