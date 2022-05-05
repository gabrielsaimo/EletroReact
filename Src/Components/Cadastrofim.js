import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Cadastrofim({ route }) {
  console.log(route.params);
  const { width, height } = Dimensions.get("window");
  const bottom = height - 150;
  const navigation = useNavigation();
  if (route.params !== undefined) {
    const nome = route.params.nome;
    const email = route.params.email;
    const pessoa = route.params.pessoa;
  }

  return (
    <>
      <View style={{ backgroundColor: "#1534C8", height: "100%" }}>
        <View style={{ alignSelf: "center", marginTop: 50 }}>
          <View style={styles.card2}>
            <Text style={styles.texteletro}>eletrosom</Text>
            <Text style={styles.textponto}>.</Text>
            <Text style={styles.textcom}>com</Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
            borderRadius: 3,
            alignItems: "center",
            alignContent: "center",
            paddingVertical: 10,
            alignSelf: "center",
            marginTop: "90%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
            Conta criada com sucesso
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{ width: "85%", position: "absolute", marginTop: bottom }}
        onPress={() => navigation.navigate("Perfil")}
      >
        <View
          style={{
            height: 50,
            backgroundColor: "#FFDB00",
            borderRadius: 3,
            alignItems: "center",
            alignContent: "center",
            paddingVertical: 10,
            marginLeft: "18%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#1534C8" }}>
            Finalizar
          </Text>
        </View>
      </TouchableOpacity>
    </>
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
    color: "#FFF",
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
    color: "#FFF",
    marginLeft: 3,
  },
});
