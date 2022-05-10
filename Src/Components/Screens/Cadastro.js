import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { RadioButton, TextInput } from "react-native-paper";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { useNavigation } from "@react-navigation/native";
import PassMeter from "react-native-passmeter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native-gesture-handler";
const MAX_LEN = 16,
  MIN_LEN = 8,
  PASS_LABELS = ["Muito curto", "Fraco", "Normal", "Forte", "Muito Forte"];
export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pessoa, setPessoa] = useState("");
  const navigation = useNavigation();
  function Click() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length > 10 && reg.test(email) === true) {
      if (password.length > 7) {
        if (pessoa !== "") {
          navigation.push("Cadastrop2", {
            email: email,
            password: password,
            pessoa: pessoa,
          });
        } else {
          alert("Selecione se é pessoa Fisica/Juridica");
        }
      } else {
        alert("Senha muito curta");
      }
    } else {
      alert("Email invalido");
    }
  }
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#1534C8",
          width: "100%",
          height: 100,
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
            1
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
        <View style={{ flexDirection: "row", marginLeft: -25, marginTop: 55 }}>
          <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
            1
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
          width: "25%",
          height: 5,
          zIndex: 1,
        }}
      />
      <ScrollView>
        <View
          style={{ alignItems: "center", marginTop: "1%", marginBottom: 100 }}
        >
          <View style={{ width: "100%" }}>
            <View style={{ width: "100%", marginLeft: "5%" }}>
              <Text style={{ marginTop: 15 }}>E-mail</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                keyboardType={"email-address"}
                mode="outlined"
                onChangeText={(text) => setEmail(text)}
                placeholder="Insira seu email"
              ></TextInput>
              <Text style={{ marginTop: 15 }}>Senha</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                maxLength={16}
                mode="outlined"
                onChangeText={(text) => setPassword(text)}
                placeholder="Insira sua senha"
                secureTextEntry={true}
              />
              {password.length > 0 ? (
                <View style={{ marginLeft: "-10%", marginVertical: 10 }}>
                  <PassMeter
                    showLabels
                    password={password}
                    maxLength={MAX_LEN}
                    minLength={MIN_LEN}
                    labels={PASS_LABELS}
                  />
                </View>
              ) : (
                <></>
              )}

              <RadioButton.Group
                onValueChange={(newValue) => setPessoa(newValue)}
                value={pessoa}
              >
                <View
                  style={{
                    marginRight: "10%",
                    marginVertical: "5%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <>
                      <RadioButton color="blue" value="F" />
                    </>
                    <View style={{ marginTop: 7 }}>
                      <Text>Pessoa Fisica</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <>
                      <RadioButton color="blue" value="J" />
                    </>
                    <View style={{ marginTop: 7 }}>
                      <Text>Pessoa Juridica</Text>
                    </View>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: "85%",
              zIndex: 99999,
            }}
            onPress={() => Click(email, password)}
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
