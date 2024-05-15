import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles, { LoginStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/native';
const MedicoLogin = () => {
    const navigation = useNavigation();
  const [cedula, setCedula] = useState('');

  const handleCedulaChange = (text) => {
    setCedula(text);
  };

  const handleLogIn = () => {
    // Lógica para iniciar sesión
    console.log('Cédula:', cedula);
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#D6FFE9']} style={styles.container}>
                  
            

            <Image source={require('../../assets/nurse_logo.png')} style={{width: 200, height: 230}}/>

            <Text
                style={{
                    fontSize:95,
                    textAlign: "center",
                
                    color:'#00826B',
                    fontWeight:'500'
                }}>
                Nurse
            </Text>
      <View style={LoginStyles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Cédula"
          value={cedula}
          onChangeText={handleCedulaChange}
        />
      </View>
      <View style={LoginStyles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={cedula}
          onChangeText={handleCedulaChange}
        />
      </View>

      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("MedicoSignUp")}>
          Regístrate aquí
        </Text>
      </Text>
    
      
      <TouchableOpacity
                onPress={() => navigation.navigate("HomeMedico")}
                   style={LoginStyles.btnAceptar}>
                    <Text
                    style={{
                        color:'white',
                        fontSize:25,
                        fontWeight:'300'
                    }}>
                        Aceptar
                    </Text>
                </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
  },
});

export default MedicoLogin;