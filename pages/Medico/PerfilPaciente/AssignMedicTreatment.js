import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { useForm, Controller } from "react-hook-form";
import useAuthStore from "../../../utils/storage/auth";
import useManagedStore from "../../../utils/storage/managed";
import MedicamentoSlot from "../../../components/MedicamentoSlot";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [medicamentos, setMedicamentos] = useState(0);
  const [tratamientos, setTratamientos] = useState(0);

  const { user } = useAuthStore();
  const { managed } = useManagedStore();
  const { id_consulta, paciente } = route.params;

  const handleHorario = (values) => {
    console.log(values);
  };

  return (
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
              }
            }}
          >
            <Text style={styles.removebtn}>Eliminar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.MainContainer}>
          <ScrollView style={styles.medicamentos}>
            {[...Array(medicamentos)].map((_, index) => (
              <Controller
                key={index}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MedicamentoSlot onChange={onChange} value={value} />
                )}
                name={`medicamentos[${index}]`}
                rules={{ required: true }}
                defaultValue=""
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.slide2}>
        <Text style={styles.text}>Tratamientos</Text>
      </View>

      <View style={styles.slide3}>
        <Text style={styles.text}>Resumen</Text>
      </View>
    </Swiper>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
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
});
