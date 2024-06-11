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
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles, { LoginStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { usePacienteLogin } from "../../utils/hooks/paciente/auth.js";
import useAuthStore from "../../utils/storage/auth.js";
import { registerForPushNotificationsAsync } from "../../utils/notifications/notifications.js";

const PacienteLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = usePacienteLogin();
  const navigation = useNavigation();

  const { setRememberMe } = useAuthStore();
  const [autoLogin, setAutoLogin] = useState(false);

  const toggleSwitch = () => {
    setAutoLogin((a) => !a);
    setRememberMe(!autoLogin);
  };

  const handleLogIn = async (values) => {
    const push_token = await registerForPushNotificationsAsync();
    values = { ...values, push_token };
    // console.log(values);
    loginMutation.mutate(values);
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

      <View>
        <Text style={{ color: "#00826B", fontSize: 20 }}>Recuerdame</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={autoLogin ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={autoLogin}
        />
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
