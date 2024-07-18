import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { useForm, Controller, useWatch } from "react-hook-form";
import useAuthStore from "../../../utils/storage/auth";
import useManagedStore from "../../../utils/storage/managed";
import MedicamentoSlot from "../../../components/MedicamentoSlot";
import TratamientoSlot from "../../../components/TratamientoSlot";
import { useCreateHorario } from "../../../utils/hooks/medico/horario";
import { useNavigation } from "@react-navigation/native";

/* Example of the JSON to be send to the API
{
  "cedula_medico": "29633652",
  "cedula_paciente": "50000000",
  "id_consulta": "99",
  "medicamentos": [
    {
      "dias_semana": [
        "lunes",
        "martes"
      ],
      "repeticiones": [
        "12:00:00 PM",
        "4:35:00 PM",
        "8:10:00 PM"
      ],
      "fecha_inicio": "2024-06-16T00:00:00-04:00",
      "fecha_fin": "2024-06-22T00:00:00-04:00",
      "id_medicamento": "4"
    },
    {
      "dias_semana": [
        "miercoles",
        "jueves"
      ],
      "repeticiones": [
        "12:00:00 PM",
        "4:35:00 PM",
        "8:10:00 PM"
      ],
      "fecha_inicio": "2024-06-16T00:00:00-04:00",
      "fecha_fin": "2024-06-22T00:00:00-04:00",
      "id_medicamento": "5"
    }
  ],
  "tratamientos": [
    {
      "dias_semana": [
        "jueves",
        "viernes"
      ],
      "repeticiones": [
        "12:00:00 PM",
        "8:10:00 PM"
      ],
      "fecha_inicio": "2024-06-24T00:00:00-04:00",
      "fecha_fin": "2024-06-28T00:00:00-04:00",
      "id_tratamiento": "2"
    }
  ]
}
*/

