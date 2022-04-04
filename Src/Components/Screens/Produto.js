import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import axios from "axios";
import ModalFilhos from "../ModalFilhos";
import { Appbar,IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";
import Local from "../Local";
import Produtoimagem from "../ProdutoImagens";
import CalculaFrete from "../CalculaFrete";
export default function Produto({ route, navigation }) {
  const sku = route.params.sku;
  const filhos = route.params.filhos;
  const sku2 = route.params.sku2;
  const [precoDe, setprecoDe] = useState(route.params.precode);
  const [TextInput_cep, setTextCep] = useState("");
  const [cepvisible, setVisiblecep] = useState(false);
  const [modal, setModal] = useState(false);
  const { width } = Dimensions.get("window");
  const width2 = width / 2;
  const width4 = width / 4;
  const height = (width * 100) / 30;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  {
    sku2 === undefined ? (route.params.sku = sku) : (route.params.sku = sku2);
  }
  const baseURL =
    "https://eletrosom.com/shell/ws/integrador/detalhaProdutos?sku=" +
    route.params.sku +
    "&version=15";

  useEffect(() => {
    loadApi();
  }, [sku2]);

  async function loadApi() {
    if (loading) return;

    setLoading(true);

    const response = await axios.get(`${baseURL}`);
    setData([...data, ...response.data]);
  }
  const SearchBar = () => {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center" }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={"Detalhes"} style={{ alignItems: "center" }} />
        <Appbar.Action
          icon="cart-outline"
          onPress={() => navigation.popToTop()}
        />
      </Appbar.Header>
    );
  };

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <SearchBar />
      <Local />

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.codigo)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              alignItems: "baseline",
              margin: 10,
              height,
              paddingBottom: 100,
            }}
          >
            <View style={{ width: 80 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={!item.avaliacao ? 5 : item.avaliacao}
                starSize={15}
                fullStarColor={"#FEA535"}
                emptyStarColor={"#6A7075"}
              />
            </View>
            <Text
              numberOfLines={2}
              style={{ fontWeight: "bold", fontSize: 13, width: "100%" }}
            >
              {item.nome}
            </Text>
            <Text style={{ fontSize: 10, marginTop: 5 }}>
              CÓD - {item.codigo}
            </Text>
            <Produtoimagem sku={sku} urls={item.urlsocial}></Produtoimagem>
            {item.filhos ? (
              <TouchableOpacity onPress={() => setModal(true)}>
                <View
                  style={{
                    width: 200,
                    height: 40,
                    backgroundColor: "#F0F2F4",
                    borderRadius: 10,
                    flexDirection: "row",
                    padding: 10,
                    marginTop: 24,
                    marginBottom: 24,
                  }}
                >
                  <Text>Voltagem: {filhos}</Text>
                  <Text
                    style={{
                      paddingLeft: 180,
                      paddingTop: 10,
                      position: "absolute",
                    }}
                  >
                    {">"}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <Text
              style={{
                fontSize: 20,
                width: "100%",
                textDecorationLine: "line-through",
              }}
            >
              R$ {precoDe}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 35,
                width: "100%",
                color: "#1534C8",
              }}
            >
              R$ {item.precoPor}
            </Text>

            {item.formaPagamento ? (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14.5,
                  width: "100%",
                  color: "#1534C8",
                }}
              >
                {item.formaPagamento}
              </Text>
            ) : (
              <></>
            )}
            <View style={{marginTop:10}}>
              {cepvisible ? (
                <></>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    placeholder="Digite o Cep"
                    onChangeText={(data) => setTextCep(data)}
                    keyboardType={"numeric"}
                    maxLength={8}
                    height={40}
                    width={width2}
                    backgroundColor={"#D4D4D4"}
                    paddingHorizontal={5}
                    borderRadius={5}
                    underlineColorAndroid="transparent"
                  ></TextInput>
                  <IconButton
                  icon={require("../assets/pin_gps.png")}
                    onPress={() =>
                      !cepvisible ? setVisiblecep(true) : setVisiblecep(false)
                    }
                    activeOpacity={0.7}
                    style={{
                      width4,
                      height: 40,
                     marginTop:0,
                      backgroundColor: "#FFDB00",
                      borderRadius: 5,
                      
                    }}
                  >
                  
                  </IconButton>
                </View>
              )}

              {cepvisible ? (
                <Text
                style={{color:'blue'}}
                  onPress={() =>
                    !cepvisible ? setVisiblecep(true) : setVisiblecep(false)
                  }
                >
                Alterar endereço de entrega  {">"}
                </Text>
              ) : (
                <></>
              )}

              {cepvisible ? <CalculaFrete cep={TextInput_cep} sku={sku} /> : <></>}
            </View>

            <Text>Avaliações</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 70,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 50 }}>
                  {!data.avaliacao ? 5 : data.avaliacao}
                </Text>
              </View>
              <View style={{ width: 180, marginHorizontal: 10 }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={!data.avaliacao ? 5 : data.avaliacao}
                  starSize={25}
                  fullStarColor={"#FEA535"}
                  emptyStarColor={"#6A7075"}
                />
                <Text>1 Avaliações</Text>
              </View>
            </View>
          </View>
        )}
      />
      <ModalFilhos
        show={modal}
        sku={sku}
        navigate={navigator}
        navigation={navigation}
        close={() => setModal(false)}
      />
    </View>
  );
}

const styles = {
  buttonContainerStyle: {
    height: "100%",
    marginTop: 3,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  buttong: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#9BCB3D",
  },
  buttonw: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    marginTop: 10,
    width: 300,
    fontSize: 16,
  },
};
