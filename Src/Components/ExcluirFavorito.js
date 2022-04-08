import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ExcluirFavorito({ route }) {
  const navigation = useNavigation();
  AsyncStorage.getItem("idCliente").then((idCliente) => {
    setId(idCliente);
  });

  const sku = route.params.sku;
  const page = route.params.page;
  const [id, setId] = useState("");
  const Excluir = async () => {
    await fetch(
      "https://www.eletrosom.com/shell/ws/integrador/excluirFavoritos",
      {
        method: "POST",
        headers: {
          Accept: "aplication/json",
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          cliente: id,
          sku: sku,
          version: 15,
        }),
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setTimeout(
            () => { navigation.reset({
              routes: [{ name: page }],
              
            })
            navigation.goBack(); },
            0
          )
      });
  };

  Excluir();
  return <></>;
}
