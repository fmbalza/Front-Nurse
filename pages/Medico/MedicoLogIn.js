import React, { useState } from "react";
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
import { LoginStyles } from "../../styles/globalStyles.js";
import { useNavigation } from "@react-navigation/native";
//---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { useMedicoLogin } from "../../utils/hooks/medico/auth.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuthStore from "../../utils/storage/auth.js";
import { registerForPushNotificationsAsync } from "../../utils/notifications/notifications.js";
import { MaskedTextInput } from "react-native-mask-text";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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
        style={{ width: 200, height: 230, resizeMode: "contain" }}
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
            <MaskedTextInput
              style={styles.input}
              placeholder="Cedula Ej: 29.560.310"
              placeholderTextColor="#00826B"
              onChangeText={(text, rawText) => onChange(rawText)}
              onBlur={onBlur}
              value={value}
              inputMode="numeric"
              mask={"99.999.999"}
            />
          )}
          name="cedula_medico"
          rules={{ required: true }}
          defaultValue={""}
        />
      </View>

      <View>
        {errors.cedula_medico && (
          <Text style={styles.errorMessage}>
            <Icon name="alert-circle-outline" color={"red"} />
              Este campo es requerido
          </Text>
        )}
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
                inputMode="text"
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
        {errors.contrasena && (
          <Text style={styles.errorMessage}>
            <Icon name="alert-circle-outline" color={"red"} />
              Este campo es requerido
          </Text>
        )}
      </View>

      <View>
        {loginMutation.isError && (
          <Text style={styles.errorMessage}>
            <Icon name="alert-circle-outline" color={"red"} />
              Inicio de sesion fallido, revise las credenciales ingresadas
          </Text>
        )}
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            color: "#00826B",
            fontSize: 20,
            paddingTop: 9.5,
            marginRight: 10,
          }}
        >
          Recuerdame
        </Text>
        <Switch
          ttrackColor={{ false: "#767577", true: "#25573c" }}
          thumbColor={autoLogin ? "#37b06e" : "#f4f3f4"}
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

      {/* <Text
        style={styles.registerLink}
        onPress={() => navigation.navigate("Reinicio de contraseña")}
      >
        ¿Olvidaste tu contraseña?
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
  errorMessage: {
    color: "red",
    fontSize: 14,
  },
});

export default MedicoLogin;
