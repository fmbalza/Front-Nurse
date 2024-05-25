import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
//---------------------------------------------------------------------
import { useEspecialidades } from "../utils/hooks/medico/especialidades";

const SpecialtyPicker = ({ onSpecialtyChange, value, specialties }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [inputValue, setInputValue] = useState("");
  // const especialidadQuery = useEspecialidades();
  // console.log("specialties", specialties);
  const options = specialties;

  const handleSpecialtySelection = (specialty) => {
    setSelectedSpecialty(specialty);
    setInputValue(specialty);
    onSpecialtyChange(specialty);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label: "Seleccionar Especialidad", value: null }}
        onValueChange={(itemValue) => handleSpecialtySelection(itemValue)}
        items={options}
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
    marginTop: 10,
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

export default SpecialtyPicker;
