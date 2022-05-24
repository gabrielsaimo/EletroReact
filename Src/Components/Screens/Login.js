import React, { useContext, useState } from "react";
const { CLIENTE_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { URL_PROD } = process.env;
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { AuthContext } from "../../Contexts/Auth";
import * as AuthSession from "expo-auth-session";
import { Appbar } from "react-native-paper";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const [load, setLoad] = useState(false);

  const navigation = useNavigation();

  async function handleSingIn() {
    const RESPONSE_YPE = "token";
    const SCOPE = encodeURI("profile email");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENTE_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_YPE}&scope=${SCOPE}`;

    const response = await AuthSession.startAsync({ authUrl });
    if (response.type === "success") {
      console.log("ok");
      loadProfile();
      async function loadProfile() {
        const response2 = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${response.params.access_token}`
        );
        const userInfo = await response2.json();
        console.log(userInfo);
      }
    }
  }
  const Logar = async () => {
    if (email != "" && password != "") {
      setLoad(true);
      await fetch(`${URL_PROD}/shell/ws/integrador/login`, {
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
              `${URL_PROD}/shell/ws/integrador/listaMeusEnderecos?idCliente=${idCliente}`
            )
              .then((ress) => ress.json())
              .then((resDatas) => {
                const Endereco = resDatas.endereco;
                const numero = resDatas.numero;
                const cep = resDatas.cep;
                const cidade = resDatas.cidade;
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
              })
              .catch((error) => console.log(error));

            setTimeout(() => {
              navigation.reset({
                routes: [{ name: "Perfils" }],
                key: null,
                initial: false,
              });
              navigation.goBack();
            }, 1000);
          } else if (resData.codigoMensagem == 317) {
            alert("Login ou Senha Inválidos");
            setLoad(false);
          } else {
            alert("Erro ao logar");
            setLoad(false);
          }
        });
    }
  };

  async function ClickLogin() {
    await Logar();
  }
  return (
    <SafeAreaView>
      <View>
        <Appbar.Header
          style={{ backgroundColor: "#1534C8", marginTop: 0, zIndex: 1 }}
        ></Appbar.Header>
        <View
          style={{ backgroundColor: "#FFDB00", zIndex: 1, height: 10 }}
        ></View>
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
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
          <Text style={{ color: "#6A7075" }}>
            Entre ou crie sua conta Eletrosm
          </Text>
        </View>
        <Text style={{ color: "#6A7075" }}>Inciar sessão com:</Text>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <TouchableOpacity
            onPress={() => handleSingIn()}
            style={{
              width: 150,
              height: 50,
              backgroundColor: "#E9ECEF",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 25,
                width: 112,
                marginTop: "auto",
                marginBottom: "auto",
              }}
              source={require("../assets/google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={{}}
            style={{
              width: 150,
              height: 50,
              backgroundColor: "#E9ECEF",
              borderRadius: 10,
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Image
              style={{
                height: 25,
                width: 120,
                marginTop: "auto",
                marginBottom: "auto",
              }}
              source={require("../assets/facebook.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text style={{ color: "#6A7075" }}>Ou use seu e-mail:</Text>
          </View>

          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="account" />}
              keyboardType={"email-address"}
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
              placeholder="Seu email"
            ></TextInput>
            <TextInput
              mode="outlined"
              style={styles.input}
              underlineColorAndroid="transparent"
              left={<TextInput.Icon name="lock" />}
              onChangeText={(text) => setPassword(text)}
              placeholder="Sua senha"
              secureTextEntry={true}
            />
          </View>
          <Text
            style={{
              alignSelf: "flex-end",
              margin: 10,
              color: "#6A7075",
              fontWeight: "bold",
            }}
            onPress={() =>
              navigation.navigate("passwordReset", { emaill: email })
            }
          >
            Esqueci a senha
          </Text>
        </View>
        <TouchableOpacity
          disabled={load}
          style={{ width: "85%" }}
          onPress={ClickLogin}
        >
          {!load ? (
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
          ) : (
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
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text
            style={{
              fontSize: 20,
              color: "#1534C8",
              marginLeft: 3,
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            Criar conta eletrosom
          </Text>
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
