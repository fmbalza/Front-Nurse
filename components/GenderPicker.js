import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
// ---------------------------------------------------------------------

const GenderPicker = ({ onGenderChange, value }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    setInputValue(gender);
    onGenderChange(gender);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label: "Seleccionar género", value: null }}
        onValueChange={(itemValue) => handleGenderSelection(itemValue)}
        items={[
          { label: "Masculino", value: "Masculino", color: "00826B" },
          { label: "Femenino", value: "Femenino", color: "00826B" },
        ]}
        style={pickerSelectStyles}
      />
      <TextInput style={styles.input} value={inputValue} editable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: "#A4D4BB",
    borderRadius: 15,
    backgroundColor: "white",
    height: 64,
  },
  input: {
    width: 350,
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "transparent",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#00826B",
    borderRadius: 10,
    color: "#00826B",
    paddingRight: 30,
    backgroundColor: "transparent",
  },
});

export default GenderPicker;
