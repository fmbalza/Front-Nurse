import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
// import TimePicker from "./TimePicker";
// import DatePicker from "./DatePicker";
import { useState, useEffect } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import PickMedicamento from "./Modals/PickMedicamento";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  PrimaryColor,
  SecondaryColor,
  ThirdColor,
  DarkGrayColor,
  WhiteColor,
  BlackColor,
} from "../styles/globalStyles.js";

const UniqueTimePicker = ({ onTimeChange }) => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // const convertTo24Hour = (time) => {
  //   let [mainTime, period] = time.split(/[\s]+|(?=[AP]M)/);
  //   let [hours, minutes, seconds] = mainTime.split(":");

  //   if (period === "PM" && hours !== "12") {
  //     hours = parseInt(hours) + 12;
  //   } else if (period === "AM" && hours === "12") {
  //     hours = "00";
  //   }

  //   return `${hours}:${minutes}:${seconds}`;
  // };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(false);
    setTime(currentTime);

    let timeString = currentTime.toLocaleTimeString();
    timeString = timeString.replace(/\s/g, " ");

    onTimeChange(timeString);
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showTimePicker} style={{ width: "100%" }}>
        {showPicker && (
          <RNDateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={onChange}
          />
        )}
        {/* <TextInput
          style={styles.input}
          value={time.toLocaleTimeString()}
          editable={false}
        /> */}
        <Text style={styles.input}>{time.toLocaleTimeString()} </Text>
      </TouchableOpacity>
    </View>
  );
};

const UniqueDatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date(new Date().setHours(12, 0, 0, 0)));
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate || date;
    const currentDate = new Date(new Date(selectedDate).setHours(12, 0, 0, 0));
    setShowPicker(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        {showPicker && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            dateFormat="year month day"
          />
        )}
        <Text style={styles.input}>{date.toLocaleDateString()} </Text>
        {/* <TextInput
          style={styles.input}
          value={date.toLocaleDateString()}
          editable={false}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const NumberOfWeeks = ({ onDateChange }) => {
  const [weeks, setWeeks] = useState(1);

  useEffect(() => {
    onDateChange(weeks);
  }, [weeks]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold" }}>
          Semanas: <Text style={{ fontWeight: "100" }}>{weeks}</Text>
        </Text>
        <TouchableOpacity
          Style={{}}
          onPress={() => {
            setWeeks((prev) => prev + 1);
          }}
        >
          {/* <Text style={styles.addbtn}>Incrementar</Text> */}
          <Icon
            name="plus-thick"
            size={14}
            color={"white"}
            style={styles.addbtn}
          />
        </TouchableOpacity>

        <TouchableOpacity
          Style={{}}
          onPress={() => {
            if (weeks > 1) {
              setWeeks((prev) => prev - 1);
            }
          }}
        >
          {/* <Text style={styles.removebtn}>Reducir</Text> */}
          <Icon
            name="minus-thick"
            size={14}
            color={"white"}
            style={styles.removebtn}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WeekdayPicker = ({ onWeekdayChange }) => {
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const weekdays = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  const handleWeekdaySelection = (weekday) => {
    if (selectedWeekdays.includes(weekday)) {
      setSelectedWeekdays((prev) => prev.filter((day) => day !== weekday));
    } else {
      setSelectedWeekdays((prev) => [...prev, weekday]);
    }
  };

  useEffect(() => {
    // console.log("aqui", selectedWeekdays);
    onWeekdayChange(selectedWeekdays);
  }, [selectedWeekdays]);

  return (
    <View style={styles.container}>
      <View style={styles.weekdayPicker}>
        {weekdays.map((weekday, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleWeekdaySelection(weekday)}
            style={
              selectedWeekdays.includes(weekday)
                ? styles.selectedWeekday
                : styles.unselectedWeekday
            }
          >
            <Text
              style={
                selectedWeekdays.includes(weekday)
                  ? { color: "white", textAlign: "center" }
                  : { color: "black", textAlign: "center" }
              }
            >
              {weekday.split("")[0].toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const MedicamentoSlot = ({ onChange, value }) => {
  //   const { data, isLoading, isError, error } = useGetMedicamento();
  const [repeticiones, setRepeticiones] = useState(1);
  const [horas, setHoras] = useState([new Date().toLocaleTimeString()]);
  const [id_medicamento, setIdMedicamento] = useState();
  const [no_medicamento, setNoMedicamento] = useState(
    "Presiona aqui para seleccionar"
  );
  const [dias_semana, setDiasSemana] = useState([]);
  const [weeks, setWeeks] = useState(1);
  const [fecha_inicio, setFechaInicio] = useState(
    new Date(new Date().setHours(12, 0, 0, 0))
  );
  const [fecha_fin, setFechaFin] = useState(
    new Date(new Date().setHours(12, 0, 0, 0))
  );
  const [showMedModal, setShowMedModal] = useState(false);

  useEffect(() => {
    value = {
      dias_semana: dias_semana,
      repeticiones: horas,
      fecha_inicio: fecha_inicio,
      // fecha_inicio: new Date(fecha_inicio).toLocaleDateString(),
      fecha_fin: fecha_fin,
      // fecha_fin: new Date(fecha_fin).toLocaleDateString(),
      id_medicamento: id_medicamento,
      no_medicamento: no_medicamento,
    };
    onChange(value);
    // console.log(value);
  }, [dias_semana, horas, fecha_inicio, fecha_fin, id_medicamento]);

  useEffect(() => {
    // setFechaFin(
    //   new Date(
    //     new Date(fecha_inicio).setDate(
    //       new Date(fecha_inicio).getDate() + weeks * 7
    //     )
    //   )
    // );
    let endDate = new Date(fecha_inicio);
    endDate.setDate(endDate.getDate() + weeks * 7);

    let daysUntilEndOfWeek = (7 - endDate.getDay()) % 7;
    endDate.setDate(endDate.getDate() + daysUntilEndOfWeek);

    setFechaFin(endDate);
  }, [weeks, fecha_inicio]);

  return (
    <View style={styles.container}>
      <View style={styles.slotItem}>
        <View style={styles.item}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Medicamento: </Text>
            <TouchableOpacity
              onPress={() => {
                setShowMedModal(true);
              }}
            >
              <Text style={styles.input}>{no_medicamento}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Repeticiones</Text>
            <TouchableOpacity
              Style={{}}
              onPress={() => {
                setRepeticiones((prev) => prev + 1);
                setHoras((prev) => [...prev, new Date().toLocaleTimeString()]);
              }}
            >
              {/* <Text style={styles.addbtn}>Añadir</Text> */}
              <Icon
                name="plus-thick"
                size={14}
                color={"white"}
                style={styles.addbtn}
              />
            </TouchableOpacity>

            <TouchableOpacity
              Style={{}}
              onPress={() => {
                if (repeticiones > 1) {
                  setRepeticiones((prev) => prev - 1);
                  setHoras((prev) => prev.slice(0, -1));
                }
              }}
            >
              {/* <Text style={styles.removebtn}>Eliminar</Text> */}
              <Icon
                name="minus-thick"
                size={14}
                color={"white"}
                style={styles.removebtn}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
          >
            {[...Array(repeticiones)].map((_, index) => (
              <View key={index} style={{ marginRight: 5 }}>
                <UniqueTimePicker
                  // key={index}
                  onTimeChange={(hora) => {
                    setHoras((prev) => {
                      const newPrev = [...prev];
                      newPrev[index] = hora;
                      return newPrev;
                    });
                  }}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.item}>
          <Text style={{ fontWeight: "bold" }}>Dias de la Semana</Text>
          <WeekdayPicker
            onWeekdayChange={(weekday) => {
              setDiasSemana(weekday);
            }}
          />
        </View>

        <View style={[styles.item, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Fecha de Inicio: </Text>
          <UniqueDatePicker
            onDateChange={(date) => {
              setFechaInicio(date);
            }}
          />

          <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
            Fecha de Fin:{" "}
            <Text
              style={{ fontWeight: "100", fontSize: 14, fontWeight: "100" }}
            >
              {fecha_fin.toLocaleDateString()}
            </Text>
          </Text>
        </View>

        <View style={styles.item}>
          <NumberOfWeeks
            onDateChange={(weeks) => {
              setWeeks(weeks);
            }}
          />
        </View>
      </View>

      <Modal visible={showMedModal} animationType="fade" transparent={true}>
        <PickMedicamento
          onClose={() => setShowMedModal(false)}
          onChange={(medicamento) => {
            setIdMedicamento(medicamento.id_medicamento);
            setNoMedicamento(medicamento.cp_medicamento);
            setShowMedModal(false);
          }}
        />
      </Modal>
    </View>
  );
};

export default MedicamentoSlot;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // alignItems: "center",
  },
  slotItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    // backgroundColor: "#A4D4BB",
    backgroundColor: "#ade0c6",
    // backgroundColor: SecondaryColor,
    borderColor: PrimaryColor,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 15,
  },
  addbtn: {
    color: "white",
    backgroundColor: "#00826B",
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  removebtn: {
    color: "white",
    backgroundColor: "#FF4545",
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  item: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
  },
  input: {
    fontSize: 14,
    fontWeight: "bold",
    color: ThirdColor,
  },
  weekdayPicker: {
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  selectedWeekday: {
    backgroundColor: PrimaryColor,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ThirdColor,
    minWidth: 20,
  },
  unselectedWeekday: {
    backgroundColor: WhiteColor,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: DarkGrayColor,
    minWidth: 20,
  },
});
