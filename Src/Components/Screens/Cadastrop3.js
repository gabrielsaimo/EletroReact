import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Checkbox, RadioButton, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { TextInputMask } from "react-native-masked-text";
export default function Cadastrop3({ route }) {
  const email = route.params.email;
  const password = route.params.password;
  const pessoa = route.params.pessoa;
  const CPF = route.params.cpf;
  const Nome = route.params.nome;
  const sobrenome = route.params.sobrenome;
  const rg = route.params.rg;
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState("");
  const [date, setDate] = useState("");
  const [sendEmail, setEmail] = useState("");
  const [sendTelefone, setTele] = useState("");
  const [data, setData] = useState("");

  const navigation = useNavigation();
  function Click() {
    if (telefone !== "" && date !== "") {
      if (CPF !== "") {
        fetch("https://www.eletrosom.com/shell/ws/integrador/minhaconta", {
          method: "POST",
          headers: {
            Accept: "aplication/json",
            "Content-type": "aplication/json",
          },
          body: JSON.stringify({
            cadastro: {
              nome: Nome,
              sobrenome: sobrenome,
              email: email,
              senha: password,
              confirmar_senha: password,
              cpf: CPF,
              rg: rg,
              sexo: sexo,
              tipo_pessoa: pessoa,
              foto_cliente: "",
              data_nascimento: date,
              celular: telefone,
              receber_ofertas: sendEmail,
              receber_celular: sendTelefone,
              version: null,
            },
            version: 16,
          }),
        })
          .then((res) => res.json())
          .then((resData) => [setData(resData), console.log(resData)])
          .catch((error) => [console.log(error), ifs()]);
      }
    }
  }
  if (data.codigoMensagem === 200) {
    navigation.push("Cadastrofim", {
      email: email,
      password: password,
      pessoa: pessoa,
      cpf: CPF,
      nome: Nome,
      telefone: telefone,
      date: date,
    });
  }

  function ifs() {
    if (data.codigoMensagem === 200) {
      navigation.push("Cadastrofim", {
        email: email,
        password: password,
        pessoa: pessoa,
        cpf: CPF,
        nome: Nome,
        telefone: telefone,
        date: date,
      });
    } else if (data.codigoMensagem === 321) {
      alert(data.mensagem);
      navigation.navigate("Cadastrop2", {
        email: email,
        password: password,
        pessoa: pessoa,
        cpf: CPF,
        nome: Nome,
        telefone: telefone,
        date: date,
      });
    } else if (data.codigoMensagem === 323) {
      alert(data.mensagem);
      navigation.navigate("Cadastrop2", {
        email: email,
        password: password,
        pessoa: pessoa,
        cpf: CPF,
        nome: Nome,
        telefone: telefone,
        date: date,
      });
    } else if (data.codigoMensagem === 325) {
      alert(data.mensagem);
      navigation.navigate("Cadastrop1", {
        email: email,
        password: password,
        pessoa: pessoa,
        cpf: CPF,
        nome: Nome,
        telefone: telefone,
        date: date,
      });
    } else {
      if (data.codigoMensagem !== 200) {
        alert(data.codigoMensagem);
        //  ifs();
      }
    }
  }
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            backgroundColor: "#1534C8",
            width: "100%",
            height: 95,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              marginTop={50}
              marginLeft={10}
              icon={faAngleLeft}
              style={{ color: "#FFF" }}
              size={30}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 50, marginLeft: "30%" }}>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "bold" }}>
              Cadastro
            </Text>
          </View>
          <View
            style={{
              marginTop: 55,
              marginLeft: "25%",
              backgroundColor: "#FFF",
              opacity: 0.1,
              height: 20,
              flexDirection: "row",
              borderRadius: 3,
              paddingHorizontal: 3,
            }}
          >
            <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
              3
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#FFF",
                fontWeight: "bold",
                opacity: 0.5,
              }}
            >
              .
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#FFF",
                fontWeight: "bold",
                opacity: 0.5,
              }}
            >
              3
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginLeft: -25, marginTop: 55 }}
          >
            <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
              3
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#FFF",
                fontWeight: "bold",
                opacity: 0.5,
              }}
            >
              .
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#FFF",
                fontWeight: "bold",
                opacity: 0.5,
              }}
            >
              3
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#9BCB3D",
            width: "75%",
            height: 5,
            marginTop: 0,
            zIndex: 1,
          }}
        ></View>
      </View>

      <View style={{ alignItems: "center", marginTop: "1%" }}>
        <View style={{ width: "100%" }}>
          <View style={{ width: "100%", marginLeft: "5%" }}>
            <>
              <Text style={{ marginTop: 50 }}>Data de Nascimento</Text>
              <TextInputMask
                type={"datetime"}
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  marginRight: "10%",
                  height: 50,
                  fontSize: 20,
                  paddingLeft: 10,
                }}
                maxLength={10}
                placeholder={"Ex: 01/01/1999"}
                options={{
                  format: "DD/MM/YYYY",
                }}
                onChangeText={(text) => setDate(text)}
              />
            </>
            <RadioButton.Group
              onValueChange={(newValue) => setSexo(newValue)}
              value={sexo}
            >
              <View
                style={{
                  marginRight: "10%",
                  marginVertical: "5%",
                  flexDirection: "row",
                }}
              >
                <>
                  <RadioButton color="blue" value="M" />
                </>
                <View style={{ marginTop: 7 }}>
                  <Text>Maculino</Text>
                </View>

                <View
                  style={{
                    marginRight: "10%",
                    flexDirection: "row",
                  }}
                >
                  <RadioButton color="blue" value="F" />
                  <View style={{ marginTop: 7 }}>
                    <Text>Feminino</Text>
                  </View>
                </View>
              </View>
            </RadioButton.Group>
            <Text style={{ marginTop: 0 }}>Telefone</Text>
            <TextInputMask
              type={"cel-phone"}
              maxLength={15}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                marginRight: "10%",
                height: 50,
                fontSize: 20,
                paddingLeft: 10,
              }}
              placeholder={"Ex:(34) 9999-9999"}
              onChangeText={(text) => setTelefone(text)}
            />
          </View>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                color="blue"
                status={sendEmail !== 1 ? "unchecked" : "checked"}
                onPress={() => {
                  setEmail(sendEmail !== 1 ? 1 : 0);
                }}
              />
              <Text style={{ marginTop: 8 }}>
                Receber conteúdos especiais por e-mail
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                color="blue"
                status={sendTelefone !== 1 ? "unchecked" : "checked"}
                onPress={() => {
                  setTele(sendTelefone !== 1 ? 1 : 0);
                }}
              />
              <Text style={{ marginTop: 8 }}>
                Receber conteúdos especiais por SMS
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: "-10%", marginTop: 50 }}></View>
        </View>

        <TouchableOpacity
          style={{
            width: "90%",
            zIndex: 99,
          }}
          onPress={() => {
            Click();
          }}
        >
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
            <Text>Continuar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
