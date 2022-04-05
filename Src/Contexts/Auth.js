import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  function consultaCep(cep, sku) {
    if (cep !== "") {
      setUser({
        cep: cep,
        sku: sku,
      });

      //navigation.goBack();
    }
  }

  function signIn(email, password) {
    if (email !== "" && password !== "") {
      setUser({
        email: email,
        password: password,
      });

      navigation.goBack();
    }
  }
  
  console.log(user);
  return (
    <AuthContext.Provider value={{ signIn, user ,consultaCep}}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
