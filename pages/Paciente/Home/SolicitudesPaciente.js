import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SolicitudesPaciente = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SolicitudesPaciente</Text>
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
});

export default SolicitudesPaciente;