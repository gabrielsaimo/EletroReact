import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar } from "react-native-paper";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const navigation = useNavigation();

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
        <Appbar.Header
          style={{ backgroundColor: "blue", marginTop: 0, zIndex: 1 }}
        ></Appbar.Header>
        <View
          style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 10 }}
        ></View>
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{ color: "#1534C8" }}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center", marginTop: -38 }}>
          <View style={styles.card2}>
            <Text style={styles.texteletro}>eletrosom</Text>
            <Text style={styles.textponto}>.</Text>
            <TouchableOpacity onPress={{}}>
              <Text style={styles.textcom}>com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <Text style={{ fontSize: 30 }}>Bem vindo</Text>
          <Text>Entre ou crie sua conta Eletrosm</Text>
        </View>

        <View>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="account" />}
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
              placeholder="Seu email"
            ></TextInput>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              keyboardType={"default"}
              placeholder="Sua senha"
              secureTextEntry={true}
            ></TextInput>
          </View>
          <Text
            style={{ alignSelf: "flex-end", margin: 10 }}
            onPress={() => console.log("aqui")}
          >
            Esqueci a senha
          </Text>
        </View>
        <TouchableOpacity style={{ width: "85%" }} onPress={ClickLogin}>
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
            <Text>Acessar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    width: 300,
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
