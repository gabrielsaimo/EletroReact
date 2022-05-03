import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { TextInputMask } from "react-native-masked-text";
import { ScrollView } from "react-native-gesture-handler";
export default function Cadastrop2({ route }) {
  const email = route.params.email;
  const password = route.params.password;
  const pessoa = route.params.pessoa;
  const [CPF, setCpf] = useState("");
  const [Nome, setNome] = useState("");
  const [sobrenome, setSobreome] = useState("");
  const [rg, setRg] = useState("");
  const navigation = useNavigation();
  function Click() {
    if (
      CPF !== "" &&
      Nome !== "" &&
      rg !== "" &&
      sobrenome !== "" &&
      Nome !== ""
    ) {
      navigation.push("Cadastrop3", {
        email: email,
        password: password,
        pessoa: pessoa,
        cpf: CPF,
        nome: Nome,
        sobrenome: sobrenome,
        rg: rg,
      });
    } else {
      alert("Preencha todos os campos");
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
              2
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
              2
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
            width: "50%",
            height: 5,
            marginTop: 0,
            zIndex: 1,
          }}
        ></View>
      </View>
      <ScrollView>
        <View
          style={{ alignItems: "center", marginTop: "1%", marginBottom: 130 }}
        >
          <View style={{ width: "100%" }}>
            <View style={{ width: "100%", marginLeft: "5%" }}>
              <Text style={{ marginTop: 20 }}>
                {pessoa === "F" ? "CPF" : "CNPJ"}
              </Text>
              <TextInputMask
                type={pessoa === "F" ? "cpf" : "cnpj"}
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  marginRight: "10%",
                  height: 50,
                  fontSize: 20,
                  paddingLeft: 15,
                }}
                maxLength={pessoa === "F" ? 14 : 18}
                onChangeText={(text) => setCpf(text)}
              />
              <>
                <Text style={{ marginTop: 20 }}>
                  {pessoa === "F" ? "RG" : "Inscrição estadual"}
                </Text>
              </>

              <TextInput
                keyboardType="decimal-pad"
                style={{
                  borderRadius: 5,
                  marginRight: "10%",
                  fontSize: 15,
                }}
                mode={"outlined"}
                onChangeText={(text) => setRg(text)}
              />

              <Text style={{ marginTop: 20 }}>
                {pessoa === "F" ? "Nome" : "Razão social"}
              </Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                maxLength={100}
                mode="outlined"
                onChangeText={(text) => setNome(text)}
                placeholder="Ex: Eletrosom"
              />
              <Text style={{ marginTop: 20 }}>
                {pessoa === "F" ? "Sobrenome" : "Responsável"}
              </Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                maxLength={100}
                mode="outlined"
                onChangeText={(text) => setSobreome(text)}
                placeholder="Ex: Gabriel"
              />
              <View style={{ marginLeft: "-10%", marginTop: 50 }}></View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: "85%",
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
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
