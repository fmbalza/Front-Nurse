import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ModalConsulta = ({ visible, consulta, onClose }) => {
  const handleNoPress = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{consulta.descripcion}</Text>
            <TouchableOpacity onPress={handleNoPress}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Paciente:</Text>
              <Text style={styles.infoValue}>{consulta.nombrePaciente}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Médico:</Text>
              <Text style={styles.infoValue}>{consulta.nombreMedico}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Fecha:</Text>
              <Text style={styles.infoValue}>
                {new Date(consulta.fecha).toLocaleString()}
              </Text>
            </View>
            <Text style={styles.infoLabel}>Examen:</Text>
            <View style={styles.infoContainer}>
              
              <Text style={styles.infoValue}>{consulta.examen}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 16,
    color: '#E53935',
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 16,
    textAlign:'justify'
  },
});

export default ModalConsulta;