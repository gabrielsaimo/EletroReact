import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AddFavorito({ route }) {
  const navigation = useNavigation();
  AsyncStorage.getItem("idCliente").then((idCliente) => {
    setId(idCliente);
  });

  const sku = route.params.sku;
  const page = route.params.page;
  const [id, setId] = useState("");
  const Add = async () => {
    await fetch("https://www.eletrosom.com/shell/ws/integrador/addFavoritos", {
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
    })
      .then((res) => res.json())
      .then((resData) => {
        setTimeout(
            () => { navigation.reset({
              routes: [{ name: page }],
              key:null,
              initial: false,
            })
             },
            0
          )
      });
  };

  Add();
  return <></>;
}
