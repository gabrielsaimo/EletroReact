import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
const { URL_PROD } = process.env;
import { AuthContext } from "../../Contexts/Auth";
import { SafeAreaView } from "react-navigation";
import { TextInputMask } from "react-native-masked-text";
import { IconButton } from "react-native-paper";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

export default function Add_config_cartao({ route }) {
  const { Cartao, arraycard } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [validade, setValidade] = useState("");
  const [arraycards, setArray] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const Edite = async () => {
    setLoading(true);
    if (numero.length >= 16 || route.params.numero.length === 17) {
      if (nome.length > 0) {
        if (validade.length === 7) {
          await fetch(`${URL_PROD}validarCartao`, {
            method: "POST",
            headers: {
              Accept: "aplication/json",
              "Content-type": "aplication/json",
            },
            body: JSON.stringify({
              card: numero,
              version: 16,
            }),
          })
            .then((res) => res.json())
            .then((resData) => {
              setData(resData);
              if ([numero, nome, validade] !== [undefined, null, ""]) {
                setArray([
                  {
                    titular: nome,
                    cardnome: resData.nome,
                    numero: numero,
                    cod: resData.codigo,
                    valiade: validade,
                  },
                  ...arraycards,
                ]);
                Cartao(nome, resData.nome, numero, resData.codigo, validade);
              }
              navigation.goBack();
            })
            .catch((error) => {
              console.error(error + " Add_config_cartao.js");
              alert("Cartão não aceito");
              setLoading(false);
            });
        } else {
          alert("Validade incorreta");
          setLoading(false);
        }
      } else {
        alert("Nome do titular vazio!");
        setLoading(false);
      }
    } else {
      alert("Dados de cartão incorretos");
      setLoading(false);
    }
    return;
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <View
        style={
          route.params.rota === "Checkout"
            ? { marginTop: 20 }
            : { marginTop: 80 }
        }
      >
        <View style={{ alignSelf: "flex-start", marginLeft: "85%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "blue" }}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center", marginTop: -43 }}>
          <View style={styles.card2}>
            <IconButton
              style={{ marginLeft: 0 }}
              icon={require("../../Components/assets/card_icon.png")}
              color="blue"
              size={35}
            />
            <View style={{ marginLeft: -10 }}>
              <Text>Adicionar cartão de crédito</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginBottom: 150 }}>
          <View style={{ width: "85%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.uptext}>Numero do cartão</Text>
              <Text style={{ color: "red", marginBottom: -10, marginTop: 5 }}>
                *
              </Text>
            </View>
            <TextInputMask
              style={styles.input}
              underlineColorAndroid="transparent"
              type={"credit-card"}
              maxLength={19}
              borderWidth={1}
              borderColor={"#A0A5AA"}
              backgroundColor={"#fff"}
              paddingHorizontal={10}
              borderRadius={5}
              onChangeText={(text) => setNumero(text)}
              placeholder="0000 0000 0000 0000"
              value={numero}
            ></TextInputMask>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "100%", marginRight: "4%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.uptext}>Nome do titular</Text>
                  <Text
                    style={{ color: "red", marginBottom: -10, marginTop: 5 }}
                  >
                    *
                  </Text>
                </View>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setNome(text)}
                  editable={true}
                  value={nome}
                  placeholder="Nome que contem no cartão"
                ></TextInput>
              </View>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ width: "48%", marginRight: "4%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.uptext}>Validade</Text>
                  <Text
                    style={{ color: "red", marginBottom: -10, marginTop: 5 }}
                  >
                    *
                  </Text>
                </View>
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "MM/YYYY",
                  }}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  editable={true}
                  maxLength={7}
                  onChangeText={(text) => setValidade(text)}
                  placeholder="00/0000"
                >
                  {}
                </TextInputMask>
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={isLoading}
            style={{ width: "85%" }}
            onPress={() => Edite()}
          >
            <View style={styles.btnadd}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text>Adicionar cartão</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    height: 50,
    width: "100%",
    fontSize: 16,
    borderColor: "#A0A5AA",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
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
  uptext: {
    marginBottom: -10,
    marginTop: 10,
    marginLeft: 1,
    color: "#6A7075",
  },
  btnadd: {
    height: 50,
    backgroundColor: "#FFDB00",
    borderRadius: 5,
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 15,
    marginTop: 50,
  },
});
