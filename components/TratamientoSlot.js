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
// import PickMedicamento from "./Modals/PickMedicamento";

const UniqueTimePicker = ({ onTimeChange }) => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(false);
    setTime(currentTime);
    onTimeChange(currentTime.toLocaleTimeString());
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
        <TextInput
          style={styles.input}
          value={time.toLocaleTimeString()}
          editable={false}
        />
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
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString()}
          editable={false}
        />
      </TouchableOpacity>
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
                  ? { color: "white" }
                  : { color: "black" }
              }
            >
              {weekday}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const TratamientoSlot = ({ onChange, value }) => {
  const [repeticiones, setRepeticiones] = useState(1);
  const [horas, setHoras] = useState([new Date().toLocaleTimeString()]);
  const [id_tratamiento, setIdTratamiento] = useState();
  const [no_Tratamiento, setNoTratamiento] = useState(
    "presiona aqui para seleccionar"
  );
  const [dias_semana, setDiasSemana] = useState([]);
  const [fecha_inicio, setFechaInicio] = useState(
    new Date(new Date().setHours(12, 0, 0, 0))
  );
  const [fecha_fin, setFechaFin] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
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
      id_tratamiento: id_tratamiento,
    };
    onChange(value);
    // console.log(value);
  }, [dias_semana, horas, fecha_inicio, fecha_fin, id_tratamiento]);

  return (
    <View>
      <Text>TratamientoSlot</Text>
    </View>
  );
};

export default TratamientoSlot;

const styles = StyleSheet.create({});
