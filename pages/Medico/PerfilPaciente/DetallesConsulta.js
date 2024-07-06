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
import ImageViewer from "../../../components/ImageViewer";

const DetallesConsulta = ({ route }) => {
  const { id_consulta, paciente } = route.params;
  const navigation = useNavigation();
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetConsulta(id_consulta);
  const [horarios, setHorarios] = useState([]);
  const [adjuntos, setAdjuntos] = useState([]);

  useEffect(() => {
    // if (data) console.log(data[0]);
    if (data && data[0] && isSuccess) {
      if (data[0].horariosAsignados) {
        setHorarios(data[0].horariosAsignados);
      }
      if (data[0].archivos) {
        setAdjuntos(data[0].archivos);
      }
    }
  }, [data, isSuccess]);

  if (isPending || isLoading || isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {data &&
          Array.isArray(data) &&
          data.map((consulta, index) => (
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

              {consulta?.horariosAsignados?.length > 0 && (
                <>
                  <Text style={styles.label}>Asignados:</Text>
                  <View style={{ marginTop: 5 }}>
                    {consulta?.horariosAsignados?.map((horario, index) => (
                      <View
                        key={index}
                        style={{
                          marginVertical: 5,
                          borderColor: "#00826B",
                          borderWidth: 2,
                          padding: 10,
                          borderRadius: 8,
                        }}
                      >
                        <Text style={styles.label}>
                          Desde: {horario.fecha_inicio}
                        </Text>
                        <Text style={styles.label}>
                          Hasta: {horario.fecha_fin}
                        </Text>
                        <View>
                          {horario?.id_medicamento !== null ? (
                            <Text style={styles.label}>
                              Medicamento:{" "}
                              {horario?.id_medicamento?.cp_medicamento}
                            </Text>
                          ) : horario?.id_tratamiento !== null ? (
                            <Text style={styles.label}>
                              Tratamiento:{" "}
                              {horario?.id_tratamiento?.no_tratamiento}
                            </Text>
                          ) : (
                            <Text style={styles.label}>
                              No se ha asignado medicamento o tratamiento
                            </Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              )}

              {consulta?.archivos?.length > 0 && (
                <>
                  <Text style={styles.label}>Adjuntos:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    {consulta.archivos.map((archivo, index) => (
                      <ImageViewer key={index} imageUri={archivo.url} />
                    ))}
                  </View>
                </>
              )}

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

export default DetallesConsulta;
