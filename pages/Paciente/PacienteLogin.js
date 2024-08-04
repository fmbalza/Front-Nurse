import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LoginStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { usePacienteLogin } from "../../utils/hooks/paciente/auth.js";
import useAuthStore from "../../utils/storage/auth.js";
import { registerForPushNotificationsAsync } from "../../utils/notifications/notifications.js";
import { MaskedTextInput } from "react-native-mask-text";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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
        style={{ width: 150, height: 64, resizeMode: "contain", top:60, left: 300 }}
      />
<View style={{justifyContent: 'left', width:'100%', marginLeft:'10%',marginBottom:50}}>
      <Text
        style={{
          fontSize: 60,
          top:-70,
          color: "#00826B",
          fontWeight: "600",

        }}
      >
        Nurse.
      </Text>

      <Text style={{
        fontSize:25,
        fontWeight: "300",
        color: "#00826B",
        top:-20
      }}>
        Bienvenido de Nuevo
      </Text>
      <Text style={{
        fontSize:15,
        fontWeight: "300",
        color: "#00826B",
        top:-20
      }}>
        Inicia sesión a continuación 
      </Text>
</View>

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
          name="cedula_paciente"
          rules={{ required: true }}
          defaultValue={""}
        />
      </View>
      <View>
        {errors.cedula_paciente && (
          <Text style={styles.errorMessage}>
            <Icon name="alert-circle-outline" color={"red"} />
              Este campo es requerido
          </Text>
        )}
        {loginMutation.isError && (
          <Text style={styles.errorMessage}>
            <Icon name="alert-circle-outline" color={"red"} />
              Inicio de sesion fallido, revise la cedula ingresada
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
          trackColor={{ false: "#767577", true: "#25573c" }}
          thumbColor={autoLogin ? "#37b06e" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={autoLogin}
        />
      </View>

      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{" "}
        <Text
          style={{ color: "#00826B", fontWeight: "bold" }}
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
            flex: 1,
            flexGrow: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <ActivityIndicator size="large" color="#00826B" />
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
  errorMessage: {
    color: "red",
    fontSize: 14,
  },
});

export default PacienteLogin;
