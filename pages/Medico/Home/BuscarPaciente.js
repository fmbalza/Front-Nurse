import * as React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, } from 'react-native';
import  {useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { useGetPaciente } from '../../../utils/hooks/medico/paciente'



const BuscarPaciente = ({ onSearch }) => {

  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const { isPending, isError, data, error } = useGetPaciente();


  
  const handleSearch = () => {
    onSearch(searchText);
  };

  const handlePatientPress = (paciente) => {
    
    const cedula = paciente.cedula
    navigation.navigate("PerfilPaciente", { cedula });
  };

  if (isError) {
    return <Text>Error:{error.message}</Text>;
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const pacientes = data.map(paciente => ({
    cedula: paciente.cedula_paciente,
    nombre: `${paciente.no_paciente} ${paciente.ap_paciente}`,
    telefono: paciente.telefono,
    genero: paciente.genero,
    familiar: paciente.familiar,
    fechaNacimiento: paciente.fecha_nacimiento
  }));













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

      {pacientes.map((paciente, index) => (
  <TouchableOpacity
    key={index}
    style={styles.containerr}
    onPress={() => handlePatientPress(paciente)}
  >
    <View style={styles.photo}></View>
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{paciente.nombre}</Text>
      <Text style={styles.cedula}>{paciente.cedula}</Text>
    </View>
  </TouchableOpacity>
))}



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:50,
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