import React, { useEffect, useState} from "react";
import { Text, View } from "react-native";

export default function CepCorreios({ cep, sku }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  console.log(sku);

  useEffect(() => {
    fetch("https://viacep.com.br/ws/" + cep + "/json/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error + " produtoFilhos.js"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{marginTop:-15}} >
      {!data ? (
        <Text>cep invalido</Text>
      ) : (
        <View>
          <Text>Envio para {data.logradouro} - {data.bairro}</Text>
          <Text>{data.localidade}  {data.cep}</Text>
        </View>
      )}
    </View>
  );
}

