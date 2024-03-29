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
import ListaPedidos from "./Src/Components/Screens/ListaPedidos";
import Cadastro from "./Src/Components/Screens/Cadastro";
import Cadastrop2 from "./Src/Components/Screens/Cadastrop2";
import Cadastrop3 from "./Src/Components/Screens/Cadastrop3";
import MeusEnderecos from "./Src/Components/Screens/MeusEnderecos";
import ExcluirFavorito from "./Src/Components/ExcluirFavorito";
import Buscar from "./Src/Components/Buscar";
import Add_config_endereco from "./Src/Components/Screens/Add_config_endereco";
import Add_config_cartao from "./Src/Components/Screens/Add_config_cartao";
import PasswordReset from "./Src/Components/Screens/PasswordReset";
import Cadastrofim from "./Src/Components/Cadastrofim";
import MeusCartoes from "./Src/Components/Screens/MeusCartoes";
import { LogBox } from "react-native";
import Checkout from "./Src/Components/Chekout";
import RevisaoCheckout from "./Src/Components/RevisaoCheckout";
import ParcelasCartao from "./Src/Components/ParcelasCartao";
import Pedido from "./Src/Components/Screens/Pedido";
export type TabParams = {
  Categorias: string;
  CategoriasProduto: string;
  headerTitleAlign: string;
  SubCategoriasProdutos: string;
  Produto: string;
  CarrinhoTab: string;
  ModalFilhos: string;
  ProdutoFilhos: string;
  Perfil: string;
  Login: string;
  "Lista de Pedidos": string;
  Pedido: string;
  MeusEnderecos: string;
  MeusCartoes: string;
  PasswordReset: string;
  Add_config_endereco: string;
  Add_config_cartao: string;
  Cadastro: string;
  Cadastrop2: string;
  Cadastrop3: string;
  Cadastrofim: string;
  HomeTab: string;
  Banner: string;
  Favoritos: string;
  Buscar: string;
  ExcluirFavorito: string;
  Carrinho: string;
  Endereços: string;
  "Adicionar Endereço": string;
  Checkout: string;
  "Meus Cartões": string;
  "Adicionar Cartão": string;
  Parcelas: string;
  Revisão: string;
};

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
      <Stack.Screen name="Lista de Pedidos" component={ListaPedidos} />
      <Stack.Screen name="Pedido" component={Pedido} />
      <Stack.Screen name="MeusEnderecos" component={MeusEnderecos} />
      <Stack.Screen name="MeusCartoes" component={MeusCartoes} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen
        name="Add_config_endereco"
        component={Add_config_endereco}
      />
      <Stack.Screen name="Add_config_cartao" component={Add_config_cartao} />
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
      <Stack.Screen name="Login" component={Login} />
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
      <Stack.Screen name="Adicionar Endereço" component={Add_config_endereco} />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        Options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Meus Cartões" component={MeusCartoes} />
      <Stack.Screen name="Adicionar Cartão" component={Add_config_cartao} />
      <Stack.Screen name="Parcelas" component={ParcelasCartao} />
      <Stack.Screen name="Revisão" component={RevisaoCheckout} />
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
