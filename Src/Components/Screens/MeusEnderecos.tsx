import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
const { URL_PROD } = process.env;
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { Appbar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { AuthContext } from "../../Contexts/Auth";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function MeusEnderecos({ route, navigation }) {
  const { user1 } = useContext(AuthContext);
  const id = user1.idCliente;
  const { rota, cart, valorTotal, valorGeral } = route.params;
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const enderecos = async () => {
    try {
      await fetch(`${URL_PROD}listaMeusEnderecos?idCliente=${id}&lista=Todos`)
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          setRefreshing(false);
        })
        .catch((error) => setRefreshing(true));
    } catch (error) {
      setRefreshing(true);
      if (e && id == null) {
        setError(e);
        enderecos();
        console.log(error);
      }
    }
  };
  const deleteEndereco = async (id) => {
    try {
      await fetch(`${URL_PROD}excluirEndereco?idEndereco=${id}`)
        .then((res) => res.json())
        .then((resData) => {
          setRefreshing(true);
          setRefreshing(false);
        })
        .catch((error) => setRefreshing(true));
    } catch (error) {
      console.log("erro sem id" + error);
    }
  };
  useEffect(() => {
    enderecos();
  }, [refreshing, isFocused]);
  const SearchBar = () => {
    return (
      <Appbar.Header
        style={{ backgroundColor: "#1534C8", alignItems: "center" }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={"Meus endereços"}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action />
      </Appbar.Header>
    );
  };
  return (
    <View style={{ marginBottom: 70, backgroundColor: "#FFF", height: "100%" }}>
      {rota == "carrinho" ? (
        <View
          style={{
            backgroundColor: "#9BCB3D",
            zIndex: 1,
            height: 5,
            width: "20%",
          }}
        />
      ) : (
        <>
          <SearchBar />
          <View style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 5 }} />
        </>
      )}
      {rota == "carrinho" ? (
        <View>
          <View
            style={{
              paddingVertical: 30,
              paddingHorizontal: "10%",
              marginLeft: "auto",
              marginRight: "auto",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
              backgroundColor: "#FFF",
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/entrega.png")}
            />
            <Text style={{ fontSize: 18 }}>
              {" "}
              Selecione o edereço de entrega{" "}
            </Text>
            <View style={{ width: 30, height: 30 }} />
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: "#CED4DA",
              width: "100%",
            }}
          />
        </View>
      ) : (
        <></>
      )}
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {rota == "carrinho" ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            initialNumToRender={4}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingBottom: 15,
                  margin: 15,
                  backgroundColor:
                    selected === item.idEndereco ? "#D3EDEC" : "#F8F9FA",
                  borderRadius: 25,
                }}
                onPress={() => {
                  setValue(JSON.stringify(item));
                  setSelected(item.idEndereco);
                }}
              >
                <View style={{ marginVertical: 10, marginBottom: -30 }}>
                  <Text style={{ color: "#1534C8", fontWeight: "bold" }}>
                    {item.nomeEndereco}
                  </Text>
                </View>
                <MenuProvider>
                  <View>
                    <Menu style={{ alignSelf: "flex-end" }}>
                      <MenuTrigger>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            paddingBottom: 10,
                          }}
                        >
                          {"       "}⁞{"   "}
                        </Text>
                      </MenuTrigger>

                      <MenuOptions
                        optionsContainerStyle={{ width: 100 }}
                        style={{ margin: 5 }}
                      >
                        <MenuOption
                          onSelect={() =>
                            navigation.navigate(
                              rota == "carrinho"
                                ? "Adicionar Endereço"
                                : "Add_config_endereco",
                              {
                                idCliente: id,
                                idEndereco: item.idEndereco,
                                numero: item.numero,
                                cep: item.cep,
                                complemento: item.complemento,
                                telefone: item.telefone,
                                celular: item.celular,
                                nomeEndereco: item.nomeEndereco,
                                bairro: item.bairro,
                                estado: item.estado,
                                endereco: item.endereco,
                                cidade: item.cidade,
                              }
                            )
                          }
                        >
                          <View style={{ flexDirection: "row" }}>
                            <FontAwesomeIcon
                              marginTop={4}
                              size={18}
                              icon={faPenToSquare}
                              style={{ color: "#1534C8" }}
                            />
                            <Text
                              style={{
                                color: "#1534C8",
                                fontWeight: "bold",
                                marginLeft: 5,
                                fontSize: 18,
                              }}
                            >
                              Editar
                            </Text>
                          </View>
                        </MenuOption>

                        <MenuOption
                          onSelect={() => deleteEndereco(item.idEndereco)}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <FontAwesomeIcon
                              marginTop={4}
                              size={18}
                              icon={faTrashCan}
                              style={{ color: "red" }}
                            />
                            <Text
                              style={{
                                color: "red",
                                fontWeight: "bold",
                                marginLeft: 5,
                                fontSize: 18,
                              }}
                            >
                              Excluir
                            </Text>
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>

                  <Text>
                    {item.endereco}, {item.numero}, {item.complemento}
                  </Text>
                  <Text>Bairro: {item.bairro}</Text>
                  <Text>
                    {item.cidade}/{item.estado} - {item.cep}
                  </Text>
                  <Text>Destinatário: {item.nome}</Text>
                </MenuProvider>
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            initialNumToRender={4}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingBottom: 15,
                  marginVertical: 15,
                  backgroundColor: "#F8F9FA",
                  borderRadius: 25,
                  marginHorizontal: 20,
                }}
              >
                <View style={{ marginVertical: 10, marginBottom: -30 }}>
                  <Text style={{ color: "#1534C8", fontWeight: "bold" }}>
                    {item.nomeEndereco}
                  </Text>
                </View>
                <MenuProvider>
                  <View>
                    <Menu style={{ alignSelf: "flex-end" }}>
                      <MenuTrigger>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            paddingBottom: 10,
                          }}
                        >
                          {"       "}⁞{"   "}
                        </Text>
                      </MenuTrigger>

                      <MenuOptions
                        optionsContainerStyle={{ width: 100 }}
                        style={{ margin: 5 }}
                      >
                        <MenuOption
                          onSelect={() =>
                            navigation.navigate(
                              rota == "carrinho"
                                ? "Adicionar Endereço"
                                : "Add_config_endereco",
                              {
                                idCliente: id,
                                idEndereco: item.idEndereco,
                                numero: item.numero,
                                cep: item.cep,
                                complemento: item.complemento,
                                telefone: item.telefone,
                                celular: item.celular,
                                nomeEndereco: item.nomeEndereco,
                                bairro: item.bairro,
                                estado: item.estado,
                                endereco: item.endereco,
                                cidade: item.cidade,
                              }
                            )
                          }
                        >
                          <View style={{ flexDirection: "row" }}>
                            <FontAwesomeIcon
                              marginTop={4}
                              size={18}
                              icon={faPenToSquare}
                              style={{ color: "#1534C8" }}
                            />
                            <Text
                              style={{
                                color: "#1534C8",
                                fontWeight: "bold",
                                marginLeft: 5,
                                fontSize: 18,
                              }}
                            >
                              Editar
                            </Text>
                          </View>
                        </MenuOption>

                        <MenuOption
                          onSelect={() => deleteEndereco(item.idEndereco)}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <FontAwesomeIcon
                              marginTop={4}
                              size={18}
                              icon={faTrashCan}
                              style={{ color: "red" }}
                            />
                            <Text
                              style={{
                                color: "red",
                                fontWeight: "bold",
                                marginLeft: 5,
                                fontSize: 18,
                              }}
                            >
                              Excluir
                            </Text>
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>

                  <Text>
                    {item.endereco}, {item.numero}, {item.complemento}
                  </Text>
                  <Text>Bairro: {item.bairro}</Text>
                  <Text>
                    {item.cidade}/{item.estado} - {item.cep}
                  </Text>
                  <Text>Destinatário: {item.nome}</Text>
                </MenuProvider>
              </View>
            )}
          />
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              rota == "carrinho" ? "Adicionar Endereço" : "Add_config_endereco",
              { idCliente: id, rota: rota }
            )
          }
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#BAC8FF",
            height: 50,
            paddingVertical: 12,
            borderRadius: 5,
            marginBottom: 30,
            marginHorizontal: 20,
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
              Adicionar endereco{" "}
            </Text>
          </View>
        </TouchableOpacity>
        {rota == "carrinho" ? (
          <TouchableOpacity
            style={{
              backgroundColor: selected != null ? "#9BCB3D" : "#E4E4E4",
              borderRadius: 5,
              paddingVertical: 15,
              paddingHorizontal: 15,
              alignItems: "center",
              marginBottom: 30,
              marginHorizontal: 15,
            }}
            disabled={selected === null ? true : false}
            onPress={() => {
              navigation.navigate("Checkout", {
                endereco: value,
                cart: cart,
                valorTotal: valorTotal,
                valorGeral: valorGeral,
              });
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Prossegir para Forma de entrega
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    width: 300,
    fontSize: 16,
  },
  card2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    //justifyContent:'space-around'
  },
  texteletro: {
    fontSize: 30,
    color: "#1534C8",
    fontWeight: "bold",
    marginLeft: 3,
  },
  textponto: {
    fontSize: 30,
    color: "#FFDB00",
    fontWeight: "bold",
    marginLeft: 3,
  },
  textcom: {
    fontSize: 30,
    color: "#1534C8",
    marginLeft: 3,
  },
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 9999,
  },
});
