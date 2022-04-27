import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity,TextInput } from "react-native";
import { SafeAreaView } from "react-navigation";
import { AuthContext } from "../../Contexts/Auth";
import { Appbar } from "react-native-paper";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import PassMeter from "react-native-passmeter";
const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Muito curto", "Fraco", "Normal", "Forte", "Muito Forte"];
export default function Cadastro() {
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

      <View style={{ alignItems: "center" ,marginTop:'1%'}}>


        <View style={{ width: "100%" }}>
          <View style={{ width: "100%", marginLeft: "5%" }}>
              <Text style={{marginTop:50}}>Email</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType={"email-address"}
              backgroundColor={'#FFF'}
              height={50}
              borderRadius={5}
              onChangeText={(text) => setEmail(text)}
              placeholder="Seu email"
            ></TextInput>
            <Text style={{marginTop:50}}>Senha</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              maxLength={15}
              backgroundColor={'#FFF'}
              height={50}
              borderRadius={5}
              onChangeText={(text) => setPassword(text)}
              placeholder="Sua senha"
              secureTextEntry={true}
            />
            <View style={{marginLeft:'-10%',marginTop:10}}>
              <PassMeter
                showLabels
                password={password}
                maxLength={MAX_LEN}
                minLength={MIN_LEN}
                labels={PASS_LABELS}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ width: "85%" ,position:'absolute',marginTop:'80%'}} onPress={ClickLogin}>
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
    marginTop: 10,
    width: "90%",
    fontSize: 16,
    borderWidth:1,
    borderColor:'#6A7075',
    paddingLeft: 15
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
