import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SpecialtyPicker = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSpecialtySelection = (specialty) => {
    setSelectedSpecialty(specialty);
    setInputValue(specialty);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label: 'Seleccionar Especialidad', value: null }}
        onValueChange={(itemValue) => handleSpecialtySelection(itemValue)}
        items={[
          { label: 'Cardiologia', value: 'Cardiologia', color:'00826B' },
          { label: 'Neumologia', value: 'Neumologia', color:'00826B' },
          { label: 'Endocrinologia', value: 'Endocrinologia', color:'00826B' },
          { label: 'Dermatologia', value: 'Dermatologia', color:'00826B' },
          { label: 'Pediatria', value: 'Pediatria', color:'00826B' },
          { label: 'Psiquiatria', value: 'Psiquiatria', color:'00826B' }
        ]}
        style={pickerSelectStyles}
      />
      <TextInput
        style={styles.input}
        value={inputValue}
        
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    borderWidth: 3,
    borderColor: '#A4D4BB',
    borderRadius: 15,
    backgroundColor:'white',
    height:64,
    marginTop:10
  

  },
  input: {
    width: 350,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 10,
    color:'transparent',
    
  },
});

const pickerSelectStyles = StyleSheet.create({

  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#00826B',
    borderRadius: 10,
    color: '#00826B',
    paddingRight: 30,
    backgroundColor: 'transparent',
 
  },
});

export default SpecialtyPicker;
