import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BtnAgregar from '../../../components/BtnAgregar';

const PerfilPaciente = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
      <View style={styles.detailsContainer}>

      <View style={styles.photo}></View>
          <Text style={styles.name}>Jesus de Arimatea</Text>
          <Text style={styles.cedula}>1.896.098</Text>
          <Text style={styles.cedula}>Masculino</Text>
          <Text style={styles.cedula}>500 años</Text>
          
          <View style={{ alignItems:'flex-end', top:-40}}>
          <BtnAgregar/>
          </View>
      </View>
      </View>
    <ScrollView verical>
      <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Consulta 6</Text>
          </TouchableOpacity>
        </View>

    </ScrollView>
    <TouchableOpacity style={styles.agendar}>
      <Text style={{color:'#FFFFFF'}}>
        Agendar Consulta
      </Text>
    </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#00826B',
  },
  detailsContainer: {
    marginLeft: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00826B',
  },
  cedula: {
    fontSize: 14,
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
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  agendar:{
    width: 100,
    height: 50,
    backgroundColor: '#00826B',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:250

  }
});

export default PerfilPaciente;