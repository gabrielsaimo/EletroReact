import React, { useEffect, useState, useContext } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
import ModalFilhos from "../ModalFilhos";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar, IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";
import Local from "../Local";
import Produtoimagem from "../ProdutoImagens";
import CalculaFrete from "../CalculaFrete";
import { WebView } from "react-native-webview";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";

export default function Produto({ route, navigation }) {
  const sku = route.params.sku;
  const filhos = route.params.filhos;
  const sku2 = route.params.sku2;
  const [precoDe, setprecoDe] = useState(route.params.precode);

  const [cepvisible, setVisiblecep] = useState(false);
  const [modal, setModal] = useState(false);
  const [isVisibleDescr, setDescri] = useState(false);
  const [isVisibleEspec, setEspec] = useState(false);
  const [isVisiblefpagamento, setFpagamento] = useState(false);

  const { consultaCep } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [usercep, setUsercep] = useState(user.cep);
  const { width } = Dimensions.get("window");
  const width2 = width / 2;
  const width4 = width / 4;
  const height = (width * 100) / 30;
  const [TextInput_cep, setTextCep] = useState(usercep);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(usercep);

  console.log(cepvisible);
  function Clickcep() {
    consultaCep(TextInput_cep, sku);

    !cepvisible ? setVisiblecep(true) : setVisiblecep(false);
  }
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
              marginTop:20,
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
              <TouchableOpacity style={{width: '100%'}} onPress={() => setModal(true)}>
                <View
                  style={{
                    width: '100%',
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
                      paddingLeft: 370,
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
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ color: "#6A7075", paddingVertical: 10 }}
                onPress={() => setFpagamento(true)}
              >
                Todas as formas de pagamento
              </Text>
              <Text
                style={{
                  color: "#6A7075",
                  fontSize: 20,
                  marginLeft: 10,
                  paddingVertical: 5,
                }}
              >
                {">"}
              </Text>
            </View>
            <View
              style={{
                height: 1.5,
                backgroundColor: "#CED4DA",
                width: "99%",
                borderRadius: 20,
                marginVertical: 10,
              }}
            ></View>
            <View>
              {cepvisible ? (
                <></>
              ) : (
                <View>
                  <View>
                    <Text style={{ marginBottom: 5, color: "#6A7075" }}>
                      Calcule seu frete
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      placeholder="Digite seu Cep"
                      onChangeText={(data) => setTextCep(data)}
                      keyboardType={"numeric"}
                      maxLength={8}
                      height={50}
                      borderWidth={1}
                      borderColor={"#A0A5AA"}
                      width={"75%"}
                      marginLeft={10}
                      backgroundColor={"#fff"}
                      paddingHorizontal={10}
                      borderRadius={5}
                      underlineColorAndroid="transparent"
                    >
                      {usercep !== undefined ? usercep : ""}
                    </TextInput>
                    <IconButton
                      icon={require("../assets/pin_gps.png")}
                      onPress={() => Clickcep()}
                      activeOpacity={0.7}
                      style={{
                        width: 50,
                        height: 50,
                        marginTop: 0,
                        marginLeft: "4%",
                        paddingRight: 3,
                        backgroundColor: "#FFDB00",
                        borderRadius: 5,
                      }}
                    ></IconButton>
                  </View>
                </View>
              )}

              {cepvisible ? (
                <View style={{ marginTop: -15 }}>
                  <CalculaFrete cep={TextInput_cep} sku={sku} />
                </View>
              ) : (
                <></>
              )}
              {cepvisible ? (
                <Text
                  style={{ color: "blue", marginLeft: 15 }}
                  onPress={() =>
                    !cepvisible ? setVisiblecep(true) : setVisiblecep(false)
                  }
                >
                  Alterar endereço de entrega {">"}
                </Text>
              ) : (
                <></>
              )}
            </View>
            <TouchableOpacity style={{width: '100%',marginTop:20}}>
              <View
                style={{ width: '100%', height: 60, backgroundColor: "#9BCB3D",borderRadius:10,alignItems:'center'}}
              ><Text style={{paddingVertical:15,fontSize:20,color:'white',fontWeight:'bold'}}>Comprar agora</Text></View>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '100%',marginTop:15}}>
              <View
                style={{ width: '100%', height: 60, backgroundColor: "white",borderRadius:10,alignItems:'center',borderWidth:1,borderColor:'#9BCB3D'}}
              ><Text style={{paddingVertical:13,fontSize:20,color:'#9BCB3D',fontWeight:'bold'}}>Adicionar ao carrinho</Text></View>
            </TouchableOpacity>
            <View
              style={{
                height: 1.5,
                backgroundColor: "#CED4DA",
                width: "99%",
                borderRadius: 20,
                marginTop: 15,
              }}
            ></View>
            <TouchableOpacity onPress={() => setDescri(true)}>
              <View style={{ height: 70, width: "100%", paddingVertical: 20 }}>
                <View
                  style={{
                    width: "100%",
                    height: 50,
                    padding: 5,
                  }}
                >
                  <Text style={{ color: "#6A7075", fontSize: 15, width }}>
                    Descrição do produto
                  </Text>
                  <Text
                    style={{
                      marginLeft: "95%",
                      paddingTop: 1,
                      position: "absolute",
                      fontSize: 20,
                      color: "#6A7075",
                    }}
                  >
                    {">"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1.5,
                backgroundColor: "#CED4DA",
                width: "99%",
                borderRadius: 20,
                marginVertical: 0,
              }}
            ></View>
            <TouchableOpacity onPress={() => setEspec(true)}>
              <View style={{ height: 70, width: "100%", paddingVertical: 20 }}>
                <View
                  style={{
                    width: "100%",
                    height: 50,
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 15, width, color: "#6A7075" }}>
                    Especificações Técnicas
                  </Text>
                  <Text
                    style={{
                      marginLeft: "95%",
                      paddingTop: 1,
                      position: "absolute",
                      fontSize: 20,
                      color: "#6A7075",
                    }}
                  >
                    {">"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1.5,
                backgroundColor: "#CED4DA",
                width: "99%",
                borderRadius: 20,
                marginVertical: 0,
              }}
            ></View>
            <Text style={{ fontSize: 20, marginLeft: 5 }}>Avaliações</Text>
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
              <Modal
                animationType={"slide"}
                transparent={false}
                visible={isVisibleDescr}
                onRequestClose={() => {
                  setDescri(false);
                }}
              >
                <Appbar.Header
                  style={{
                    backgroundColor: "#FFDB00",
                    marginTop: -45,
                    zIndex: 1,
                  }}
                ></Appbar.Header>

                <View style={{ marginTop: 30 }}>
                  <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => setDescri(false)}>
                      <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={{ color: "#1534C8" }}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ width: "100%", height: "100%", marginTop: 50 }}
                  >
                    <WebView
                      source={{
                        uri:
                          "https://www.eletrosom.com/shell/ws/integrador/caracteristicasProduto?codigoProduto=" +
                          sku,
                      }}
                    />
                  </View>
                </View>
              </Modal>
              <Modal
                animationType={"slide"}
                transparent={false}
                visible={isVisibleEspec}
                onRequestClose={() => {
                  setEspec(false);
                }}
              >
                <Appbar.Header
                  style={{
                    backgroundColor: "#FFDB00",
                    marginTop: -45,
                    zIndex: 1,
                  }}
                ></Appbar.Header>

                <View style={{ marginTop: 30 }}>
                  <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => setEspec(false)}>
                      <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={{ color: "#1534C8" }}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ width: "100%", height: "100%", marginTop: 50 }}
                  ></View>
                </View>
              </Modal>
              <Modal
                animationType={"slide"}
                transparent={false}
                visible={isVisiblefpagamento}
                onRequestClose={() => {
                  setFpagamento(false);
                }}
              >
                <Appbar.Header
                  style={{
                    backgroundColor: "#FFDB00",
                    marginTop: -45,
                    zIndex: 1,
                  }}
                ></Appbar.Header>

                <View style={{ marginTop: 30 }}>
                  <View
                    style={{
                      alignSelf: "flex-start",
                      paddingLeft: 10,
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() => setFpagamento(false)}
                    >
                      <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={{ color: "#1534C8" }}
                        size={30}
                      />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontSize: 25, marginTop: -32 }}>
                        Parcelamentos
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      marginTop: 30,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par1}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par2}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par3}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par4}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par5}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par6}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par7}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par8}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par9}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par10}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par11}
                      </Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>
                        {item.parcelamento.par12}
                      </Text>
                    </View>
                  </View>
                </View>
              </Modal>
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
