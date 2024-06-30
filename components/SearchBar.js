import React from "react";
import { View, TextInput, Icon, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// Creaste un componente que no se usa en ningun lado, no tiene sentido >:v

const SearchBar = () => {
  return (
    <View style={styles.searchBarContainer}>
      {/* Fran esto no tiene sentiido, no existe >:V */}
      {/* <Icon style={styles.searchIcon} name="search" /> */}
      <Icon name="search" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
});
export default SearchBar;
