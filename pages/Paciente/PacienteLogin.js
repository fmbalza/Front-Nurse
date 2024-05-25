import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles, { LoginStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import {
  usePacienteLogin,
  useVerifyPaciente,
} from "../../utils/hooks/paciente/auth.js";
// import { doVerify } from "../../utils/api/paciente/auth.js";

const PacienteLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginMutation = usePacienteLogin();
  const verifyQuery = useVerifyPaciente();
  const navigation = useNavigation();

  const [rememberMe, setRememberMe] = useState(false);

  const handleLogIn = (values) => {
    loginMutation.mutate(values);
  };

  useEffect(() => {
    if (verifyQuery.isSuccess && rememberMe) {
      navigation.navigate("HomePaciente");
    }
  }, [verifyQuery.isSuccess]);

  return (
    <LinearGradient colors={["#FFFFFF", "#D6FFE9"]} style={styles.container}>
      {/* {loginMutation.isError && (
        <View>
          <Text>Error: {loginMutation.error.message}</Text>
          <Button title="Close" onPress={() => loginMutation.reset()} />
        </View>
      )} */}

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
              placeholderTextColor="#00826B"
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
        {/* {errors.cedula_paciente && Alert.alert("Cédula requerida")} */}
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
    width: "100%",
    height: "100%",
    zIndex: 8,
    borderRadius: 10,
    backgroundColor: "white",

    fontSize: 15,
    paddingHorizontal: 10,
  },
});

export default PacienteLogin;
