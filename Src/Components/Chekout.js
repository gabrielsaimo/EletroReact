import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../Contexts/Auth";
import NumberFormat from "react-number-format";
import DialogInput from "react-native-dialog-input";
export default function Checkout({ route, navigation }) {
  const { URL_PROD } = process.env;
  const { user1 } = useContext(AuthContext);
  const { endereco, cart, valorTotal } = route.params;
  const [frete, setFreteN] = useState(0);
  const [fretecets, setCetsFrete] = useState(0);
  const [valorFrete, setvalorFrete] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState(JSON.parse(endereco));
  const [data2, setData2] = useState(JSON.parse(cart));
  const [visibleCupom, setVisibleCupom] = useState(false);
  const [Buy, setBuy] = useState([]);
  const [cupom, setCupom] = useState("");
  const [dataCupom, setDataCupom] = useState([]); //!
  const [desconto, setDesconto] = useState(0); //!
  const [value, setValue] = useState(null);
  const [pagamento, setPagamento] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pagSelect, setPagSelect] = useState(null);
  const [data3, setDat3] = useState([]);
  const [buyok, setBuyOk] = useState(false);
  const [pagamentos, setPagamentos] = useState([]);
  const { multcar } = useContext(AuthContext);
  function Pagamento() {
    setTotal(Number(frete) + Number(valorTotal) + "," + fretecets);
    fetch(`${URL_PROD}pagamentoDisponiveisCliente`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        carrinho: {
          produtos: multcar,
          idCliente: user1.idCliente,
          valorTotalcomFrete: value,
        },
        version: 17,
      })
        .replace(/[//\\]/g, "")
        .replace('"[', "[")
        .replace(']"', "]")
        .replace(/"}{"/g, '"},{"'),
    })
      .then((res) => res.json())
      .then((resData) => {
        setPagamentos(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function Cupom() {
    fetch(`${URL_PROD}consultaCupom`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        carrinho: {
          produtos: multcar,
          cupom: cupom,
        },
        version: 17,
      })
        .replace(/[//\\]/g, "")
        .replace('"[', "[")
        .replace(']"', "]")
        .replace(/"}{"/g, '"},{"'),
    })
      .then((res) => res.json())
      .then((resData) => {
        setDataCupom(resData);
        setDesconto(resData.retorno.descontoCupom);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function buy(item) {
    fetch(`${URL_PROD}detalhamentoPagamento`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        carrinho: {
          produtos: multcar,
          cep: data.cep,
          codigoPagamento: item,
          valorTotalcomFrete: total,
          valorPagoCartaoUm: "",
          idCliente: user1.idCliente,
        },
        version: 17,
      })
        .replace(/[//\\]/g, "")
        .replace('"[', "[")
        .replace(']"', "]")
        .replace(/"}{"/g, '"},{"'),
    })
      .then((res) => res.json())
      .then((resData) => {
        setBuy(resData);
        setBuyOk(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetch(`${URL_PROD}consultaFrete`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        version: 17,
        id: 0,
        estado: null,
        cep: null,
        descricao: null,
        valor: null,
        prazo: null,
        codigoFrete: null,
        selecionadoIcon: null,
        selecionado: false,
        frete: {
          produtos: multcar,
          cep: data.cep,
          total_com_desconto: valorTotal,
        },
      })
        .replace(/[//\\]/g, "")
        .replace('"[', "[")
        .replace(']"', "]")
        .replace(/"}{"/g, '"},{"'),
    })
      .then((res) => res.json())
      .then((resData) => {
        setDat3(resData);
      })
      .catch((error) => {
        console.log(error);
      });
    if (pagamento === true) {
      Pagamento();
    }
  }, [pagamento]);

  return (
    <View style={{ backgroundColor: "#FFF" }}>
      {pagamento ? (
        <>
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
              style={{ width: 30, height: 30, marginRight: 10 }}
              source={require("../Components/assets/grana.png")}
            />
            <Text style={{ fontSize: 18 }}>
              {" "}
              Selecione a forma de pagamento{" "}
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
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            data={pagamentos.formaPagamento}
            keyExtractor={(item, index) => index}
            initialNumToRender={3}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  style={{
                    height: 130,
                    borderWidth: pagSelect === item.codigoPagamento ? 0 : 1,
                    margin: 5,
                    width: 130,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      pagSelect === item.codigoPagamento ? "#1534C8" : "#FFF",
                    paddingHorizontal: 16,
                    borderColor: "#6A7075",
                  }}
                  onPress={() => {
                    setPagSelect(item.codigoPagamento),
                      item.codigoPagamento === "pagamento_um_cartao"
                        ? buy(item.codigoPagamento)
                        : {};
                  }}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Image
                      style={{
                        width: 45,
                        height: 45,
                        tintColor:
                          pagSelect === item.codigoPagamento
                            ? "#FFF"
                            : "#1534C8",
                      }}
                      source={
                        item.codigoPagamento === "boleto_bradesco"
                          ? require("../Components/assets/boleto.png")
                          : item.codigoPagamento === "pagamento_um_cartao"
                          ? require("../Components/assets/creditcard.png")
                          : require("../Components/assets/2creditcard.png")
                      }
                    />
                    <Text
                      style={{
                        color:
                          pagSelect === item.codigoPagamento
                            ? "#FFF"
                            : "#1534C8",
                      }}
                    >
                      {item.descricaoPagamento}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={{ height: "25%" }}>
            {pagSelect === "pagamento_um_cartao" && buyok ? (
              Buy.formaPagamento.valorTotal != undefined ? (
                <View style={{ width: 100, height: 100 }}>
                  {Buy.formaPagamento.parcelas.map((item, index) => (
                    <View>
                      <Text>{item.valorParcela}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <></>
              )
            ) : pagSelect === "pagamento_dois_cartao" ? (
              <></>
            ) : pagSelect === "boleto_bradesco" ? (
              <>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    alignItems: "center",
                    marginHorizontal: 20,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                    Atenção
                  </Text>
                  <Text>{"Opção válida apenas para pagamento à vista."}</Text>
                  <Text>
                    O boleto deve ser impresso após a finalização do pedido.
                    Este boleto tem validade de 2 dias úteis após a finalização
                    da compra.
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#A6DBD9",
                marginHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => setVisibleCupom(true)}
            >
              <Text style={{ fontWeight: "bold", color: "#1534C8" }}>
                {"Adicionar cupom de desconto >"}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <DialogInput
              isDialogVisible={visibleCupom}
              cancelText={"Cancelar"}
              submitText={"Usar"}
              title={"Cupom"}
              message={""}
              hintInput={""}
              submitInput={(inputText) => {
                setCupom(inputText);
                setVisibleCupom(false);
                cupom.length > 0 ? Cupom() : {};
              }}
              closeDialog={() => {
                setVisibleCupom(false);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              marginHorizontal: 20,
            }}
          >
            <View>
              <Text style={{ marginBottom: 15 }}>Produtos</Text>
              <Text style={{ marginBottom: 15 }}>Frete</Text>
            </View>
            <View>
              <NumberFormat
                value={valorTotal + ",00,0"}
                displayType="text"
                thousandSeparator
                prefix="R$ "
                renderText={(value) => (
                  <Text style={{ marginBottom: 15 }}>
                    {value
                      .replace(",", ".")
                      .substring(0, value.replace(",", ".").length - 1)}
                  </Text>
                )}
              />
              <Text style={{ marginBottom: 15 }}>
                {valorFrete === "R$ 0,00" ? "Grátis" : valorFrete}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text>Total</Text>
            <NumberFormat
              value={total + ",0"}
              displayType="text"
              thousandSeparator
              prefix="R$ "
              renderText={(value) => (
                <Text style={{ fontSize: 20 }}>
                  {value
                    .replace(",", ".")
                    .substring(0, value.replace(",", ".").length - 1)}
                </Text>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: pagSelect === null ? "#e4e4e4" : "#9BCB3D",
                borderRadius: 5,
                padding: 20,
                paddingHorizontal: 15,
                alignItems: "center",
                marginBottom: 10,
                marginTop: 20,
                marginHorizontal: 20,
              }}
              disabled={pagSelect !== null ? false : true}
              onPress={() =>
                navigation.navigate("Resumo", {
                  endereco: endereco,
                  cart: cart,
                  valorTotal: total,
                  pagSelect: pagSelect,
                })
              }
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Prosseguir para resumo
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <FlatList
          data={data2}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={10}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <View
              style={{
                backgroundColor: "#FFF",
              }}
            >
              <View
                style={{
                  height: 2,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                  borderRadius: 20,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 20,
                  width: "100%",
                  paddingVertical: 20,
                }}
              >
                <Image
                  style={{ width: 100, height: 100, marginRight: 10 }}
                  source={{ uri: item.imagem }}
                />
                <View style={{ maxWidth: "60%" }}>
                  <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
                  <Text style={{ fontSize: 10 }}> CÓD - {item.sku} </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#1534C8",
                      fontSize: 20,
                    }}
                  >
                    R$ {Number(item.valorUnitario)},00
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <>
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
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  source={require("../Components/assets/entrega.png")}
                />
                <Text style={{ fontSize: 18 }}>
                  {" "}
                  Selecione a forma de entrega{" "}
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
              <View
                style={{
                  paddingVertical: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-around",
                  backgroundColor: "#FFF",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6A7075",
                    }}
                  >
                    {" "}
                    Endereço de Entrega{" "}
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {" "}
                    {data.endereco}, {data.numero}{" "}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ fontSize: 13, color: "#1534C8" }}>
                    {"Alterar >"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 2,
                  backgroundColor: "#CED4DA",
                  width: "100%",
                }}
              />
            </>
          )}
          ListFooterComponent={() => (
            <FlatList
              data={data3}
              keyExtractor={(item, index) => index}
              initialNumToRender={3}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      backgroundColor:
                        selected === index ? "#D3EDEC" : "#F8F9FA",
                      borderRadius: 15,
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      setValue(JSON.stringify(item));
                      setSelected(index);
                    }}
                  >
                    <View style={{ justifyContent: "center", marginRight: 10 }}>
                      {selected === index ? (
                        <Image
                          style={{ width: 20, height: 20 }}
                          source={require("../Components/assets/selected.png")}
                        />
                      ) : (
                        <Image
                          style={{ width: 20, height: 20 }}
                          source={require("../Components/assets/selecte.png")}
                        />
                      )}
                    </View>
                    <View>
                      <Text>Via {item.descricao}</Text>
                      <Text>{item.prazo}</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.valor == "R$ 0,00" ? "Frete Grátis" : item.valor}
                        {
                          (setFreteN(
                            item.valor
                              .replace("R$ ", "")
                              .replace(".", "")
                              .replace(/,[0-9][0-9]/g, "")
                          ),
                          setCetsFrete(
                            item.valor
                              .replace("R$ ", "")
                              .replace(/[0-9].[0-9][0-9][0-9],/g, "")
                              .replace(/[0-9][0-9][0-9],/g, "")
                              .replace(/[0-9][0-9],/g, "")
                              .replace(/[0-9],/g, "")
                          ),
                          setvalorFrete(item.valor))
                        }
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={() => (
                <>
                  {selected != null ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#9BCB3D",
                        borderRadius: 5,
                        padding: 20,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        marginBottom: 10,
                        marginTop: 20,
                        marginHorizontal: 20,
                      }}
                      onPress={() => {
                        setPagamento(true), Pagamento();
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        Prossegir para pagamento
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </>
              )}
            />
          )}
          ListFooterComponentStyle={{ marginVertical: 30 }}
        />
      )}
    </View>
  );
}
