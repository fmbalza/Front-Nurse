import React, { useState, useEffect } from "react";
import { Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// ---------------------------------------------------------------------
import { useVerifyPaciente } from "../utils/hooks/paciente/auth.js";
import { useVerifyMedico } from "../utils/hooks/medico/auth.js";
import useAuthStore from "../utils/storage/auth.js";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/notifications/notifications.js";

const StartPage = () => {
  const navigation = useNavigation();

  const verifyPacienteQuery = useVerifyPaciente();
  const verifyMedicoQuery = useVerifyMedico();
  const { rememberMe, role, setPushToken, logout } = useAuthStore();

  const doLogOut = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    logout();
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setPushToken(token);
    });
  }, []);

  useEffect(() => {
    if (verifyPacienteQuery.isSuccess && rememberMe && role === "paciente") {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePaciente" }],
      });
    } else if (verifyMedicoQuery.isSuccess && rememberMe && role === "medico") {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeMedico" }],
      });
    }

    if (
      verifyPacienteQuery.isError ||
      verifyMedicoQuery.isError ||
      !rememberMe ||
      !role
    ) {
      doLogOut();
    }
  }, [verifyPacienteQuery.isSuccess, verifyMedicoQuery.isSuccess]);

  return (
    <LinearGradient
      colors={["#FFFFFF", "#D6FFE9"]}
      style={{
        height: "100%",
      }}
    >
      {((rememberMe && role && verifyMedicoQuery.isPending) ||
        (rememberMe && role && verifyPacienteQuery.isPending)) && (
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
          <ActivityIndicator size="large" color="#00826B" />
        </View>
      )}

      <View
        style={{
          justifyContent: "center",

          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontSize: 52,
            textAlign: "left",

            color: "#00826B",
            fontWeight: "700",
          }}
        >
          Iniciate en Nurse
        </Text>
        <Text
          style={{
            fontSize: 32,
            textAlign: "left",

            color: "#00826B",
            fontWeight: "200",
          }}
        >
          Indicanos tu perfil
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("MedicoLogin")}
          style={{
            width: "90%",
            marginTop: 120,
            height: "17%",
            borderRadius: 70,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00826B",
            elevation: 5,
            marginLeft: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "300",
            }}
          >
            Médico
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("PacienteLogin")}
          style={{
            width: "90%",
            marginTop: 40,
            height: "17%",
            borderRadius: 70,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00826B",
            elevation: 5,
            marginLeft: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "300",
            }}
          >
            Paciente
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default StartPage;
