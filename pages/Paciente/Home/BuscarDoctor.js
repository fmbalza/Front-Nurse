import * as React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text,
  TouchableOpacity, 
  FlatList,
  ActivityIndicator, } from 'react-native';
import  {useState, useEffect}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { useGetMedico} from '../../../utils/hooks/paciente/buscarDoctor';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const BuscarDoctor = () => {

  const [filteredData, setFilteredData] = useState([])
  const [masterData, setMasterData] = useState([])
  const [search, setSearch] = useState('')
  const navigation = useNavigation();
  const { isPending, isError, data, error } = useGetMedico();


 

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }




  const medicos = data.map((medico) => ({
    foto:medico.foto_perfil,
    cedula: medico.cedula_medico,
    nombre: `${medico.no_medico} ${medico.ap_medico}`,
    telefono: medico.telefono,
    genero: medico.genero,
    email: medico.email,
    especialidad: medico.especialidad.de_especialidad,
  }));
console.log(medicos)

  useEffect(()=>{
    fetchPosts() ;
    return() => {
   
    }
  }, [])

 

const ItemView = ({medico}) =>{
  return(
    <TouchableOpacity
 
    style={styles.containerr}
  
  >
    <View style={styles.photo}></View>
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{medico.nombre}</Text>
      <Text style={styles.cedula}>{medico.especialidad}</Text>
      <MaterialCommunityIcons name="account-details-outline" size={24} color="black" style={{left:240}}/>
    </View>
  </TouchableOpacity>
  )
}

const ItemSeparatorView = () => {
  return(
    <View
    style={{height:0.5, width:'100%', backgroundColor:'#c8c8c8'}}
    />
  )
}

const fetchPosts = () => {
  setFilteredData(medicos)
  setMasterData(medicos)
}

const searchFilter = (text) => {
  
  const searchText = text.toUpperCase();


  if (searchText) {
    const newData = masterData.filter((medico) => {
 
      const itemData = medico.nombre.toUpperCase();

      return itemData.includes(searchText);
    });
    setFilteredData(newData);
    setSearch(text);
  } else {
   
    setFilteredData(masterData);
    setSearch(text);
  }
}


  return (
    <View>
      <View style={styles.container}>
        <TextInput
        style={{height:60, borderWidth:2, paddingLeft:20, margin:5, borderColor:'#FAFAFA', backgroundColor:'white', borderRadius:7, elevation:3}}
        value={search}
        placeholder='Buscar...'
        
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => <ItemView medico={item} />}
        style={{marginTop:10, width:'100%'}}
        />
      </View>

    
      




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

export default BuscarDoctor;