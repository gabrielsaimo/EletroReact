import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AuthContext } from "../../Contexts/Auth";

export default function CarrinhoTab({ route }) {
  const { Campra, user1, arrayCompra } = useContext(AuthContext);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(false);

  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const renderItem = (item) => {
    <Text>{item}</Text>;
  };
  const renderHiddenItem = (item, rowMap) => (
    <>
      {load ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          marginLeft="auto"
          marginRight="auto"
        />
      ) : (
        <TouchableOpacity
          onPress={() => [setLoad(true), deleteRow(rowMap, item.index)]}
          style={{
            alignItems: "center",
            marginTop: 10,
            marginLeft: "1%",
            height: 100,
            width: "98%",
            flexDirection: "row",
            backgroundColor: "#FE0202",
            justifyContent: "flex-end",
            borderRadius: 10,
          }}
        >
          <Image
            style={{ width: 45, height: 45, marginRight: 10 }}
            source={require("../../../Src/Components/assets/delete_icon.png")}
          ></Image>
        </TouchableOpacity>
      )}
    </>
  );
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#FFF" }}>
      
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ margin: 15 }}
        >
          <SwipeListView
            data={arrayCompra}
            disableRightSwipe={true}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            previewRowKey={index}
            previewOpenValue={-75}
            rightOpenValue={-75}
          />
          {console.log(arrayCompra)}
        </ScrollView>
     
        <>
          <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 7 }} />

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                alignSelf: "center",
                marginLeft: 10,
                backgroundColor: "#EDF2FF",
                borderRadius: 100,
                width: 75,
                height: 75,
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 55,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginVertical: 10,
                }}
                source={require("../assets/carrinho.png")}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Seu carrinho está vazio
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginHorizontal: 55,
                  textAlign: "center",
                  marginTop: "5%",
                }}
              >
                Oque voce acha de aprovetar as melhores ofertas na Eletrosom
              </Text>
              <Image
                style={{ height: "60%", width: "75%", marginTop: "15%" }}
                source={require("../assets/tela_vazia.png")}
              />
            </View>
          </View>
        </>
      
    </SafeAreaView>
  );
}
