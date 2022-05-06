import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";

export default function Cadastrofim({ route }) {
  console.log(route.params);
  const { width, height } = Dimensions.get("window");
  const bottom = height - 90;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(true);
  if (route.params !== undefined) {
    setName(route.params.nome);
    setEmail(route.params.email);
  }
  function click() {
    setVisible(false);
    navigation.navigate("Login");
  }

  return (
    <>
      <Modal visible={visible} transparent={false}>
        <View style={{ backgroundColor: "#1534C8", height: "99%" }}>
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            <View style={styles.card2}>
              <Text style={styles.texteletro}>eletrosom</Text>
              <Text style={styles.textponto}>.</Text>
              <Text style={styles.textcom}>com</Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <IconButton
              icon={require("../Components/assets/perfil_fim.png")}
              color={"#fff"}
              size={150}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#9BCB3D",
                borderRadius: 50,
                marginTop: "-20%",
                marginLeft: "35%",
                alignItems: "center",
              }}
            >
              <IconButton
                style={{ marginTop: 8 }}
                icon={require("../Components/assets/ok_fim.png")}
                color={"#fff"}
                size={18}
              />
            </View>
            <View
              style={{
                height: 50,
                borderRadius: 3,
                alignItems: "center",
                alignContent: "center",
                paddingVertical: 10,
                alignSelf: "center",
                marginTop: 30,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
                Conta criada com sucesso
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: "1%", flexDirection: "row" }}>
          <View
            style={{ backgroundColor: "#FFDB00", height: "100%", width: "25%" }}
          ></View>
          <View
            style={{ backgroundColor: "#FFE233", height: "100%", width: "25%" }}
          ></View>
          <View
            style={{ backgroundColor: "#FFE966", height: "100%", width: "25%" }}
          ></View>
          <View
            style={{ backgroundColor: "#FFF199", height: "100%", width: "25%" }}
          ></View>
        </View>

        <TouchableOpacity
          style={{ width: "85%", position: "absolute", marginTop: bottom }}
          onPress={() => click()}
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
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#1534C8" }}
            >
              Finalizar
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
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
