import { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCreateConsulta } from "../../utils/hooks/medico/consultaDia";
import { useForm, Controller } from "react-hook-form";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";
import { sendPushNotification } from "../../utils/notifications/notifications";

const AgendarModal = ({
  visible,
  onClose,
  onSave,
  doctorId, 
  pacienteId,
  expoToken,
}) => {
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);
  const consultaMutation = useCreateConsulta();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const convertTo24Hour = (time) => {
    let [mainTime, period] = time.split(" ");
    let [hours, minutes, seconds] = mainTime.split(":");

    if (period === "PM" && hours !== "12") {
      hours = parseInt(hours) + 12;
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}:${seconds}`;
  };

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  // const showTimepicker = () => {
  //   showMode("time");
  // };

  const handleAgendar = async (values) => {
    // console.log(expoToken);
    // console.log(values);
    const { fecha, hora, descripcion } = values;
    // console.log(convertTo24Hour(hora));
    const formattedDate = new Date(`${fecha} ${convertTo24Hour(hora)}`);
    // formattedDate.setHours(values.hora.split(":")[0]);
    // formattedDate.setMinutes(values.hora.split(":")[1]);

    const request = {
      cd_medico: doctorId,
      cd_paciente: pacienteId,
      de_consulta: descripcion || `Consulta con ${pacienteId}`,
      examen: "null",
      estado: 2,
      fecha: formattedDate.toISOString(),
    };
    // "locale and current timezones" depends on the device's language and location so be careful when choosing which one to use...
    // console.log(request.fecha.toISOString()); // this is the one to use when sending the date to the server/backend
    // console.log(request.fecha.toUTCString()); // this one should be used when we need to ignore the timezone
    // console.log(request.fecha.toString());
    // console.log(request.fecha.toLocaleString()); // this is the one to use when showing the date in the app
    consultaMutation.mutate(request);

    if (expoToken) await sendPushNotification(expoToken, fecha, hora);
  };

  useEffect(() => {
    if (consultaMutation.isSuccess) {
      onClose();
    }
  }, [consultaMutation.isSuccess]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            Selecciona la fecha y hora del evento
          </Text>
          {/* Fran, si creas componentes son para usarlos deja de depender tanto de las I.A 😡 */}
          {/* <TouchableOpacity onPress={showDatepicker}>
            <Text>Fecha: {date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimepicker}>
            <Text>Hora: {date.toLocaleTimeString()}</Text>
          </TouchableOpacity> */}
          {/* {show && (
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <View style={styles.componentt}>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode={mode}
                    display="spinner"
                    onChange={onChange}
                  />
                </View>
              )}
              name="fecha"
              defaultValue={new Date()}

              // rules={{ required: true }} // siempre tiene algo asignado por defecto
            />
          )} */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholderTextColor="#00826B"
                placeholder="Titulo/Descripcion de la consulta"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                clearTextOnFocus={true}
              />
            )}
            name="descripcion"
            rules={{ required: true }}
            defaultValue={""}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.componentt}>
                <DatePicker onDateChange={onChange} value={value} />
              </View>
            )}
            name="fecha"
            defaultValue={new Date().toISOString().split("T")[0]}
            // rules={{ required: true }} // siempre tiene algo asignado por defecto
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.componentt}>
                <TimePicker onTimeChange={onChange} value={value} />
              </View>
            )}
            name="hora"
            defaultValue={new Date().toLocaleTimeString()}
            // rules={{ required: true }} // siempre tiene algo asignado por defecto
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit((data) => handleAgendar(data))}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#00826B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    width: 352,
    height: 64,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#A4D4BB",
    borderWidth: 3,
    backgroundColor: "#FFFFFF",
    color: "#00826B",
    fontSize: 17,
  },
});

export default AgendarModal;
