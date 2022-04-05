import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar } from "react-native-paper";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  function ClickLogin() {
    signIn(email, password, visible);
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
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <Text style={{ fontSize: 30 }}>Bem vindo</Text>
          <Text>Entre ou crie sua conta Eletrosm</Text>
        </View>

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
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              keyboardType={"default"}
              placeholder="Sua senha"
              secureTextEntry={true}
            ></TextInput>
          </View>
          <Text
            style={{ alignSelf: "flex-end", margin: 10 }}
            onPress={() => console.log("aqui")}
          >
            Esqueci a senha
          </Text>
        </View>
        <TouchableOpacity style={{ width: "85%" }} onPress={ClickLogin}>
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
            <Text>Acessar</Text>
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
