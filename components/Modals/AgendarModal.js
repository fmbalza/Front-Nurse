import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCreateConsulta } from '../../utils/hooks/medico/consultaDia'; 
import { useForm, Controller } from "react-hook-form";


const AgendarModal = ({ visible, onClose, onSave, doctorId, pacienteId }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const consultaMutation = useCreateConsulta();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleAgendar =(values)=> {
    values['cd_medico'] = doctorId;
    values['cd_paciente'] = pacienteId;
    values['de_consulta'] = "consulta con ...";
    values['examen'] = "null";
    values['estado'] = 1;
    console.log(values)
    consultaMutation.mutate(values)
  }


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Selecciona la fecha y hora del evento</Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Text>Fecha: {date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimepicker}>
            <Text>Hora: {date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {show && (


            

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

          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit((data) => handleAgendar(data))}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AgendarModal;