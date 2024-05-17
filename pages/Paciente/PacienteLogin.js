import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles, { LoginStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { usePacienteLogin, useVerifyPaciente } from "../../hooks/paciente/auth";

const PacienteLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  const mutation = usePacienteLogin();
  const { data, isError, error, isLoading, isSuccess } = useVerifyPaciente();

  const handleLogIn = (values) => {
    mutation.reset();

    try {
      mutation.mutate(values);

      if (mutation.isError) {
        Alert.alert("Cédula incorrecta");
      }

      if (mutation.isSuccess) {
        console.log("Login exitoso");
        // navigation.navigate("PacienteHome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#D6FFE9"]} style={styles.container}>
      <Image
        source={require("../../assets/nurse_logo.png")}
        style={{ width: 200, height: 230 }}
      />

      <Text
        style={{
          fontSize: 95,
          textAlign: "center",

          color: "#00826B",
          fontWeight: "500",
        }}
      >
        Nurse
      </Text>

      <View style={LoginStyles.inputs}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Cédula"
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              inputMode="numeric"
            />
          )}
          name="cedula_paciente"
          rules={{ required: true }}
          defaultValue={""}
        />
        {errors.cedula_paciente && Alert.alert("Cédula requerida")}
      </View>

      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("PacienteSignUp")}
        >
          Regístrate aquí
        </Text>
      </Text>

      <TouchableOpacity
        onPress={handleSubmit((data) => handleLogIn(data))}
        style={LoginStyles.btnAceptar}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: "300",
          }}
        >
          Aceptar
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    zIndex: 8,
  },
});

export default PacienteLogin;
