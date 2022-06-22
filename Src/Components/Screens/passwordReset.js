import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { Appbar } from "react-native-paper";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
const { URL_PROD } = process.env;
export default function passwordReset({ route }) {
  const sendemail = route.params.emaill;

  const [email, setEmail] = useState(sendemail ? sendemail : "");

  const navigation = useNavigation();

  const Enviar = async () => {
    if (email != "") {
      await fetch(`${URL_PROD}esqueceuSenha`, {
        method: "PUT",
        headers: {
          Accept: "aplication/json",
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          cliente: { email: email },
          template: "email_reset",
          websiteId: 1,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          console.log(email);
          console.log(resData);
          if (resData.mensagem == 200) {
            Alert.alert("Ops!", "Email de redefinição enviado", [
              {
                text: "ok",
                onPress: () => console.log("ok"),
              },
            ]);
          } else {
            alert(resData.mensagem);
          }
        });
    }
  };

  function Click() {
    Enviar();
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
              placeholder="Seu email"
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={{ width: "90%" }} onPress={Click}>
          <View
            style={{
              height: 50,
              backgroundColor: "#FFDB00",
              borderRadius: 3,
              marginTop: 100,
              alignItems: "center",
              alignContent: "center",
              paddingVertical: 15,
            }}
          >
            <Text>Enviar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 150,
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
