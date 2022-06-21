import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import AuthProvider from "./Src/Contexts/Auth";
import HomeTab from "./Src/Components/Screens/HomeTab";
import Banner from "./Src/Components/Banner";
import FavoritosTab from "./Src/Components/Screens/FavoritosTab";
import PerfilTab from "./Src/Components/Screens/PerfilTab";
import Login from "./Src/Components/Screens/Login";
import Produto from "./Src/Components/Screens/Produto";
import CarrinhoTab from "./Src/Components/Screens/CarrinhoTab";
import ModalFilhos from "./Src/Components/ModalFilhos";
import ProdutoFilhos from "./Src/Components/ProdutoFilhos";
import CategoriasTab from "./Src/Components/Screens/CategoriasTab";
import CategoriasProduto from "./Src/Components/Screens/CategoriaProdutos";
import SubCategoriasProdutos from "./Src/Components/Screens/SubCategoriasProdutos";
import Pedidos from "./Src/Components/Screens/Pedidos";
import Cadastro from "./Src/Components/Screens/Cadastro";
import Cadastrop2 from "./Src/Components/Screens/Cadastrop2";
import Cadastrop3 from "./Src/Components/Screens/Cadastrop3";
import MeusEnderecos from "./Src/Components/Screens/MeusEnderecos";
import ExcluirFavorito from "./Src/Components/ExcluirFavorito";
import Buscar from "./Src/Components/Buscar";
import add_config_endereco from "./Src/Components/Screens/add_config_endereco";
import add_config_cartao from "./Src/Components/Screens/add_config_cartao";
import passwordReset from "./Src/Components/Screens/passwordReset";
import Cadastrofim from "./Src/Components/Cadastrofim";
import MeusCartoes from "./Src/Components/Screens/MeusCartoes";
import { LogBox } from "react-native";
import Checkout from "./Src/Components/Chekout";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const Categoria = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Categorias"
        component={CategoriasTab}
        options={{
          headerShown: true,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1534C8",
          },
        }}
      />
      <Stack.Screen
        name="CategoriasProduto"
        component={CategoriasProduto}
        Options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="SubCategoriasProdutos"
        component={SubCategoriasProdutos}
        options={{
          headerShown: true,
          headerTitle: "Sub Categorias",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1534C8",
          },
        }}
      />
      <Stack.Screen
        name="Produto"
        component={Produto}
        Options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen name="CarrinhoTab" component={Carrinho} />
      <Stack.Screen name="ModalFilhos" component={ModalFilhos} />
      <Stack.Screen name="ProdutoFilhos" component={ProdutoFilhos} />
    </Stack.Navigator>
  );
};
const Perfies = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={PerfilTab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Pedidos" component={Pedidos} />
      <Stack.Screen name="MeusEnderecos" component={MeusEnderecos} />
      <Stack.Screen name="MeusCartoes" component={MeusCartoes} />
      <Stack.Screen name="passwordReset" component={passwordReset} />
      <Stack.Screen
        name="add_config_endereco"
        component={add_config_endereco}
      />
      <Stack.Screen name="add_config_cartao" component={add_config_cartao} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Cadastrop2" component={Cadastrop2} />
      <Stack.Screen name="Cadastrop3" component={Cadastrop3} />
      <Stack.Screen name="Cadastrofim" component={Cadastrofim} />
    </Stack.Navigator>
  );
};
const Produtos = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerTitleAlign: "center",
          headerRight: () => (
            <IconButton
              icon="alert-outline"
              onPress={() => alert("You're awesome!")}
            />
          ),
        }}
      />
      <Stack.Screen name="CarrinhoTab" component={Carrinho} />
      <Stack.Screen
        name="Produto"
        component={Produto}
        Options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Banner" component={Banner} />
      <Stack.Screen
        name="Favoritos"
        component={FavoritosTab}
        Options={{ headerShown: false, headerTitleAlign: "center" }}
      />

      <Stack.Screen name="CategoriasProduto" component={CategoriasProduto} />
      <Stack.Screen name="Buscar" component={Buscar} />
    </Stack.Navigator>
  );
};
const Favorioto = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Favoritos"
        component={FavoritosTab}
        Options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen name="ExcluirFavorito" component={ExcluirFavorito} />
    </Stack.Navigator>
  );
};
const Carrinho = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1534C8",
        },
      }}
    >
      <Stack.Screen name="Carrinho" component={CarrinhoTab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Endereços" component={MeusEnderecos} />
      <Stack.Screen name="Adicionar Endereço" component={add_config_endereco} />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
        Options={{ headerShown: false, headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#000"
          inactiveColor="#fff"
          screenOptions={{ headerShown: false }}
          barStyle={{ backgroundColor: "#694fad" }}
          tabBarOptions={{
            keyboardHidesTabBar: true,
            tabBarStyle: [{ display: "flex" }, null],
          }}
        >
          <Tab.Screen
            name="Home"
            component={Produtos}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={24}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Categoria"
            component={Categoria}
            options={{
              tabBarLabel: "Categoria",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="menu" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Carrinho"
            component={Carrinho}
            options={{
              tabBarLabel: "Carrinho",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cart" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorito"
            component={Favorioto}
            options={{
              tabBarLabel: "Favorito",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="heart-outline"
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Perfils"
            component={Perfies}
            options={{
              tabBarLabel: "Perfil",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={24}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
