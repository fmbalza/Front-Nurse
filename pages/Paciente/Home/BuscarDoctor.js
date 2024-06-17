import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGetMedico } from "../../../utils/hooks/paciente/buscarDoctor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalMedico from "../../../components/Modals/ModalMedico";

const BuscarDoctor = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");

 

  const navigation = useNavigation();


  const { isPending, isError, data, error, isSuccess } = useGetMedico();

 const [selectedMedico, setSelectedMedico] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      fetchPosts();
    }
  }, [isSuccess]);

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

  const fetchPosts = () => {
    if (data && Array.isArray(data)){
      const medicos = data.map((medico) => ({
        foto: medico.foto_perfil,
        cedula: medico.cedula_medico,
        nombre: `${medico.no_medico} ${medico.ap_medico}`,
        telefono: medico.telefono,
        genero: medico.genero,
        email: medico.email,
        especialidad: medico.especialidad.de_especialidad,
      }));
      
    setFilteredData(medicos);
    setMasterData(medicos);
    }

  };

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

  const ItemView = ({ medico }) => {
    return (
      <TouchableOpacity style={styles.containerr} onPress={() => handleSelectMedico({ medico })}>
        <View style={styles.photo}>
          <Image
          source={{uri: medico.foto}}
          style={{    width: 50,
            height: 50,
            borderRadius: 25,
           }}/>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{medico.nombre}</Text>
          <Text style={styles.cedula}>{medico.especialidad}</Text>
          <MaterialCommunityIcons
            name="account-details-outline"
            size={24}
            color="black"
            style={{ left: 240 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

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
  };


  const handleSelectMedico = (medico) => {

   
    setSelectedMedico(medico);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleBookAppointment = () => {
    // Aquí puedes agregar la lógica para agendar una cita con el médico seleccionado
    setModalVisible(false);
    navigation.navigate('AgendarCita', { medico: selectedMedico });
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={{
            height: 60,
            borderWidth: 2,
            paddingLeft: 20,
            margin: 5,
            borderColor: "#FAFAFA",
            backgroundColor: "white",
            borderRadius: 7,
            elevation: 3,
          }}
          value={search}
          placeholder="Buscar..."
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => <ItemView medico={item}  />}
          style={{ marginTop: 10, width: "100%" }}
        />

{modalVisible && selectedMedico && <ModalMedico
  visible={modalVisible}
  medico={selectedMedico}
  onClose={handleCloseModal}
  onBookAppointment={handleBookAppointment}
/>}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  containerr: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#D6FFE9",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 100,
    elevation: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 50,
    height: 70,
    elevation: 3,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
  
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cedula: {
    fontSize: 14,
  },
});

export default BuscarDoctor;
