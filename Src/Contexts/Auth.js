import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState({});
  const [arrayCompra, setArrayCompra] = useState([]);
  const [multcar, setMultcar] = useState([]);
  const [uncar, setUncar] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [Comprar, setCompra] = useState([]);
  const [exclui, setExclui] = useState(false);
  const [arraycard, setArrayCard] = useState([]);
  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem("idCliente").then((idCliente) => {
      setUser1({ idCliente: idCliente });
    });
    AsyncStorage.getItem("arraycard").then((arry) => {
      if (arraycard.length === 0 && arry.length > 0 && !exclui) {
        setArrayCard(JSON.parse(arry));
      }
    });

    //! cache carrinho
    AsyncStorage.getItem("multcar").then((mult) => {
      if (
        (mult.length > 0 && multcar.length === 0) ||
        multcar.length === undefined
      ) {
        setCarrinho(JSON.parse(mult));
        setMultcar(mult);
      }
    });
    if (carrinho.length === 0) {
    } else {
      const gg = JSON.stringify(carrinho);
      gg.replace(/[.!'@,><|://\\;&*()_+=]/g, "");
      const gs = gg
        .replace(/[!'@,><|://\\;&*()_+=]/g, "")
        .replace("}{", "},{")
        .replace(/""/g, '":"')
        .replace(/":"q/g, '","q')
        .replace(/":"k/g, '","k')
        .replace(/""/g, '"')
        .replace(/":"}/g, '"}');

      setMultcar(gs);
      AsyncStorage.setItem("multcar", gs);
    }
    if (Comprar.length === 0) {
    } else {
      const gg = JSON.stringify(Comprar);
      gg.replace(/[.!'@,><|://\\;&*()_+=]/g, "");
      const gs = gg
        .replace(/[!'@,><|://\\;&*()_+=]/g, "")
        .replace("}{", "},{")
        .replace(/""/g, '":"')
        .replace(/":"q/g, '","q')
        .replace(/":"k/g, '","k')
        .replace(/""/g, '"')
        .replace(/":"}/g, '"}');

      setUncar(gs);
      AsyncStorage.setItem("uncar", gs);
    }
    return () => {
      isMounted = false;
    };
  }, [multcar, carrinho, Comprar]);

  function consultaCep(cep, sku) {
    if (cep !== "") {
      setUser({
        cep: cep,
        sku: sku,
      });
    }
  }
  async function Compra(sku, qtde, excluir, editar) {
    if (sku != undefined) {
      var id = Object.keys(arraycard).length + 1;
      var key = user1.idCliente;
    } else if (excluir != undefined) {
      setMultcar(
        excluir
          .replace(/[!'@,><|://\\;&*()_+=]/g, "")
          .replace("}{", "},{")
          .replace(/""/g, '":"')
          .replace(/":"q/g, '","q')
          .replace(/":"k/g, '","k')
          .replace(/""/g, '"')
          .replace(/":"}/g, '"}')
      );
      setCarrinho(
        JSON.parse(
          excluir
            .replace(/[!'@,><|://\\;&*()_+=]/g, "")
            .replace("}{", "},{")
            .replace(/""/g, '":"')
            .replace(/":"q/g, '","q')
            .replace(/":"k/g, '","k')
            .replace(/""/g, '"')
            .replace(/":"}/g, '"}')
        )
      );
    }
    if (editar != undefined) {
      setMultcar(
        editar
          .replace(/[!'@,><|://\\;&*()_+=]/g, "")
          .replace("}{", "},{")
          .replace(/""/g, '":"')
          .replace(/":"q/g, '","q')
          .replace(/":"k/g, '","k')
          .replace(/""/g, '"')
          .replace(/":"}/g, '"}')
      );
      setCarrinho(
        JSON.parse(
          editar
            .replace(/[!'@,><|://\\;&*()_+=]/g, "")
            .replace("}{", "},{")
            .replace(/""/g, '":"')
            .replace(/":"q/g, '","q')
            .replace(/":"k/g, '","k')
            .replace(/""/g, '"')
            .replace(/":"}/g, '"}')
        )
      );
      AsyncStorage.setItem(
        "multcar",
        editar
          .replace(/[!'@,><|://\\;&*()_+=]/g, "")
          .replace("}{", "},{")
          .replace(/""/g, '":"')
          .replace(/":"q/g, '","q')
          .replace(/":"k/g, '","k')
          .replace(/""/g, '"')
          .replace(/":"}/g, '"}')
      );
    }

    setArrayCompra(sku);
  }
  async function confiCompra(sku, qtde, excluir, editar) {
    if (sku != undefined) {
      var id = Object.keys(arraycard).length + 1;
      var key = user1.idCliente;
    } else if (excluir != undefined) {
      setUncar(
        excluir
          .replace(/[!'@,><|://\\;&*()_+=]/g, "")
          .replace("}{", "},{")
          .replace(/""/g, '":"')
          .replace(/":"q/g, '","q')
          .replace(/":"k/g, '","k')
          .replace(/""/g, '"')
          .replace(/":"}/g, '"}')
      );
      setCompra(
        JSON.parse(
          excluir
            .replace(/[!'@,><|://\\;&*()_+=]/g, "")
            .replace("}{", "},{")
            .replace(/""/g, '":"')
            .replace(/":"q/g, '","q')
            .replace(/":"k/g, '","k')
            .replace(/""/g, '"')
            .replace(/":"}/g, '"}')
        )
      );
    }
    if (editar != undefined) {
      setUncar(
        editar
          .replace(/[!'@,><|://\\;&*()_+=]/g, "")
          .replace("}{", "},{")
          .replace(/""/g, '":"')
          .replace(/":"q/g, '","q')
          .replace(/":"k/g, '","k')
          .replace(/""/g, '"')
          .replace(/":"}/g, '"}')
      );
      setCompra(
        JSON.parse(
          editar
            .replace(/[!'@,><|://\\;&*()_+=]/g, "")
            .replace("}{", "},{")
            .replace(/""/g, '":"')
            .replace(/":"q/g, '","q')
            .replace(/":"k/g, '","k')
            .replace(/""/g, '"')
            .replace(/":"}/g, '"}')
        )
      );
    }

    setArrayCompra(sku);
  }

  function Compras(sku, qtde, excluir) {
    console.log(sku);
    console.log([
      {
        sku: sku,
        qtde: "1",
        key: "1",
      },
    ]);
    setCompra([{ sku: sku, qtde: "1", key: "1" }]);
  }

  async function Carrinho(sku, qtde, excluir) {
    if (excluir === undefined) {
      var id = Object.keys(multcar).length + 1;
    }
    if (carrinho.length === undefined) {
      setCarrinho([
        { sku: sku, qtde: "1", key: JSON.stringify(user1.idCliente) },
      ]);
    } else {
      setCarrinho([
        { sku: sku, qtde: "1", key: JSON.stringify(user1.idCliente) },
        ...carrinho,
      ]);
    }
  }

  async function Cartao(titular, cardnome, numero, cod, validade, excluir) {
    if (excluir === undefined) {
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
      setExclui(true);
      AsyncStorage.setItem("arraycard", JSON.stringify(excluir));
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
        Compra,
        consultaCep,
        Carrinho,
        Compras,
        confiCompra,
        arrayCompra,
        Comprar,
        multcar,
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
