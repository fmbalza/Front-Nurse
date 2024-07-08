import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import BtnAgregar from "../../../components/BtnAgregar";
import AgendarModal from "../../../components/Modals/AgendarModal";
import { useNavigation } from "@react-navigation/native";
import {
  // useGetPaciente,
  useGetPacienteConsulta,
} from "../../../utils/hooks/medico/paciente";
import EndConsultaModal from "../../../components/Modals/EndConsultaModal";
import useAuthStore from "../../../utils/storage/auth";
import { useGetPacienteMedico } from "../../../utils/hooks/medico/paciente";
import { useGetPacienteByCedula } from "../../../utils/hooks/medico/paciente";
import userAccountFigure from "../../../assets/user-account-figure.png";

const PerfilPaciente = ({ route }) => {
  const { user } = useAuthStore.getState();
  const { cedula, paciente } = route.params;
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  // const [cmodal, setCModal] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  // const { isPending, isError, data, error } = useGetPaciente();
  const { isPending, isError, data, error } = useGetPacienteByCedula(cedula);
  const pacienteConsultaQuery = useGetPacienteConsulta(cedula);
  const pacienteMedicoQuery = useGetPacienteMedico();

  if (pacienteMedicoQuery.isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const estado = ["Omitido", "Completado", "Pendiente"];

  // const toggleCModal = () => {
  //   setCModal(!cmodal);
  // };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveEvent = (date, time) => {
    setEventDate(date);
    setEventTime(time);
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

  if (pacienteConsultaQuery.isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (pacienteConsultaQuery.isError) {
    return <Text>Error:{error.message}</Text>;
  }

  const consultas =
    typeof pacienteConsultaQuery.data === "string"
      ? pacienteConsultaQuery.data
      : pacienteConsultaQuery.data.map((consulta) => ({
          nombrePaciente: ` ${consulta.cd_paciente.no_paciente} ${consulta.cd_paciente.ap_paciente}`,
          nombreMedico: ` ${consulta.cd_medico.no_medico} ${consulta.cd_medico.ap_medico}`,
          fecha: consulta.fecha,
          estado: consulta.estado,
          descripcion: consulta.de_consulta,
          examen: consulta.examen,
          id_consulta: consulta.id_consulta,
        }));

  handleConsultaPress = (consulta) => {
    console.log(consulta.id_consulta);
    const id_consulta = consulta.id_consulta;
    navigation.navigate("Consulta", { id_consulta, paciente });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.detailsContainer}>
          {/* <View style={styles.photo}></View> */}
          <Image source={userAccountFigure} style={styles.photo} />

          <View style={styles.pacienteContainer}>
            <Text style={styles.label}>Cédula: {data[0]?.cedula_paciente}</Text>

            <Text style={styles.label}>
              Nombre: {data[0]?.no_paciente} {data[0]?.ap_paciente}
            </Text>

            <Text style={styles.label}>Teléfono: {data[0]?.telefono}</Text>

            <Text style={styles.label}>Género: {data[0]?.genero}</Text>

            <Text style={styles.label}>
              Fecha de Nacimiento: {data[0]?.fecha_nacimiento}
            </Text>
          </View>
          {/* ))} */}

          <View style={{ alignItems: "flex-end", top: 10, zIndex: 9 }}>
            <BtnAgregar cedula={cedula} user={user} />
          </View>
        </View>
      </View>

      <Text>Consultas: </Text>

      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#ECECEC",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 60,
          }}
        >
          <View style={styles.cardsContainer}>
            <View>
              {typeof consultas === "string" ||
              consultas.every((consulta) => consulta.estado !== 2) ? (
                <Text></Text>
              ) : (
                <Text>Pendientes: </Text>
              )}

              {typeof consultas === "string" ||
              consultas.every((consulta) => consulta.estado !== 2) ? (
                <Text></Text>
              ) : (
                consultas
                  .filter((consulta) => consulta.estado === 2)
                  .map((consulta, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.card}
                      onPress={() => {
                        setSelectedConsulta(consulta.id_consulta);
                        toggleModal();
                      }}
                    >
                      <Text style={styles.cardTitle}>
                        {" "}
                        Consulta {index + 1}:{" "}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Paciente: {consulta.nombrePaciente}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Medico: {consulta.nombreMedico}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Fecha: {new Date(consulta.fecha).toLocaleString()}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Estado: {estado[consulta.estado]}
                      </Text>
                    </TouchableOpacity>
                  ))
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              {typeof consultas === "string" ||
              consultas.every((consulta) => consulta.estado !== 1) ? (
                <Text></Text>
              ) : (
                <Text>Completadas: </Text>
              )}
              {typeof consultas === "string" ? (
                <Text>No hay consultas</Text>
              ) : (
                consultas
                  .filter((consulta) => consulta.estado === 1)
                  .map((consulta, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.card}
                      onPress={() => handleConsultaPress(consulta)}
                    >
                      <Text style={styles.cardTitle}>
                        {" "}
                        Consulta {index + 1}
                        {index + 1 === 1 ? " (De primera)" : ""}:{" "}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Paciente: {consulta.nombrePaciente}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Medico: {consulta.nombreMedico}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Fecha: {new Date(consulta.fecha).toLocaleString()}
                      </Text>
                      <Text style={styles.cardlabel}>
                        {" "}
                        Estado: {estado[consulta.estado]}
                      </Text>
                      <Text style={styles.cardlabel}> </Text>
                    </TouchableOpacity>
                  ))
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <EndConsultaModal
        visible={modal}
        onClose={toggleModal}
        id_consulta={selectedConsulta}
      />

      <TouchableOpacity style={styles.agendar} onPress={handleOpenModal}>
        <AgendarModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          pacienteId={cedula}
          doctorId={user.cedula_medico}
          expoToken={user.push_token}
        />

        <Text style={{ color: "#FFFFFF" }}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  photoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  detailsContainer: {
    marginLeft: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00826B",
  },
  cedula: {
    fontSize: 14,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 10,
    marginTop: 20,
  },
  card: {
    width: 350,
    height: 200,
    backgroundColor: "#00826B",
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "left",
    marginTop: 10,
  },
  cardlabel: {
    color: "white",
    marginLeft: 10,
  },

  label: {
    color: "black",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  agendar: {
    width: 100,
    height: 50,
    borderRadius: 10,
    bottom: 10,
    right: 10,
    position: "absolute",
    backgroundColor: "#00826B",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PerfilPaciente;
