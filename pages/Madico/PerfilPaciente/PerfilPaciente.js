import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PerfilPaciente = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Text style={styles.username}>Nombre de usuario</Text>
        <Text style={styles.bio}>Descripción del perfil</Text>
      </View>
      <ScrollView horizontal>
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
    flexDirection: 'row',
  },
  card: {
    width: 150,
    height: 200,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PerfilPaciente;