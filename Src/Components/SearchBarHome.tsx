import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Searchbar, Appbar } from "react-native-paper";
import { AuthContext } from "../Contexts/Auth";
export default function MyComponent() {
  const { user1 } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(user1.idcliente);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(
    "🚀 ~ file: SearchBarHome.tsx ~ line 10 ~ MyComponent ~ searchQuery",
    searchQuery
  );
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <Appbar.Header style={{ backgroundColor: "#1534C8" }}>
      <Searchbar
        inputStyle={{ backgroundColor: "white" }}
        style={{
          fontSize: 12,
          elevation: 0,
          borderRadius: 10,
          high: 20,
          marginTop: 10,
          margin: 10,
        }}
        containerStyle={{
          backgroundColor: "blue",
          borderWidth: 1,
          borderRadius: 5,
        }}
        onSubmitEditing={() =>
          navigation.push("Buscar", {
            q: searchQuery,
            idcliente: user1.idcliente,
          })
        }
        placeholder="Buscar na eletrosom"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </Appbar.Header>
  );
}
