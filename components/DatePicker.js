// import * as React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
// ---------------------------------------------------------------------

const DatePicker = ({ onDateChange, value }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  // value = date;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    onDateChange(currentDate);
    value = currentDate;
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
          value={date.toLocaleDateString()} // Display the date in the input field
          editable={false} // Disable direct editing of the input field
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
    width: 270,
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

export default DatePicker;
