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
  const { Cartao, user1, arraycard, arrayCompra } = useContext(AuthContext);
  const [data1, setData1] = useState([]);
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(true);
  console.log(arrayCompra); /*
  arrayCompra.map((i, _) => {
    if (index < i.key) {
      var ii = i.key;
      setIndex(ii.toString());
    }
  });*/

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
  }, [isFocused]);

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newdata = data1.splice(rowKey, 1);
    [setData1(newdata), Cartao("1", "2", "3", "4", "5", data1)];
  };
  const renderItem = (item) => (
    <>
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
              style={{ width: 100, height: 100 }}
              source={{ uri: item.item.produtos[0].imagem }}
            />
          </View>
          <View style={{ marginTop: "auto", marginBottom: "auto",width:'100%' }}>
            <Text
              style={{
                color: "#343A40",
                fontWeight: "bold",
                fontSize: 12,
                width: "70%",
                marginLeft: 10,
              }}
            >
              {item.item.produtos[0].nome}
            </Text>
            <Text
              style={{
                color: "#1534C8",
                fontWeight: "bold",
                fontSize: 15,
                marginTop: 5,
                marginLeft: 10,
              }}
            >
              R$ {item.item.produtos[0].valorUnitario.replace("0000", "")}
            </Text>
          </View>
        </View>
      </View>
    </>
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
          ></Image>
        </TouchableOpacity>
      )}
    </>
  );

  useEffect(() => {
    onRefresh;
    setData1(arrayCompra);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, [refreshing, isFocused, arrayCompra]);

  return (
    <View style={{ marginBottom: 70 }}>
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
          previewRowKey={index}
          previewOpenValue={-75}
          rightOpenValue={-75}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("add_config_cartao", {
              idCliente: user1.idCliente,
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
            <Text style={{ color: "#1534C8", fontWeight: "bold" }}>
              {" "}
              Prosseguir para compra
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
