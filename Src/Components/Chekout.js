import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Contexts/Auth";
const { URL_PROD } = process.env;
export default function Checkout({ route, navigation }) {
  const { user1 } = useContext(AuthContext);
  const { endereco, cart } = route.params;
  const [data, setData] = useState(JSON.parse(endereco));
  const [data2, setData2] = useState(JSON.parse(cart));
  const [value, setValue] = useState(null);
  const [pagamento, setPagamento] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pagSelect, setPagSelect] = useState(null);
  const [data3, setDat3] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const { multcar } = useContext(AuthContext);
  function Pagamento() {
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
        cadigoFrete: null,
        selecionadoIcon: null,
        selecionado: false,
        frete: {
          produtos: multcar,
          cep: data.cep,
          total_com_desconto: 0,
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
                  borderWidth: pagSelect === index ? 0 : 1,
                  margin: 5,
                  width: 130,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: pagSelect === index ? "#1534C8" : "#FFF",
                  paddingHorizontal: 16,
                  borderColor: "#6A7075",
                }}
                onPress={() => {
                  setPagSelect(index);
                }}
              >
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      tintColor: pagSelect === index ? "#FFF" : "#1534C8",
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
                    style={{ color: pagSelect === index ? "#FFF" : "#1534C8" }}
                  >
                    {item.descricaoPagamento}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
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
              style={{ width: 30, height: 30 }}
              source={require("../Components/assets/entrega.png")}
            />
            <Text style={{ fontSize: 18 }}> Selecione a forma de entrega </Text>
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
            ListFooterComponent={() => (
              <FlatList
                data={data3}
                keyExtractor={(item, index) => index}
                initialNumToRender={3}
                renderItem={({ item, index }) => (
                  <>
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
                      <View
                        style={{ justifyContent: "center", marginRight: 10 }}
                      >
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
                          {item.valor == "R$ 0,00"
                            ? "Frete Grátis"
                            : item.valor}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
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
          />
        </>
      )}
    </View>
  );
}
