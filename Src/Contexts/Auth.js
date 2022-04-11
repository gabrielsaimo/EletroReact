import React, { createContext, useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState({});
  
  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem("idCliente").then((idCliente) => {
      setUser1({idCliente:idCliente});
      console.log("🚀 ~ file: Auth.js ~ line 9 ~ AuthProvider ~ user1", user1)
    });
  }, []);

 
  function consultaCep(cep, sku) {
    if (cep !== "") {
      setUser({
        cep: cep,
        sku: sku,
      });

      //navigation.goBack();
    }
  }
 
  function signIn(
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
    numero,cidade
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

      setUser1({idCliente:idCliente});
      
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user,user1, consultaCep}}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
