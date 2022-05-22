import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState({});
  const [arraycard, setArrayCard] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("idCliente").then((idCliente) => {
      setUser1({ idCliente: idCliente });
    });
    AsyncStorage.getItem("arraycard").then((arry) => {
      if (arraycard.length === 0 && arry.length > 5) {
        setArrayCard(JSON.parse(arry));
      }
    });
  }, []);

  function consultaCep(cep, sku) {
    if (cep !== "") {
      setUser({
        cep: cep,
        sku: sku,
      });
    }
  }
  async function Cartao(titular, cardnome, numero, cod, validade) {
    setArrayCard([
      {
        idcliente: user1,
        id: Object.keys(arraycard).length + 1,
        titular: titular,
        cardnome: cardnome,
        numero: numero,
        cod: cod,
        validade: validade,
      },
      ...arraycard,
    ]);

    AsyncStorage.setItem(
      "arraycard",
      JSON.stringify([
        {
          idcliente: user1,
          id: Object.keys(arraycard).length + 1,
          titular: titular,
          cardnome: cardnome,
          numero: numero,
          cod: cod,
          validade: validade,
        },
        ...arraycard,
      ])
    );
    console.log(arraycard);
  }

  async function signIn(
    email,
    password,
    idCliente,
    Nome,
    DataNasc,
    sexo,
    tipo_pessoa,
    cpf,
    rg,
    foto_cliente,
    endereco,
    cep,
    numero,
    cidade
  ) {
    if (email !== "" && password !== "") {
      AsyncStorage.setItem("email", email);
      AsyncStorage.setItem("password", password);
      AsyncStorage.setItem("idCliente", idCliente);
      AsyncStorage.setItem("Nome", Nome);
      AsyncStorage.setItem("DataNasc", DataNasc);
      AsyncStorage.setItem("sexo", sexo);
      AsyncStorage.setItem("tipo_pessoa", tipo_pessoa);
      AsyncStorage.setItem("cpf", cpf);
      AsyncStorage.setItem("rg", rg);
      AsyncStorage.setItem("foto_cliente", foto_cliente);
      AsyncStorage.setItem("endereco", endereco);
      AsyncStorage.setItem("cep", cep);
      AsyncStorage.setItem("numero", numero);
      AsyncStorage.setItem("cidade", cidade);
      setUser1({ idCliente: idCliente });
    } else if (email === "" && foto_cliente !== "") {
      AsyncStorage.setItem("foto_cliente", foto_cliente);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, Cartao, user, user1, consultaCep, arraycard }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
