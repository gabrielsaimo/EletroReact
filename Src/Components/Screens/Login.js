import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../Contexts/Auth";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  function ClickLogin() {
    signIn(email, password, visible);
  }
  return (
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
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    width: 300,
    fontSize: 16,
  },
});
