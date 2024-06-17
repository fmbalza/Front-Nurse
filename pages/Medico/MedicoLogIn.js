import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles, { LoginStyles } from "../../styles/globalStyles.js";
import { useNavigation } from "@react-navigation/native";
//---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { useMedicoLogin } from "../../utils/hooks/medico/auth.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuthStore from "../../utils/storage/auth.js";
import { registerForPushNotificationsAsync } from "../../utils/notifications/notifications.js";

const MedicoLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMedicoLogin();
  const navigation = useNavigation();

  const { setRememberMe } = useAuthStore();
  const [autoLogin, setAutoLogin] = useState(false);

  const toggleSwitch = () => {
    setAutoLogin((previousState) => !previousState);
    setRememberMe(autoLogin);
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
        style={{ width: 200, height: 230, top: 30 }}
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
                inputMode="numeric"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggleButton}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#00826B"
                />
              </TouchableOpacity>
            </View>
          )}
          name="contrasena"
          rules={{ required: true }}
          defaultValue={""}
        />
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
          onPress={() => navigation.navigate("MedicoSignUp")}
        >
          Regístrate aquí
        </Text>
      </Text>
{/* 
      <Text style={styles.registerText}>
        ¿Olvidaste tu contraseña?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("PasswordM")}
        >
          Click aquí
        </Text>
      </Text> */}

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
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15,
  },

  passwordToggleButton: {
    left: "90%",
    bottom: "40%",
  },
});

export default MedicoLogin;
