import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { AuthContext } from "../../Contexts/Auth";
import { TextInput } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
export default function Cadastrop2({ route }) {
    const email = route.params.email;
    const password = route.params.senha;
  const [CPF, setCpf] = useState("");
  const [Nome, setNome] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
console.log(email,password);
  const Logar = async () => {
    if (email != "" && password != "") {
      await fetch("https://www.eletrosom.com/shell/ws/integrador/login", {
        method: "POST",
        headers: {
          Accept: "aplication/json",
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          cliente: { login: email, senha: password },
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.codigoMensagem == 200) {
            const idCliente = resData.dados_cliente.IdCliente;
            const Nome = resData.dados_cliente.nome;
            const DataNasc = resData.dados_cliente.data_nasc;
            const Sexo = resData.dados_cliente.sexo;
            const TipoPessoa = resData.dados_cliente.tipo_pessoa;
            const Cpf = resData.dados_cliente.cpf;
            const Rg = resData.dados_cliente.rg;
            const FotoCliente = resData.dados_cliente.foto_cliente;

            fetch(
              "https://www.eletrosom.com/shell/ws/integrador/listaMeusEnderecos?idCliente=" +
                idCliente
            )
              .then((ress) => ress.json())
              .then((resDatas) => {
                const Endereco = resDatas.endereco;
                const numero = resDatas.numero;
                const cep = resDatas.cep;
                const cidade = resDatas.cidade;
                console.log(cidade);
                console.log(resDatas);
                signIn(
                  email,
                  password,
                  idCliente,
                  Nome,
                  DataNasc,
                  Sexo,
                  TipoPessoa,
                  Cpf,
                  Rg,
                  FotoCliente,
                  Endereco,
                  cep,
                  numero,
                  cidade
                );
              });

            setTimeout(() => {
              navigation.reset({
                routes: [{ name: "Perfils" }],
                key: null,
                initial: false,
              });
              navigation.goBack();
            }, 1500);
          } else if (resData.codigoMensagem == 317) {
            alert("Login ou Senha Inválidos");
          } else {
            alert("Erro ao logar");
          }
        });
    }
  };

  function ClickLogin() {
    Logar();
  }
  return (
    <SafeAreaView>
      <View>
        <Appbar.Header style={{ backgroundColor: "#1534C8", zIndex: 2 }}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
          ></Appbar.BackAction>
          <Appbar.Content
            titleStyle={{ textAlign: "center", fontSize: 20 }}
            title={"Seu perfil"}
          />
          <Appbar.Action></Appbar.Action>
        </Appbar.Header>
        <View
          style={{
            backgroundColor: "#9BCB3D",
            width: "50%",
            height: 5,
            marginTop: 0,
            zIndex: 1,
          }}
        ></View>
      </View>

      <View style={{ alignItems: "center", marginTop: "1%" }}>
        <View style={{ width: "100%" }}>
          <View style={{ width: "100%", marginLeft: "5%" }}>
            <Text style={{ marginTop: 50 }}>E-mail</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType={"decimal-pad"}
              mode="outlined"
              onChangeText={(text) => setCpf(text)}
              placeholder="Insira seu CPF"
            ></TextInput>
            <Text style={{ marginTop: 50 }}>Senha</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              maxLength={15}
              mode="outlined"
              onChangeText={(text) => setNome(text)}
              placeholder="Nome completo"
              secureTextEntry={true}
            />
            <View style={{ marginLeft: "-10%", marginTop: 10 }}></View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "85%",
            position: "absolute",
            marginTop: "80%",
            zIndex: 99999,
          }}
          onPress={() => [
            navigation.push("Cadastrop2", {
              emial: email,
              password: password,
            }),
          ]}
        >
          <View
            style={{
              height: 50,
              backgroundColor: "#FFDB00",
              borderRadius: 3,
              alignItems: "center",
              alignContent: "center",
              paddingVertical: 15,
            }}
          >
            <Text>Continuar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    fontSize: 16,
  },
  card2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    //justifyContent:'space-around'
  },
  texteletro: {
    fontSize: 30,
    color: "#1534C8",
    fontWeight: "bold",
    marginLeft: 3,
  },
  textponto: {
    fontSize: 30,
    color: "#FFDB00",
    fontWeight: "bold",
    marginLeft: 3,
  },
  textcom: {
    fontSize: 30,
    color: "#1534C8",
    marginLeft: 3,
  },
});
