import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetConsulta } from "../../../utils/hooks/medico/consultaDia";

const Consulta = ({ route }) => {
  const { id_consulta, paciente } = route.params;
  const navigation = useNavigation();
  const getConsultaQuery = useGetConsulta(id_consulta);

  // useEffect(() => {
  //   console.log(id_consulta);
  //   console.log(getConsultaQuery.data);
  // }, [getConsultaQuery.data]);

  if (getConsultaQuery.isPending || getConsultaQuery.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {getConsultaQuery.data &&
          Array.isArray(getConsultaQuery.data) &&
          getConsultaQuery.data.map((consulta, index) => (
            <View key={index} style={styles.consultaContainer}>
              <Text style={styles.title}>{consulta.de_consulta}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.value}>
                  {consulta.cd_paciente.no_paciente}{" "}
                  {consulta.cd_paciente.ap_paciente}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Médico:</Text>
                <Text style={styles.value}>
                  {consulta.cd_medico.no_medico} {consulta.cd_medico.ap_medico}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.value}>
                  {new Date(consulta.fecha).toLocaleString()}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Descripción:</Text>
                <Text style={styles.value}>{consulta.de_consulta}</Text>
              </View>
              <Text style={styles.label}>Datos:</Text>
              {""}
              <View style={styles.infoContainer}>
                <Text style={styles.value}>{consulta.examen}</Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#00826B",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 16,
                }}
                onPress={() => {
                  navigation.navigate("AssignMedicTreatment", {
                    id_consulta: id_consulta,
                    paciente: paciente,
                  });
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Asignar Tratamiento
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  consultaContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    flex: 1,
    textAlign: "justify",
  },
});

export default Consulta;
