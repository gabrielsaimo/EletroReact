import React, { useEffect, useState, useContext, useRef } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
  Platform,
  Animated,
} from "react-native";
const { URL_PROD } = process.env;
import Modal from "react-native-modal";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import ModalFilhos from "../ModalFilhos";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar, IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";
import Local from "../Local";
import CalculaFrete from "../CalculaFrete";
import { WebView } from "react-native-webview";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import ShareButton from "../ShereButtom";

export default function Produto({ route, navigation }) {
  const sku = route.params.sku;
  const skuvolt = route.params.sku2;
  //! skuvolt tem q ser usado para o carrinho !!!
  const filhos = route.params.filhos;
  const [img, setImg] = useState("");
  const [imgtotal, setImgtotal] = useState("");
  const [setcarrinho, setCarrinho] = useState(false);
  const [precoDe, setprecoDe] = useState(route.params.precode);
  const [cepvisible, setVisiblecep] = useState(false);
  const [modal, setModal] = useState(false);
  const runFirst = `let selector = document.querySelector("img") 
                    selector.style.display = "none"
                    true;`;
  useEffect(() => {
    setModal(false);
  }, [route.params]);
  const [isVisibleDescr, setDescri] = useState(false);
  const [isVisibleEspec, setEspec] = useState(false);
  const [isVisiblefpagamento, setFpagamento] = useState(false);
  const { consultaCep, user, user1 } = useContext(AuthContext);
  const [configuravel, setConfiguravel] = useState(false);
  const [usercep, setUsercep] = useState(user.cep);
  const { width, height } = Dimensions.get("window");
  const bottom = height - 87;
  const [alert, setAlert] = useState(false);
  const [volt, setVolt] = useState(false);
  const [TextInput_cep, setTextCep] = useState(usercep);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgclik, setImgclik] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };
  function Clickcep() {
    consultaCep(TextInput_cep, sku);

    !cepvisible ? setVisiblecep(true) : setVisiblecep(false);
  }
  function clickComprar() {
    if (!volt && filhos === undefined) {
      fadeIn();
      setAlert(true);
      setTimeout(() => {
        fadeOut();
      }, 5000);
      setTimeout(() => {
        setAlert(false);
      }, 8000);
    } else {
      setAlert(false);
    }
  }
  function clickCarrinho() {
    if (!volt && filhos !== undefined) {
      fadeIn();
      setCarrinho(true);
      setTimeout(() => {
        fadeOut();
      }, 5000);
      setTimeout(() => {
        setCarrinho(false);
      }, 8000);
    } else {
      setCarrinho(false);
    }
    if (!volt && filhos === undefined) {
      fadeIn();
      setAlert(true);
      setTimeout(() => {
        fadeOut();
      }, 5000);
      setTimeout(() => {
        setAlert(false);
      }, 8000);
    } else if (configuravel == false) {
      fadeIn();
      setCarrinho(true);
      setTimeout(() => {
        fadeOut();
      }, 5000);
      setTimeout(() => {
        setCarrinho(false);
      }, 8000);
    }
  }

  async function loadApi() {
    if (loading) return;
    setLoading(true);
    if (user1.idCliente) {
      const response = await axios.get(
        `${URL_PROD}/shell/ws/integrador/detalhaProdutos?sku=${route.params.sku}&version=15&idCliente=${user1.idCliente}`
      );
      setData([response.data]);
    } else {
      const response = await axios.get(
        `${URL_PROD}/shell/ws/integrador/detalhaProdutos?sku=${route.params.sku}&version=15`
      );
      setData([response.data]);
    }
  }
  useEffect(() => {
    loadApi();
  }, []);

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
  const [active, isActive] = useState(0);
  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      isActive(slide);
    }
  };
  return (
    <>
      <View style={{ backgroundColor: "#fff" }}>
        <SearchBar />
        <Local />

        {alert && filhos === undefined ? (
          <Animated.View
            style={{
              width: "100%",
              height: 70,
              marginTop: bottom,
              backgroundColor: "#FE8F02",
              position: "absolute",
              zIndex: 99,
              alignItems: "center",
              opacity: fadeAnim,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingVertical: 23,
                fontWeight: "bold",
              }}
            >
              Selecione a voltagem antes de continuar
            </Text>
          </Animated.View>
        ) : (
          <></>
        )}
        {setcarrinho ? (
          <Animated.View
            style={{
              opacity: fadeAnim,
              width: "100%",
              height: 70,
              marginTop: bottom,
              backgroundColor: "#1534C8",
              position: "absolute",
              zIndex: 99,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingVertical: 23,
                marginLeft: "auto",
              }}
            >
              ✓{"     "}Produto adicinado ao carrinho{"     "}
            </Text>
            <Text
              onPress={() => console.log("ver!")}
              style={{
                color: "white",
                fontSize: 18,
                paddingVertical: 23,
                fontWeight: "bold",
                marginRight: "auto",
              }}
            >
              Ver
            </Text>
          </Animated.View>
        ) : (
          <></>
        )}

        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 0,
                alignItems: "baseline",
                margin: 10,
                marginTop: 20,
                marginBottom: 115,
                height: "100%",
              }}
            >
              <View style={{ width: 80 }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={item.avaliacao}
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
              <Text style={{ fontSize: 10, marginTop: 5, color: "#6A7075" }}>
                CÓD - {item.codigo}
              </Text>

              <Modal visible={imgclik} transparent={true}>
                <View
                  style={{
                    marginTop: 10,
                    width,
                    height,
                    backgroundColor: "black",
                    opacity: 0.9,
                    marginLeft: "-5.6%",
                  }}
                >
                  <FlatList
                    horizontal
                    pagingEnabled
                    onScroll={change}
                    showsHorizontalScrollIndicator={false}
                    data={item.imagem}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                      <>
                        <View>
                          <Image
                            style={{
                              width,
                              height,
                              resizeMode: "contain",
                              zIndex: 2,
                            }}
                            key={index}
                            source={{ uri: item.img }}
                          />
                          <View
                            style={{
                              backgroundColor: "#FFF",
                              width,
                              height: "75%",
                              position: "absolute",
                              marginTop: "30%",
                              zIndex: 1,
                            }}
                          />
                        </View>
                      </>
                    )}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      bottom: "93%",
                      right: "2%",
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity onPress={() => setImgclik(false)}>
                      <FontAwesomeIcon
                        icon={faClose}
                        style={{ color: "white" }}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View
                style={{
                  marginTop: 10,
                  width,
                  height: 350,
                  marginLeft: -10.2,
                }}
              >
                <FlatList
                  horizontal
                  pagingEnabled
                  onScroll={change}
                  showsHorizontalScrollIndicator={false}
                  data={item.imagem}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <>
                      <TouchableOpacity onPress={() => setImgclik(true)}>
                        <View>
                          {item.tipoProduto === "configurable"
                            ? setConfiguravel(true)
                            : setConfiguravel(false)}
                          <Image
                            style={{
                              width,
                              height: "100%",
                              resizeMode: "contain",
                            }}
                            key={index}
                            source={{ uri: item.img }}
                          ></Image>
                        </View>
                      </TouchableOpacity>
                    </>
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
                  {item.imagem.map ? (
                    item.imagem.map((i, k) => (
                      <Text
                        key={[k, setImgtotal(k)]}
                        style={
                          k == active ? [styles.setbol, setImg(k)] : styles.bol
                        }
                      ></Text>
                    ))
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  top: 320,
                  right: 3,
                }}
              >
                <ShareButton url={item.urlsocial} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  top: 110,
                  left: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "gray",
                    opacity: 0.5,
                    borderRadius: 5,
                  }}
                >
                  <Text>
                    {" "}
                    {img + 1} {"/"} {imgtotal + 1}{" "}
                  </Text>
                </View>
              </View>
              <View
                style={
                  item.favoritos
                    ? {
                        flexDirection: "row",
                        position: "absolute",
                        top: 90,
                        right: -5,
                        alignSelf: "center",
                      }
                    : {
                        flexDirection: "row",
                        position: "absolute",
                        top: 90,
                        right: 3,
                        alignSelf: "center",
                      }
                }
              >
                <IconButton
                  icon={
                    item.favoritos
                      ? require("../../Components/assets/favorito.png")
                      : require("../../Components/assets/heart.png")
                  }
                  color={item.favoritos ? "#FFDB00" : "#6A7075"}
                  size={item.favoritos ? 37 : 30}
                  onPress={() => ({})}
                />
              </View>

              {item.filhos ? (
                <TouchableOpacity
                  style={{ width: "100%" }}
                  onPress={() => setModal(true)}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      backgroundColor: "#F0F2F4",
                      borderRadius: 10,
                      flexDirection: "row",
                      padding: 15,
                      marginTop: 24,
                      marginBottom: 24,
                    }}
                  >
                    <Text>Voltagem: {filhos}</Text>
                    <Text
                      style={{
                        marginLeft: "98%",
                        paddingTop: 15,
                        position: "absolute",
                      }}
                    >
                      {">"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <>{setVolt(true)}</>
              )}
              <Text
                style={{
                  fontSize: 15,
                  width: "100%",
                  textDecorationLine: "line-through",
                  color: "#6A7075",
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
              <TouchableOpacity
                style={{ width: "100%", marginTop: 20 }}
                onPress={() => clickComprar()}
              >
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#9BCB3D",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 15,
                      fontSize: 20,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Comprar agora
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: "100%", marginTop: 15 }}
                onPress={() => clickCarrinho()}
              >
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "white",
                    borderRadius: 10,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#9BCB3D",
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 13,
                      fontSize: 20,
                      color: "#9BCB3D",
                      fontWeight: "bold",
                    }}
                  >
                    Adicionar ao carrinho
                  </Text>
                </View>
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
                <View
                  style={{ height: 70, width: "100%", paddingVertical: 20 }}
                >
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
                <View
                  style={{ height: 70, width: "100%", paddingVertical: 20 }}
                >
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
                    {!data.avaliacao ? 0 : data.avaliacao}
                  </Text>
                </View>
                <View style={{ width: 180, marginHorizontal: 10 }}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={data.avaliacao}
                    starSize={25}
                    fullStarColor={"#FEA535"}
                    emptyStarColor={"#6A7075"}
                  />
                  <Text>{!data.avaliacao ? 0 : data.avaliacao} Avaliações</Text>
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
                    <Appbar.Header
                      style={{
                        backgroundColor: "#FFDB00",
                        marginTop: -45,
                        zIndex: 1,
                        marginHorizontal: -20,
                      }}
                    />
                    <View
                      style={{
                        alignSelf: "flex-start",
                        marginLeft: 10,
                        marginTop: 20,
                      }}
                    >
                      <TouchableOpacity onPress={() => setDescri(false)}>
                        <FontAwesomeIcon
                          icon={faAngleLeft}
                          style={{ color: "#1534C8" }}
                          size={30}
                        />
                      </TouchableOpacity>
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            fontSize: 20,
                            marginTop: -32,
                            marginLeft: "22%",
                          }}
                        >
                          Descrição do Produto
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{ width: "100%", height: "100%", marginTop: 50 }}
                    >
                      <WebView
                        source={{
                          uri: `${URL_PROD}/shell/ws/integrador/caracteristicasProduto?codigoProduto=${sku}`,
                        }}
                        injectedJavaScript={runFirst}
                        scalesPageToFit={false}
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
                      marginHorizontal: -20,
                    }}
                  />

                  <View style={{ marginTop: 30 }}>
                    <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
                      <TouchableOpacity onPress={() => setEspec(false)}>
                        <FontAwesomeIcon
                          icon={faAngleLeft}
                          style={{ color: "#1534C8" }}
                          size={30}
                        />
                      </TouchableOpacity>
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            fontSize: 20,
                            marginTop: -32,
                            marginLeft: "20%",
                          }}
                        >
                          Especificações Técnicas
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{ width: "100%", height: "100%", marginTop: 0 }}
                    >
                      <View>
                        <ScrollView
                          showsVerticalScrollIndicator={false}
                          style={{ height: "91%", width: "97%", margin: 5 }}
                        >
                          {item.especificacoes.map((i, k) => (
                            <>
                              {i.descricao.length > 60 ? (
                                <View
                                  style={{
                                    flexDirection: "column",
                                    marginVertical: 10,
                                    paddingVertical: 20,
                                    borderRadius: 5,
                                    paddingHorizontal: 10,
                                    backgroundColor: "#EDF2FF",
                                  }}
                                >
                                  <>
                                    {i.descricao !== "" ? (
                                      <View>
                                        {i.campo !== "" ? (
                                          <>
                                            <Text>{i.campo}</Text>
                                          </>
                                        ) : (
                                          <></>
                                        )}

                                        <Text>{i.descricao}</Text>
                                      </View>
                                    ) : (
                                      <View>
                                        <Text
                                          style={{
                                            fontWeight: "bold",
                                            marginVertical: 5,
                                          }}
                                        >
                                          {i.campo}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                </View>
                              ) : (
                                <View>
                                  <>
                                    {i.descricao ? (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          paddingVertical: 15,
                                          borderRadius: 5,
                                          marginVertical: 2,
                                          backgroundColor:
                                            k % 2 == 0 ? "#EDF2FF" : "#FFFFFF",
                                        }}
                                      >
                                        <Text
                                          style={{
                                            position: "absolute",
                                            marginLeft: 10,
                                            marginTop: 15,
                                          }}
                                        >
                                          {i.campo.substring(0, 30)}
                                        </Text>
                                        <Text style={{ marginLeft: 250 }}>
                                          {i.descricao}
                                        </Text>
                                      </View>
                                    ) : (
                                      <View>
                                        <Text
                                          style={{
                                            fontWeight: "bold",
                                            marginVertical: 20,
                                          }}
                                        >
                                          {i.campo}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                </View>
                              )}
                            </>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
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
              <View>
                <View
                  style={{
                    height: 2,
                    backgroundColor: "#CED4DA",
                    width,
                    marginLeft: -10,
                    borderRadius: 20,
                    marginVertical: 0,
                  }}
                ></View>
                {item.resenhas.map ? (
                  <View>
                    {item.resenhas.map((i, k) => (
                      <View style={{ marginVertical: 20 }}>
                        <View style={{ width: 80 }}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={i.vote}
                            starSize={10}
                            fullStarColor={"#FEA535"}
                            emptyStarColor={"#6A7075"}
                          />
                        </View>

                        <Text>{i.nickname}</Text>
                        <Text>{i.titulo}</Text>
                        <Text>{i.descricao}</Text>
                        <View
                          style={{
                            height: 1.5,
                            backgroundColor: "#CED4DA",
                            width,
                            marginLeft: -10,
                            borderRadius: 20,
                            marginTop: 20,
                          }}
                        ></View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          )}
        />
        <ModalFilhos
          show={modal}
          sku={sku}
          volt={filhos}
          navigate={navigator}
          navigation={navigation}
          close={() => setModal(true)}
        />
      </View>
    </>
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
  bol: {
    color: "#D4D4D4",
    margin: 3,
  },
  setbol: {
    color: "#000",
    margin: 3,
  },
};
