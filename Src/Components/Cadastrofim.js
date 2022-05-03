import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Cadastrofim({ route }) {
    console.log(route.params);
  const nome = route.params.nome;
  const email = route.params.email;
  const pessoa = route.params.pessoa;
  function Click() {
    const navigation = useNavigation();
    navigation.navigate("Login");
  }
  return (
    <View style={{ backgroundColor: "#1534C8" }}>
      <Text>Deu Bom</Text>
      <TouchableOpacity style={{ width: "85%" }} onPress={Click}>
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
