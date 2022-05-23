import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState({});
  const [array, setArray] = useState("");
  const [exclui, setExclui] = useState(false);
  const [arraycard, setArrayCard] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("idCliente").then((idCliente) => {
      setUser1({ idCliente: idCliente });
    });
    AsyncStorage.getItem("arraycard").then((arry) => {
      if (arraycard.length === 0 && arry.length > 0 && !exclui) {
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
  async function Cartao(titular, cardnome, numero, cod, validade, exluir) {
    if (exluir === undefined) {
      var id = Object.keys(arraycard).length + 1;
      var key = id.toString();
      arraycard.map((i, k) => {
        i.key === key ? (key = key + 1) : key;
      });
      setArrayCard([
        {
          idcliente: user1.idCliente,
          key: key,
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
            idcliente: user1.idCliente,
            key: key,
            titular: titular,
            cardnome: cardnome,
            numero: numero,
            cod: cod,
            validade: validade,
          },
          ...arraycard,
        ])
      );
    } else {
      AsyncStorage.setItem("arraycard", JSON.stringify(exluir));
    }
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
      value={{
        signIn,
        Cartao,
        consultaCep,
        arraycard,
        user,
        user1,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
