import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ModalMedico = ({ visible, medico, onClose, onBookAppointment }) => {

    const handlePress = () => {
        const url = `whatsapp://send?phone=58${medico.medico.telefono}`;
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(url);
            } else {
              console.log("No se pudo abrir la aplicación de WhatsApp");
            }
          })
          .catch((error) => console.error(error));
      };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.photoContainer}>
            <View style={styles.photo} >
            <Image
                source={{uri: medico.medico.foto}}
                style={{    width: 80,
                    height: 80,
                    borderRadius: 100,
                }}/>
            </View>
          </View>
          <Text style={styles.name}>{medico.medico.nombre}</Text>
          <Text style={styles.info}>Especialidad: {medico.medico.especialidad}</Text>
          <Text style={styles.info}>Teléfono: {medico.medico.telefono}</Text>
          <Text style={styles.info}>Correo: {medico.medico.email}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCerrar} onPress={onClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
            <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
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
    width: '80%',
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#777',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cedula: {
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginVertical: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00826B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonCerrar: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ModalMedico;