import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { TextInputMask } from "react-native-masked-text";
import { IconButton } from "react-native-paper";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

export default function endereco({ route }) {
  const [data, setData] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEmdereco] = useState("");
  const [numero, setNumero] = useState("");
  const [idCliente, setIdCliente] = useState(route.params.idCliente);
  const [nomeEndereco, setNomeEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [data2, setDsata2] = useState("");
  const [idEndereco, setiIdEndereco] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [edite, setEdite] = useState(false);
  const navigation = useNavigation();
  if (cep.length == 8 && data !== "") {
    setData("");
    setBairro("");
    setCidade("");
    setEmdereco("");
    setEstado("");
    setEdit(false);
    setEdite(false);
  }
  if (route.params.cep === undefined) {
    if (bairro == "" && cidade !== "" && edit == false) {
      setEdit(true);
      setEdite(false);
    }
    if (cep.length == 9 && data == "") {
      console.log("entrou aqui 2");
      fetch("https://viacep.com.br/ws/" + cep + "/json/")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error + " produtoFilhos.js"))
        .finally(() => setLoading(false));
    } else if (data !== "" && cidade == "") {
      console.log("entrou aqui 3");

      setCidade(data.localidade);
      if (data.logradouro !== undefined) {
        setBairro(data.bairro);
        setEmdereco(data.logradouro);
      }

      setEstado(data.uf);
    }
  } else if (
    route.params.idEndereco !== null &&
    bairro == "" &&
    route.params.endereco !== "" &&
    edit == ""
  ) {
    console.log("entrou aqui 4");
    setCep(route.params.cep);
    setBairro(route.params.bairro);
    setCelular(route.params.celular);
    setCidade(route.params.cidade);
    setComplemento(route.params.complemento);
    setEmdereco(route.params.endereco);
    setEstado(route.params.estado);
    setNomeEndereco(route.params.nomeEndereco);
    setNumero(route.params.numero);
    setTelefone(route.params.telefone);
    setiIdEndereco(route.params.idEndereco);
    setEdit(true);
    setEdite(true);
  }

  const Edite = async () => {
    if (cep.length === 9) {
      await fetch(
        "https://www.eletrosom.com/shell/ws/integrador/dadosEndereco",
        {
          method: "POST",
          headers: {
            Accept: "aplication/json",
            "Content-type": "aplication/json",
          },
          body: JSON.stringify({
            cadastroEndereco: {
              idCliente: idCliente,
              idEndereco: idEndereco,
              cep: cep,
              endereco: endereco,
              nomeEndereco: nomeEndereco,
              numero: numero,
              bairro: bairro,
              complemento: complemento,
              cidade: cidade,
              estado: estado,
              telefone: telefone,
              celular: celular,
            },
            version: 16,
          }),
        }
      )
        .then((res) => res.json())
        .then((resData) => {
          setDsata2(resData);
        });
    } else {
      alert("Cep incorreto");
    }
  };
  if (data2.codigoMensagem === 200) {
    alert(data2.mensagem);
    navigation.goBack();
    setDsata2("");
  } else if (data2.codigoMensagem !== 200 && data2 !== "") {
    alert(data2.mensagem + "=> Erro: " + data2.codigoMensagem);
    setDsata2("");
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={{ marginTop: 80 }}>
        <View style={{ alignSelf: "flex-start", marginLeft: "85%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "blue" }}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center", marginTop: -43 }}>
          <View style={styles.card2}>
            <IconButton
              style={{ marginLeft: 0 }}
              icon={require("../../Components/assets/entrega.png")}
              color="blue"
              size={35}
            />
            <View style={{ marginLeft: -10 }}>
              {idEndereco === null ? (
                <Text style={{ fontWeight: "bold" }}>Adicionar Endereço</Text>
              ) : (
                <Text style={{ fontWeight: "bold" }}> Editar Endereço</Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginBottom: 150 }}>
          <View style={{ width: "85%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.uptext}>CEP</Text>
              <Text style={{ color: "red", marginBottom: -10, marginTop: 5 }}>
                *
              </Text>
            </View>
            <TextInputMask
              style={styles.input}
              underlineColorAndroid="transparent"
              type={"zip-code"}
              maxLength={9}
              borderWidth={1}
              borderColor={"#A0A5AA"}
              backgroundColor={"#fff"}
              paddingHorizontal={10}
              borderRadius={5}
              onChangeText={(text) => setCep(text)}
              placeholder="00000-000"
              value={cep}
            ></TextInputMask>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "76%", marginRight: "4%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.uptext}>Rua</Text>
                  {idEndereco !== null || (data !== "" && bairro == "") ? (
                    <Text
                      style={{
                        color: "red",
                        marginBottom: -10,
                        marginTop: 5,
                      }}
                    >
                      *
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setEmdereco(text)}
                  editable={edit}
                  value={endereco}
                  placeholder="Endereco"
                ></TextInput>
              </View>

              <View style={{ width: "20%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.uptext}>Numero</Text>
                  <Text
                    style={{ color: "red", marginBottom: -10, marginTop: 5 }}
                  >
                    *
                  </Text>
                </View>

                <TextInputMask
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  type={"only-numbers"}
                  maxLength={6}
                  borderWidth={1}
                  borderColor={"#A0A5AA"}
                  backgroundColor={"#fff"}
                  paddingHorizontal={10}
                  borderRadius={5}
                  onChangeText={(text) => setNumero(text)}
                  placeholder="000"
                  value={numero}
                ></TextInputMask>
              </View>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ width: "48%", marginRight: "4%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.uptext}>Bairro</Text>
                  {idEndereco !== null || (data !== "" && bairro == "") ? (
                    <Text
                      style={{
                        color: "red",
                        marginBottom: -10,
                        marginTop: 5,
                      }}
                    >
                      *
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  editable={edit}
                  onChangeText={(text) => setBairro(text)}
                  placeholder=""
                >
                  {bairro}
                </TextInput>
              </View>

              <View style={{ width: "48%" }}>
                <Text style={styles.uptext}>Complemento</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setComplemento(text)}
                  placeholder="Apto 1 bloc E"
                >
                  {complemento}
                </TextInput>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "48%", marginRight: "4%" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.uptext}>Estado</Text>
                    {idEndereco !== null || (data !== "" && bairro == "") ? (
                      <Text
                        style={{
                          color: "red",
                          marginBottom: -10,
                          marginTop: 5,
                        }}
                      >
                        *
                      </Text>
                    ) : (
                      <></>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    maxLength={2}
                    onChangeText={(text) => setEstado(text)}
                    editable={edite}
                    placeholder="Ex: MG"
                    value={estado}
                  ></TextInput>
                </View>
                <View style={{ width: "48%" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.uptext}>Cidade</Text>
                    {idEndereco !== null || (data !== "" && bairro == "") ? (
                      <Text
                        style={{
                          color: "red",
                          marginBottom: -10,
                          marginTop: 5,
                        }}
                      >
                        *
                      </Text>
                    ) : (
                      <></>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => setCidade(text)}
                    editable={edite}
                    placeholder=""
                    value={cidade}
                  ></TextInput>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.uptext}>Nome do endereço</Text>
                <Text
                  style={{ color: "red", marginBottom: -10, marginTop: 5 }}
                ></Text>
              </View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setNomeEndereco(text)}
                placeholder="Ex: Meu apartamento"
              ></TextInput>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.uptext}>Telefone</Text>
                <Text style={{ color: "red", marginBottom: -10, marginTop: 5 }}>
                  *
                </Text>
              </View>
              <TextInputMask
                style={styles.input}
                type={"cel-phone"}
                maxLength={14}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                value={telefone}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setTelefone(text)}
                placeholder="(DDD) 99999999"
              ></TextInputMask>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.uptext}>Celular</Text>
                <Text style={{ color: "red", marginBottom: -10, marginTop: 5 }}>
                  *
                </Text>
              </View>
              <TextInputMask
                style={styles.input}
                type={"cel-phone"}
                maxLength={15}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setCelular(text)}
                placeholder="(DDD) 999999999"
                value={celular}
              ></TextInputMask>
            </View>
          </View>
          <TouchableOpacity style={{ width: "85%" }} onPress={() => Edite()}>
            <View style={styles.btnadd}>
              <Text>Adicionar endereço</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    height: 50,
    width: "100%",
    fontSize: 16,
    borderColor: "#A0A5AA",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
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
  uptext: {
    marginBottom: -10,
    marginTop: 10,
    marginLeft: 1,
    color: "#6A7075",
  },
  btnadd: {
    height: 50,
    backgroundColor: "#FFDB00",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 15,
    marginTop: 50,
  },
});
