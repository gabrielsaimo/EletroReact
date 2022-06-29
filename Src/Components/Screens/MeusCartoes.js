import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusCartoes({ route, navigation }) {
  const {
    endereco,
    cart,
    valorTotal,
    valorGeral,
    valor,
    rota,
    total,
    tipo,
    pagSelect,
    codParcela,
    xparcela,
    vpacelas,
    cartao,
    CVV,
    valorc1,
    resto,
  } = route.params;
  console.log("🚀 ~ file: MeusCartoes.js ~ line 39 ~ MeusCartoes ~ route.params", route.params)
  const { Cartao, user1, arraycard } = useContext(AuthContext);
  const [alterar, setAlteradata] = useState(false);
  const [data1, setData1] = useState([]);
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(false);
  data1.map((i, _) => {
    if (index < i.key) {
      var ii = i.key;
      setIndex(ii.toString());
    }
  });
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, [resto]);

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newdata = data1.splice(rowKey, 1);
    [setData1(newdata), Cartao("1", "2", "3", "4", "5", data1)];
  };
  const renderItem = (item) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        rota === "chekout"
          ? navigation.navigate("Parcelas", {
              cartao: JSON.stringify(item),
              tipo: tipo,
              valor: valor,
              total: total,
              endereco: endereco,
              pagSelect: pagSelect,
              cart: cart,
              valorTotal: valorTotal,
              valorGeral: valorGeral,
            })
          : navigation.navigate("Parcelas", {
              cartao: cartao,
              tipo: tipo,
              valor: valor,
              total: total,
              endereco: endereco,
              pagSelect: pagSelect,
              cart: cart,
              valorTotal: valorTotal,
              valorGeral: valorGeral,
              cvv1: CVV,
              valorc01: valorc1,
              cartao1: rota === "parcela" ? "1" : "0",
              resto: resto.toString(),
              codParcela: codParcela,
              xparcela: xparcela,
              vpacelas: vpacelas,
              cartao2: JSON.stringify(item),
            })
      }
    >
      {load ? (
        <View style={{ height: 101, marginVertical: 10 }} />
      ) : item.item.idcliente === user1.idCliente ? (
        <View
          style={{
            backgroundColor: "#E9ECEF",
            borderRadius: 10,
            height: 100,
            marginVertical: 10,
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
                  item.item.cod === "EL"
                    ? { width: 77, height: 28 }
                    : item.item.cod === undefined
                    ? { width: 70, height: 49 }
                    : { width: 72, height: 45 },
                ]}
                source={
                  item.item.cod === "MC"
                    ? require("../../../Src/Components/assets/master_card.png")
                    : item.item.cod === "VI"
                    ? require("../../../Src/Components/assets/visa.png")
                    : item.item.cod === "AE"
                    ? require("../../../Src/Components/assets/american_express.png")
                    : item.item.cod === "DN" ||
                      item.item.numero.substring(0, 2) === "30" ||
                      item.item.numero.substring(0, 2) === "36" ||
                      item.item.numero.substring(0, 2) === "38"
                    ? require("../../../Src/Components/assets/diners.png")
                    : item.item.cod === "EL"
                    ? require("../../../Src/Components/assets/elo.png")
                    : item.item.cod === "HI" ||
                      item.item.numero.substring(0, 4) === "6062"
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
                {item.item.numero.substring(0, 4) === "6062"
                  ? "Hipercard"
                  : item.item.numero.substring(0, 2) === "30" ||
                    item.item.numero.substring(0, 2) === "36" ||
                    item.item.numero.substring(0, 2) === "38"
                  ? "Diners"
                  : item.item.cardnome}
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
                {item.item.numero.substring(
                  item.item.numero.length - 4,
                  item.item.numero.length
                )}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );

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
          />
        </TouchableOpacity>
      )}
    </>
  );

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
    onRefresh;
    console.log(cartao);
    if (cartao != undefined) {
      var data_filter = arraycard.filter(function (i, n) {
        return i.numero !== JSON.parse(cartao).item.numero;
      });
      console.log(data_filter);
      setData1(data_filter);
    } else {
      setData1(arraycard);
    }
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, [refreshing, isFocused]);

  return (
    <View style={{ marginBottom: 70 }}>
      {rota === "chekout" || rota === "parcela" ? <></> : <SearchBar />}
      <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }}></View>

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ margin: 15 }}
      >
        <SwipeListView
          data={data1}
          disableRightSwipe={true}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          previewRowKey={index.toString()}
          previewOpenValue={-75}
          rightOpenValue={-75}
        />
        <TouchableOpacity
          onPress={() =>
            rota === "chekout" || rota === "parcela"
              ? navigation.navigate("Adicionar Cartão", {
                  idCliente: user1.idCliente,
                  rota: "Checkout",
                })
              : navigation.navigate("Add_config_cartao", {
                  idCliente: user1.idCliente,
                  rota: rota,
                })
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
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
