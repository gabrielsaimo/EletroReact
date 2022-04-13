import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Searchbar, Appbar } from "react-native-paper";
const MyComponent = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
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
          marginLeft: 0,
          marginBottom: 10,
          marginTop: 10,
        }}
        containerStyle={{
          backgroundColor: "blue",
          borderWidth: 1,
          borderRadius: 5,
        }}
        onSubmitEditing={()=> navigation.navigate("Buscar",{q:searchQuery})}
        placeholder="Buscar na eletrosom"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </Appbar.Header>
  );
};

export default MyComponent;