export default function AssignMedicTreatment({ route }) {
  const navigation = useNavigation();
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const createHorarioMutation = useCreateHorario();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const watchingMeds = useWatch({
    control,
    name: "medicamentos",
  });
  const watchingTreatments = useWatch({
    control,
    name: "tratamientos",
  });

  const [medicamentos, setMedicamentos] = useState(0);
  const [tratamientos, setTratamientos] = useState(0);
  const [canSubmit, setSubmitEnabled] = useState(false);
  const [loadingManually, setLoadingManually] = useState(false);

  const { user } = useAuthStore();
  const { managed } = useManagedStore();
  const { id_consulta, paciente } = route.params;

  const allowSubmit = () => {
    const values = getValues();
    // console.log(medicamentos, tratamientos);

    if (values?.medicamentos?.length > 0 && medicamentos > 0) {
      let medicamentosValid = values.medicamentos.every((medicamento) => {
        return (
          medicamento.dias_semana.length > 0 &&
          medicamento.repeticiones.length > 0 &&
          medicamento.fecha_inicio &&
          medicamento.fecha_fin &&
          new Date(medicamento.fecha_fin) >
            new Date(medicamento.fecha_inicio) &&
          medicamento.id_medicamento
        );
      });

      if (medicamentosValid) {
        setSubmitEnabled(true);
      } else {
        setSubmitEnabled(false);
      }
    } else if (values?.tratamientos?.length > 0 && tratamientos > 0) {
      let tratamientosValid = values.tratamientos.every((tratamiento) => {
        return (
          tratamiento.dias_semana.length > 0 &&
          tratamiento.repeticiones.length > 0 &&
          tratamiento.fecha_inicio &&
          tratamiento.fecha_fin &&
          tratamiento.id_tratamiento
        );
      });

      if (tratamientosValid) {
        setSubmitEnabled(true);
      } else {
        setSubmitEnabled(false);
      }
    }

    if (medicamentos === 0 && tratamientos === 0) {
      setSubmitEnabled(false);
    }
  };

  const handleHorario = (values) => {
    setLoadingManually(true);
    const response = {
      cedula_medico: user.cedula_medico,
      cedula_paciente: paciente.cedula_paciente,
      id_consulta: id_consulta,
      medicamentos: values.medicamentos || [],
      tratamientos: values.tratamientos || [],
    };

    // console.log(response);
    createHorarioMutation.mutate(response);
  };

  useEffect(() => {
    allowSubmit();
  }, [medicamentos, tratamientos, watchingMeds, watchingTreatments]);

  useEffect(() => {
    if (createHorarioMutation.isError) {
      console.log(createHorarioMutation.error);
    }

    if (createHorarioMutation.data) {
      console.log(createHorarioMutation.data);
    }

    if (createHorarioMutation.isSuccess) {
      // navigation.navigate("Consultas");
      navigation.goBack();
      setLoadingManually(false);
    }
  }, [createHorarioMutation.isSuccess]);

  if (
    createHorarioMutation.isLoading ||
    createHorarioMutation.isPending ||
    loadingManually
  ) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(0,0,0,0.1)",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Swiper
        scrollEnabled={false}
        loop={false}
        showsButtons={true}
        activeDotColor="#00826B"
        buttonWrapperStyle={{
          backgroundColor: "transparent",
          flexDirection: "row",
          position: "absolute",
          top: 0,
          left: 0,
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 9999,
        }}
        nextButton={<Text style={styles.navButton}>Next</Text>}
        prevButton={<Text style={styles.navButton}>Back</Text>}
        height={screenHeight * 0.89}
      >
        <View style={styles.slide1}>
          <View style={styles.header}>
            <Text style={styles.text}>Medicamentos</Text>
            <TouchableOpacity
              Style={{}}
              onPress={() => {
                setMedicamentos((prev) => prev + 1);
              }}
            >
              <Text style={styles.addbtn}>Añadir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              Style={{}}
              onPress={() => {
                if (medicamentos > 0) {
                  setMedicamentos((prev) => prev - 1);
                  let medicamentoValue = getValues("medicamentos");
                  medicamentoValue.pop();
                  watchingMeds.pop();
                }
              }}
            >
              <Text style={styles.removebtn}>Eliminar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.MainContainer}>
            <ScrollView>
              {[...Array(medicamentos)].map((_, index) => (
                <Controller
                  key={index}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <MedicamentoSlot onChange={onChange} value={value} />
                  )}
                  name={`medicamentos[${index}]`}
                  rules={{ required: true }}
                  defaultValue={[]}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.slide2}>
          <View style={styles.header}>
            <Text style={styles.text}>Tratamientos</Text>
            <TouchableOpacity
              Style={{}}
              onPress={() => {
                setTratamientos((prev) => prev + 1);
              }}
            >
              <Text style={styles.addbtn}>Añadir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              Style={{}}
              onPress={() => {
                if (tratamientos > 0) {
                  setTratamientos((prev) => prev - 1);
                  let tratamientoValue = getValues("tratamientos");
                  tratamientoValue.pop();
                  watchingTreatments.pop();
                }
              }}
            >
              <Text style={styles.removebtn}>Eliminar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.MainContainer}>
            <ScrollView>
              {[...Array(tratamientos)].map((_, index) => (
                <Controller
                  key={index}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TratamientoSlot onChange={onChange} value={value} />
                  )}
                  name={`tratamientos[${index}]`}
                  rules={{ required: true }}
                  defaultValue={[]}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.slide3}>
          <View style={styles.header}>
            <Text style={styles.text}>Resumen</Text>
          </View>

          <TouchableOpacity
            style={styles.submitctn}
            onPress={handleSubmit(handleHorario)}
            disabled={!canSubmit}
          >
            <Text style={canSubmit ? styles.submitbtnEna : styles.submitbtnDis}>
              Submit
            </Text>
          </TouchableOpacity>

          <View style={styles.MainContainer}>
            <ScrollView>
              {watchingMeds?.length > 0 && (
                <View
                  style={{
                    flexDirection: "column",
                    gap: 15,
                    marginBottom: 15,
                  }}
                >
                  <Text>Medicamentos</Text>
                  {watchingMeds.map((medicamento, index) => (
                    <View key={index} style={styles.resume}>
                      <Text>Medicamento: {medicamento.no_medicamento}</Text>
                      <Text>
                        Fecha de inicio:{" "}
                        {medicamento.fecha_inicio.toLocaleDateString()}
                      </Text>
                      <Text>
                        Fecha de fin:{" "}
                        {medicamento.fecha_fin.toLocaleDateString()}
                      </Text>
                      <Text>
                        Dias a la semana: {medicamento.dias_semana.join(", ")}
                      </Text>
                      <Text>
                        Repeticiones {medicamento.repeticiones.join(", ")}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {watchingTreatments?.length > 0 && (
                <View style={{ flexDirection: "column", gap: 15 }}>
                  <Text>Tratamientos</Text>
                  {watchingTreatments.map((tratamiento, index) => (
                    <View key={index} style={styles.resume}>
                      <Text>Tratamiento: {tratamiento.no_tratamiento}</Text>
                      <Text>
                        Fecha de inicio:{" "}
                        {tratamiento.fecha_inicio.toLocaleDateString()}
                      </Text>
                      <Text>
                        Fecha de fin:{" "}
                        {tratamiento.fecha_fin.toLocaleDateString()}
                      </Text>
                      <Text>
                        Dias a la semana: {tratamiento.dias_semana.join(", ")}
                      </Text>
                      <Text>
                        Repeticiones: {tratamiento.repeticiones.join(", ")}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Swiper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    width: "90%",
  },
  slide1: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  navButton: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00826B",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  addbtn: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#00826B",
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  removebtn: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#FF4545",
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  medicamentos: {
    width: "100%",
    height: "70%",
    padding: 10,
    borderRadius: 10,
  },
  resume: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    borderRadius: 10,
  },
  submitbtnEna: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00826B",
  },
  submitbtnDis: {
    fontSize: 30,
    fontWeight: "bold",
  },
  submitctn: {
    zIndex: 9999,
    position: "absolute",
    top: "105.2%",
    left: "81%",
  },
});
