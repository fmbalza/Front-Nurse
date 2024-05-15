import * as React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import  {useState}  from 'react';


const BuscarPaciente = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          placeholderTextColor={'#00826B'}
          onChangeText={setSearchText}
          value={searchText}
          onSubmitEditing={handleSearch}
        />
      </View>

      <TouchableOpacity style={styles.containerr}>
        <View style={styles.photo}></View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>Pedro Nolasco</Text>
          <Text style={styles.cedula}>7.896.098</Text>
        </View>
      </TouchableOpacity  >



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 10
  },
  containerr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:'#D6FFE9',
    marginLeft:10,
    marginRight:10,
    borderRadius:20,
    height:100,
    elevation: 5,


  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 50,
    height:70,
    elevation: 3,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius:25,
    marginLeft:10,
    marginRight: 10,
    backgroundColor: '#00826B'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cedula: {
    fontSize: 14,
  },
});

export default BuscarPaciente;