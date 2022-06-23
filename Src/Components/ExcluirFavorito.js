import { AuthContext } from "../../Src/Contexts/Auth";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { URL_PROD } = process.env;
export default function ExcluirFavorito({ route }) {
  const { user1 } = useContext(AuthContext);
  const navigation = useNavigation();
  const sku = route.params.sku;
  const page = route.params.page;
  const Excluir = async () => {
    await fetch(`${URL_PROD}excluirFavoritos`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        cliente: user1.idCliente,
        sku: sku,
        version: 15,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        navigation.reset({
          routes: [{ name: page }],
        });
        navigation.goBack();
      });
  };

  Excluir();
  return <></>;
}
