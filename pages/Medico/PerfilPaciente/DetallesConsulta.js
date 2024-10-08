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
import useAuthStore from "../../../utils/storage/auth";

const DetallesConsulta = ({ route }) => {
  const { id_consulta, paciente } = route.params;
  const navigation = useNavigation();
  const { user, role } = useAuthStore();
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetConsulta(id_consulta);
  const [horarios, setHorarios] = useState([]);
  const [adjuntos, setAdjuntos] = useState([]);
  const [examen, setExamen] = useState();
  const fields = [
    "Motivos de consulta",
    "Examen Físico",
    "Impresión Diagnóstica",
    "Plan de Tratamiento",
  ];

  // useEffect(() => {
  //   console.log(data[0]?.examen);
  //   console.log(JSON.parse(data[0]?.examen).fisico);
  // }, [data]);

  if (isPending || isLoading || isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#00826B" />
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
              <Text style={styles.label}>Datos:</Text>
              <View style={[styles.infoContainer, { flexDirection: "column" }]}>
                {Object.keys(JSON.parse(consulta.examen)).map((key, index) => {
                  return (
                    <View
                      key={index}
                      style={{ flexDirection: "row", marginLeft: 5 }}
                    >
                      {JSON.parse(consulta.examen)[key] &&
                        JSON.parse(consulta.examen)[key] !== "" && (
                          <>
                            <Text style={styles.label}>
                              {fields[index]}:{"\n"}
                              <Text style={styles.value}>
                                {JSON.parse(consulta.examen)[key]}
                              </Text>
                            </Text>
                          </>
                        )}
                    </View>
                  );
                })}
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
                          Desde:
                          <Text style={{ fontWeight: "100" }}>
                            {horario.fecha_inicio}
                          </Text>
                        </Text>
                        <Text style={styles.label}>
                          Hasta:{" "}
                          <Text style={{ fontWeight: "100" }}>
                            {horario.fecha_fin}
                          </Text>
                        </Text>

                        <Text style={styles.label}>
                          Repeticiones:{" "}
                          <Text style={{ fontWeight: "100" }}>
                            {horario.repeticiones.map((repeticion, index) => {
                              const [hora, minuto, segundo] =
                                repeticion.split(":");
                              const fecha = new Date();
                              fecha.setHours(hora, minuto, 0, 0);
                              return (
                                <Text key={index}>
                                  {fecha.toLocaleTimeString()}
                                  {index < horario.repeticiones.length - 1 && (
                                    <Text>, </Text>
                                  )}
                                </Text>
                              );
                            })}
                          </Text>
                        </Text>

                        <Text style={styles.label}>
                          Dias de la semana:{" "}
                          <Text style={{ fontWeight: "100" }}>
                            {horario.dias_semana.map((dia, index) => (
                              <Text key={index}>
                                {dia}
                                {index < horario.dias_semana.length - 1 && (
                                  <Text>, </Text>
                                )}
                              </Text>
                            ))}
                          </Text>
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

              {role === "medico" && (
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
                    Asignar Medicamento/Tratamiento
                  </Text>
                </TouchableOpacity>
              )}
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
    fontWeight: "100",
  },
});

export default DetallesConsulta;
