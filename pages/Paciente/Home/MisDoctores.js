import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGetMisMedicos } from "../../../utils/hooks/paciente/paciente";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalMedico from "../../../components/Modals/ModalMedico";
import userAccountFigure from "../../../assets/user-account-figure.png";

const MisDoctores = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  const { isPending, isError, data, error, isSuccess } = useGetMisMedicos();

  const [selectedMedico, setSelectedMedico] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (typeof data === "string" || !data) {
      console.log("Aqui en MisDoctores.js: no hay data");
    } else {
      fetchPosts();
    }
  }, [data]);

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00826B" />
      </View>
    );
  }

  const fetchPosts = () => {
    if (data && Array.isArray(data)) {
      const medicos = data.map((medico) => ({
        foto: medico.medico.foto_perfil,
        cedula: medico.medico.cedula_medico,
        nombre: `${medico.medico.no_medico} ${medico.medico.ap_medico}`,
        telefono: medico.medico.telefono,
        genero: medico.medico.genero,
        email: medico.medico.email,
        especialidad: medico.medico.especialidad.de_especialidad,
      }));
      // console.log("Aqui en MisDoctores.js: ", medicos);
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
        <ActivityIndicator size="large" color="#00826B" />
      </View>
    );
  }

  const ItemView = ({ medico }) => {
    return (
      <TouchableOpacity
        style={styles.containerr}
        onPress={() => handleSelectMedico({ medico })}
      >
        <View style={styles.photo}>
          <Image
            source={{ uri: medico.foto } || userAccountFigure}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{medico.nombre}</Text>
          <Text style={styles.cedula}>{medico.especialidad}</Text>
          <MaterialCommunityIcons
            name="account-details-outline"
            size={24}
            color="black"
            style={{ left: "80%" }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={{ height: 0.5, width: "100%" }} />;
  };

  // const searchFilter = (text) => {
  //   const searchText = text.toUpperCase();

  //   if (searchText) {
  //     const newData = masterData.filter((medico) => {
  //       const itemData = medico.nombre.toUpperCase();

  //       return itemData.includes(searchText);
  //     });
  //     setFilteredData(newData);
  //     setSearch(text);
  //   } else {
  //     setFilteredData(masterData);
  //     setSearch(text);
  //   }
  // };

  const searchFilter = (text) => {
    const query = text.toLowerCase();
    if (text) {
      const newData = masterData.filter((patient) => {
        const name = patient.nombre.toLowerCase();
        // const cedula = patient.cedula_paciente.toString();
        return name.includes(query);
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

  // const handleBookAppointment = () => {
  //   // Que rayos es esto? paciente agenda consulta por medio de whatsapp...
  //   // Aquí puedes agregar la lógica para agendar una cita con el médico seleccionado
  //   setModalVisible(false);
  //   navigation.navigate("AgendarCita", { medico: selectedMedico });
  // };

  return (
    // <View style={styles.container}>
    <View style={{ flex: 1 }}>
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
          renderItem={({ item }) => <ItemView medico={item} />}
          style={{ marginTop: 10, width: "100%" }}
        />

        {modalVisible && selectedMedico && (
          <ModalMedico
            visible={modalVisible}
            medico={selectedMedico}
            onClose={handleCloseModal}
            // onBookAppointment={handleBookAppointment}
          />
        )}
      </View>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    flex: 1,
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
    borderRadius: 100,
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

export default MisDoctores;
