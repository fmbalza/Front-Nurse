import React from 'react';
import { View, TextInput, Icon, StyleSheet } from 'react-native';

const SearchBar = () => {

  return (
   <View style={styles.searchBarContainer}>
      <Icon style={styles.searchIcon} name="search" />
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
    flexDirection: 'row',
    backgroundColor: '#fff',
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
export default SearchBar