// import * as React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
// ---------------------------------------------------------------------

const DatePicker = ({ onDateChange, value, title }) => {
  const [date, setDate] = useState(new Date(new Date().setHours(12, 0, 0, 0)));
  const [showPicker, setShowPicker] = useState(false);
  value = date;

  const onChange = (event, selectedDate) => {
    // const currentDate =
    //   new Date(new Date(selectedDate).setHours(12, 0, 0, 0)) ||
    //   new Date(new Date().setHours(12, 0, 0, 0));
    const currentDate = new Date(new Date(selectedDate).setHours(12, 0, 0, 0));
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
        <View
          style={{
            width: 355,
            height: 64,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: "#A4D4BB",
            borderWidth: 3,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          {title ? (
            <Text
              style={{
                color: "#00826B",
                fontSize: 17,
              }}
            >
              {title}
            </Text>
          ) : null}
          <TextInput
            style={{
              color: "#00826B",
              fontSize: 17,
            }}
            value={date.toLocaleDateString()} // Display the date in the input field
            editable={false} // Disable direct editing of the input field
          />
        </View>
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
    width: 355,
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
