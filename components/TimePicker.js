// import * as React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
// ---------------------------------------------------------------------

const TimePicker = ({ onTimeChange, value }) => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  // value = time;

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(false);
    setTime(currentTime);
    onTimeChange(currentTime.toLocaleTimeString());
    value = currentTime.toLocaleTimeString();
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
            // is24Hour={true}
            onChange={onChange}
          />
        )}
        <TextInput
          style={styles.input}
          //   value={time.toTimeString().split(" ")[0]}
          value={time.toLocaleTimeString()}
          editable={false}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    width: 354,
    height: 64,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#A4D4BB",
    borderWidth: 3,
    backgroundColor: "#FFFFFF",
    color: "#00826B",
    fontSize: 17,
  },
});

export default TimePicker;
