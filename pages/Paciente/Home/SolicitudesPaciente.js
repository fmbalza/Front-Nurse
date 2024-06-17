import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const SolicitudesPaciente = () => {







  return (
    <View style={styles.container}>
       <TouchableOpacity 
      
      style={styles.button}
      titleStyle={styles.buttonText}
      > 
      <Text>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF5B5B', // Color de fondo del botón
    paddingVertical: 12, // Espacio vertical dentro del botón
    paddingHorizontal: 20, // Espacio horizontal dentro del botón
    borderRadius: 8, // Redondeo de las esquinas
    elevation: 2, // Sombra del botón (solo para Android)
    shadowColor: 'rgba(0, 0, 0, 0.25)', // Color de la sombra (solo para iOS)
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (solo para iOS)
    shadowOpacity: 0.25, // Opacidad de la sombra (solo para iOS)
    shadowRadius: 3.84, // Radio de la sombra (solo para iOS)
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto del botón
    fontWeight: 'bold', // Grosor de la fuente del texto
    fontSize: 16, // Tamaño de la fuente del texto
  },
});

export default SolicitudesPaciente;