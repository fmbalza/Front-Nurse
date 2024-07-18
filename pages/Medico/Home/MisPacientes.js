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
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGetPacienteMedico } from "../../../utils/hooks/medico/paciente";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import userAccountFigure from "../../../assets/user-account-figure.png";
import useManagedStore from "../../../utils/storage/managed";
import { MaskedText } from "react-native-mask-text";

const MisPacientes = ({ onSearch }) => {
  const { setManaged } = useManagedStore();
  const { isPending, isError, data, error } = useGetPacienteMedico();
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (typeof data === "string" || !data) {
      console.log("Aqui en MisPacientes.js: no hay data");
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const fetchPosts = () => {
    const pacientes = data.map((paciente) => ({
      cedula_paciente: paciente.cedula_paciente,
      no_paciente: `${paciente.no_paciente} ${paciente.ap_paciente}`,
      telefono: paciente.telefono,
      genero: paciente.genero,
      // familiar: paciente.familiar,
      fecha_nacimiento: paciente.fecha_nacimiento,
      push_token: paciente.push_token,
    }));
    setFilteredData(pacientes);
    setMasterData(pacientes);
  };

  const handlePatientPress = (paciente) => {
    const cedula = paciente.cedula_paciente;
    setManaged(paciente);
    navigation.navigate("PerfilPaciente", { cedula, paciente });
  };

  const ItemView = ({ paciente, handlePatientPress }) => {
    return (
      <TouchableOpacity
        onPress={() => handlePatientPress(paciente)}
        style={styles.containerr}
      >
        <Image source={userAccountFigure} style={styles.photo} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{paciente.no_paciente}</Text>
          <MaskedText style={styles.cedula} mask={"99.999.999"}>
            {paciente.cedula_paciente}
          </MaskedText>
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

  const searchFilter = (text) => {
    const query = text.toLowerCase();
    if (text) {
      const newData = masterData.filter((patient) => {
        const name = patient.no_paciente.toLowerCase();
        const cedula = patient.cedula_paciente.toString();
        return name.includes(query) || cedula.includes(query);
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  return (
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
          renderItem={({ item }) => (
            <ItemView paciente={item} handlePatientPress={handlePatientPress} />
          )}
          style={{ marginTop: 10, width: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
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
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: "#00826B",
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

export default MisPacientes;
