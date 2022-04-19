import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { AuthContext } from "../../Contexts/Auth";
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
  const { signIn } = useContext(AuthContext);

  const navigation = useNavigation();

  const Add = async () => {
    if (email != "" && password != "") {
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
    <SafeAreaView>
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

      <View style={{ alignItems: "center" }}>
        <View>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="account" />}
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
              placeholder="cep"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Rua"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Numero"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Sua senha"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Bairro"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Complemento"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Estado"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Cidade"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Destinatario"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="sobrou"
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={{ width: "85%" }} onPress={addEndereco}>
          <View
            style={{
              height: 50,
              backgroundColor: "#FFDB00",
              borderRadius: 3,
              alignItems: "center",
              alignContent: "center",
              paddingVertical: 15,
            }}
          >
            <Text>Adicionar endereço</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
});
