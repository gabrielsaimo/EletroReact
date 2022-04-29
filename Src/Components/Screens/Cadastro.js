import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { TextInput } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PassMeter from "react-native-passmeter";
const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Muito curto", "Fraco", "Normal", "Forte", "Muito Forte"];
export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ paddingBottom: 300 }}>
      <View>
        <Appbar.Header style={{ backgroundColor: "#1534C8"}}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
          ></Appbar.BackAction>
          <Appbar.Content
            titleStyle={{ textAlign: "center", fontSize: 20 }}
            title={"Seu perfil"}
          />
          <Appbar.Action></Appbar.Action>
        </Appbar.Header>
        <View
          style={{
            backgroundColor: "#9BCB3D",
            width: "25%",
            height: 5,
            marginTop: 0,
            zIndex: 1,
          }}
        ></View>
      </View>

      <View style={{ alignItems: "center", marginTop: "1%" }}>
        <View style={{ width: "100%" }}>
          <View style={{ width: "100%", marginLeft: "5%" }}>
            <Text style={{ marginTop: 50 }}>E-mail</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType={"email-address"}
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
              placeholder="Insira seu email"
            ></TextInput>
            <Text style={{ marginTop: 50 }}>Senha</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              maxLength={15}
              mode="outlined"
              onChangeText={(text) => setPassword(text)}
              placeholder="Insira sua senha"
              secureTextEntry={true}
            />
            <View style={{ marginLeft: "-10%", marginTop: 10 }}>
              <PassMeter
                showLabels
                password={password}
                maxLength={MAX_LEN}
                minLength={MIN_LEN}
                labels={PASS_LABELS}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "85%",
            position: "absolute",
            marginTop: "80%",
            zIndex: 99999,
          }}
          onPress={() => [
            navigation.push("Cadastrop2", {
              email: email,
              senha: password,
            }),
          ]}
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
