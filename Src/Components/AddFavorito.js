import React, { useContext, useState } from "react";
import { AuthContext } from "../../Src/Contexts/Auth";
const { URL_PROD } = process.env;
export default function AddFavorito({ route }) {
  const { user1 } = useContext(AuthContext);
  const sku = route.params.sku;
  const page = route.params.page;
  const Add = async () => {
    await fetch(`${URL_PROD}addFavoritos`, {
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
      .then((resData) => {});
  };

  Add();
  return <></>;
}
