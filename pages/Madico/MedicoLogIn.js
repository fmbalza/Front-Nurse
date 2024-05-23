import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  Image,
ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles, { LoginStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/native';
//---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { useMedicoLogin, useVerifyMedico } from '../../hooks/medico/auth';
import { doVerify } from "../../api/paciente/auth.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MedicoLogin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginMutation = useMedicoLogin();
  const verifyQuery = useVerifyMedico();
  const navigation = useNavigation();

  const handleLogIn = (values) => {
    console.log(values)
    loginMutation.mutate(values);
  };

  useEffect(() => {
    if (verifyQuery.isSuccess) {
      navigation.navigate("HomeMedico");
    }
  }, [verifyQuery.isSuccess]);

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
      <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Cédula"
              placeholderTextColor="#00826B"
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              inputMode="numeric"
            />
          )}
          name="cedula_medico"
          rules={{ required: true }}
          defaultValue={""}
        />
      </View>


      <View style={LoginStyles.inputs}>
      <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#00826B"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggleButton}
              >
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#00826B" />
              </TouchableOpacity>
            </View>
          )}
          name="contrasena"
          rules={{ required: true }}
          defaultValue={""}
        />
      </View>

      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("MedicoSignUp")}>
          Regístrate aquí
        </Text>
      </Text>
    
      
      <TouchableOpacity
                onPress={handleSubmit((data) => handleLogIn(data))
                  
                }
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
                
                {loginMutation.isPending && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
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
    width: '100%',
    height: 40,
    marginLeft: 10,
    marginTop:10,
    fontSize:15
  
  
  },

  passwordToggleButton: {
    left:'90%',
    bottom:'40%'
  },

});

export default MedicoLogin;