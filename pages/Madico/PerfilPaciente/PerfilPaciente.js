import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PerfilPaciente = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
      <View style={styles.photo}></View>
      <View style={styles.detailsContainer}>
          <Text style={styles.name}>Jesus de Arimatea</Text>
          <Text style={styles.cedula}>1.896.098</Text>
      </View>
      </View>
    <ScrollView verical>
      <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 1</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 2</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 3</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 4</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 5</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 6</Text>
          </View>
        </View>

    </ScrollView>
 
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius:25,
    marginLeft:10,
    marginRight: 10,
    backgroundColor: '#00826B'
  },
  detailsContainer: {

    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'#00826B'
  },
  cedula: {
    fontSize: 14,
  },
  profileInfo: {
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: 'gray',
  },
  cardsContainer: {
    flexDirection: 'column',
  },
  card: {
    width: 350,
    height: 150,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PerfilPaciente;