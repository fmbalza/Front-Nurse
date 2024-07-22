import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import PickTratamiento from "./Modals/PickTratamiento";

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

const UniqueTimePicker = ({ onTimeChange }) => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const convertTo24Hour = (time) => {
    let [mainTime, period] = time.split(/[\s]+|(?=[AP]M)/);
    let [hours, minutes, seconds] = mainTime.split(":");

    if (period === "PM" && hours !== "12") {
      hours = parseInt(hours) + 12;
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}:${seconds}`;
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    console.log("currentTime", currentTime);
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

const NumberOfWeeks = ({ onDateChange }) => {
  const [weeks, setWeeks] = useState(1);

  useEffect(() => {
    onDateChange(weeks);
  }, [weeks]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text>Semanas: {weeks}</Text>
        <TouchableOpacity
          Style={{}}
          onPress={() => {
            setWeeks((prev) => prev + 1);
          }}
        >
          <Text style={styles.addbtn}>Incrementar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          Style={{}}
          onPress={() => {
            if (weeks > 1) {
              setWeeks((prev) => prev - 1);
            }
          }}
        >
          <Text style={styles.removebtn}>Reducir</Text>
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
  const [no_tratamiento, setNoTratamiento] = useState(
    "presiona aqui para seleccionar"
  );
  const [dias_semana, setDiasSemana] = useState([]);
  const [weeks, setWeeks] = useState(1);
  const [fecha_inicio, setFechaInicio] = useState(
    new Date(new Date().setHours(12, 0, 0, 0))
  );
  const [fecha_fin, setFechaFin] = useState(
    new Date(new Date().setDate(12, 0, 0, 0))
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
      no_tratamiento: no_tratamiento,
    };
    onChange(value);
    // console.log(value);
  }, [dias_semana, horas, fecha_inicio, fecha_fin, id_tratamiento]);

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
          <TouchableOpacity
            onPress={() => {
              setShowMedModal(true);
            }}
          >
            <Text>Tratamiento: {no_tratamiento}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <View style={{ flexDirection: "row" }}>
            <Text>Repeticiones</Text>
            <TouchableOpacity
              Style={{}}
              onPress={() => {
                setRepeticiones((prev) => prev + 1);
                setHoras((prev) => [...prev, new Date().toLocaleTimeString()]);
              }}
            >
              <Text style={styles.addbtn}>Añadir</Text>
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
              <Text style={styles.removebtn}>Eliminar</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "column" }}>
            {[...Array(repeticiones)].map((_, index) => (
              <UniqueTimePicker
                key={index}
                onTimeChange={(hora) => {
                  setHoras((prev) => {
                    const newPrev = [...prev];
                    newPrev[index] = hora;
                    return newPrev;
                  });
                }}
              />
            ))}
          </View>
        </View>

        <View style={styles.item}>
          <Text>Dias de la Semana</Text>
          <WeekdayPicker
            onWeekdayChange={(weekday) => {
              setDiasSemana(weekday);
            }}
          />
        </View>

        <View style={styles.item}>
          <Text>Fecha de Inicio</Text>
          <UniqueDatePicker
            onDateChange={(date) => {
              setFechaInicio(date);
            }}
          />
        </View>

        {/* <View style={styles.item}>
          <Text>Fecha de Fin</Text>
          <UniqueDatePicker
            onDateChange={(date) => {
              setFechaFin(date);
            }}
          />
        </View> */}

        <View style={styles.item}>
          <NumberOfWeeks
            onDateChange={(weeks) => {
              setWeeks(weeks);
            }}
          />
          <Text>Fecha de Fin: {fecha_fin.toLocaleDateString()}</Text>
        </View>
      </View>

      <Modal visible={showMedModal} animationType="fade" transparent={true}>
        <PickTratamiento
          onClose={() => setShowMedModal(false)}
          onChange={(tratamiento) => {
            setIdTratamiento(tratamiento.id_tratamiento);
            setNoTratamiento(tratamiento.no_tratamiento);
            setShowMedModal(false);
          }}
        />
      </Modal>
    </View>
  );
};

export default TratamientoSlot;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  slotItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "#A4D4BB",
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
    fontSize: 17,
    fontWeight: "bold",
  },
  weekdayPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  selectedWeekday: {
    backgroundColor: "#00826B",
    padding: 5,
    borderRadius: 5,
  },
  unselectedWeekday: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
});
