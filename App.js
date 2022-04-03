import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
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
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
console.disableYellowBox = true;

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
        name="Produto"
        component={Produto}
        Options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen name="CarrinhoTab" component={CarrinhoTab} />
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
      <Stack.Screen
        name="Produto"
        component={Produto}
        Options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Banner" component={Banner} />
    </Stack.Navigator>
  );
};

export default function App() {
  const ButtonAlert = () =>
    Alert.alert("Teste Alert", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  return (
    <NavigationContainer>
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
              <MaterialCommunityIcons name="home" color={color} size={24} />
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
          component={CarrinhoTab}
          options={{
            tabBarLabel: "Carrinho",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cart-outline"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritosTab}
          options={{
            tabBarLabel: "Favoritos",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="heart-outline"
                color={color}
                size={24}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              alert("Logue para acessar");
            },
          }}
        />
        <Tab.Screen
          name="Perfils"
          component={Perfies}
          options={{
            tabBarLabel: "Perfils",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
