import React, { useState, useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Contexts/Auth";
export default function Local() {
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  AsyncStorage.getItem("endereco").then((endereco) => {
    setEndereco(endereco);
  });
  AsyncStorage.getItem("cep").then((cep) => {
    setCep(cep);
  });
  AsyncStorage.getItem("numero").then((numero) => {
    setNumero(numero);
  });

  console.log(cidade);
  const meucep = async () => {
    AsyncStorage.getItem("idCliente").then((idCliente) => {
      setId(idCliente);
    });

    await fetch(
      "https://www.eletrosom.com/shell/ws/integrador/listaMeusEnderecos?idCliente=" +
        id
    )
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setCep(resData.cep);
        setEndereco(resData.endereco);
        setNumero(resData.numero);
        setCidade(resData.cidade);
      });
  };
  if (cep === undefined && cidade === undefined) {
    useEffect(() => {
      meucep();
    });
  }
  return (
    <View style={{ zIndex: 100 }}>
      <Pressable onPress={() => ({})}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1534C8",
            color: "white",
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} style={{ color: "white" }} />
          {cidade ? (
            <Text style={styles.text}>
              Utilize a sua localização para ver disponibilidade
            </Text>
          ) : (
            <Text style={styles.text}>Enviar para: {cep}</Text>
          )}
          <FontAwesomeIcon icon={faAngleRight} style={{ color: "white" }} />
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    padding: 5,
    backgroundColor: "#1534C8",
    color: "#fff",
  },
});
