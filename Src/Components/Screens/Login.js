import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
export default function Login() {
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
            left={<TextInput.Icon name="account" />}
            placeholder="Seu email"
          ></TextInput>
          <TextInput
            style={styles.input}
            left={<TextInput.Icon name="lock" />}
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
      <TouchableOpacity
        style={{ width: "85%" }}
        onPress={() => setVisibleLogin(false)}
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
