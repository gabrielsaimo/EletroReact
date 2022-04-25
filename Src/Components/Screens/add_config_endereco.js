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
import { Appbar } from "react-native-paper";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

export default function endereco() {
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEmdereco] = useState("");
  const [numero, setNumero] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [nomeEndereco, setNomeEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [idEndereco, setiIdEndereco] = useState("");

  const navigation = useNavigation();

  const Add = async () => {
    if (cep != "" && estado != "") {
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
        .then((resData) => {});
    }
  };

  function addEndereco() {
    Add();
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View>
        <Appbar.Header
          style={{ backgroundColor: "blue", marginTop: 0, zIndex: 1 }}
        ></Appbar.Header>
        <View
          style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 10 }}
        ></View>
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{ color: "#1534C8" }}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center", marginTop: -38 }}>
          <View style={styles.card2}>
            <Text style={styles.texteletro}>eletrosom</Text>
            <Text style={styles.textponto}>.</Text>
            <TouchableOpacity onPress={{}}>
              <Text style={styles.textcom}>com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginBottom: 150 }}>
          <View style={{ width: "85%" }}>
            <Text style={styles.uptext}>CEP</Text>
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
            ></TextInputMask>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "76%", marginRight: "4%" }}>
                <Text style={styles.uptext}>Rua</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  editable={false}
                  onChangeText={(text) => setEmdereco(text)}
                  placeholder="Endereco"
                ></TextInput>
              </View>

              <View style={{ width: "20%" }}>
                <Text style={styles.uptext}>Numero</Text>
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
                ></TextInputMask>
              </View>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ width: "48%", marginRight: "4%" }}>
                <Text style={styles.uptext}>Bairro</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  editable={false}
                  onChangeText={(text) => setBairro(text)}
                  placeholder=""
                ></TextInput>
              </View>

              <View style={{ width: "48%" }}>
                <Text style={styles.uptext}>Complento</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setComplemento(text)}
                  placeholder="Apto 1 bloc E"
                ></TextInput>
              </View>
            </View>
            <View>
              <Text style={styles.uptext}>Estado</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setEstado(text)}
                editable={false}
                placeholder="MG"
              ></TextInput>
              <Text style={styles.uptext}>Cidade</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setCidade(text)}
                editable={false}
                placeholder=""
              ></TextInput>
              <Text style={styles.uptext}>Destinatario</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setIdCliente(text)}
                placeholder=""
              ></TextInput>
              <Text style={styles.uptext}>Telefone</Text>
              <TextInputMask
                style={styles.input}
                type={"cel-phone"}
                maxLength={14}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setIdCliente(text)}
                placeholder="(DDD) 99999999"
              ></TextInputMask>
              <Text style={styles.uptext}>Celular</Text>
              <TextInputMask
                style={styles.input}
                type={"cel-phone"}
                maxLength={15}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setIdCliente(text)}
                placeholder="(DDD) 999999999"
              ></TextInputMask>
            </View>
          </View>
          <TouchableOpacity style={{ width: "85%" }} onPress={addEndereco}>
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
    color: "#6A7075",
  },
  btnadd: {
    height: 50,
    backgroundColor: "#FFDB00",
    borderRadius: 3,
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 15,
    marginTop: 50,
  },
});
