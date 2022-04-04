import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export const CepContext = createContext({});

function CepProvider({ children }) {
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
  console.log(user);
  return (
    <CepContext.Provider value={{ signIn, user }}>
      {children}
    </CepContext.Provider>
  );
}
export default CepProvider;
