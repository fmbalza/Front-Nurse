import { useState, useEffect, useCallback } from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { isBatteryOptimizationEnabledAsync } from "expo-battery";
import AndroidOpenSettings from "react-native-android-open-settings";
import {
  PrimaryColor,
  SecondaryColor,
  ThirdColor,
  WhiteColor,
  BlackColor,
  BackgroundShade,
} from "../styles/globalStyles";

const StartPage = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  checkForBatteryOptimization = async () => {
    await isBatteryOptimizationEnabledAsync().then((res) => {
      if (res) {
        setShowModal(true);
      }
    });
  };

  useEffect(() => {
    checkForBatteryOptimization();
  }, []);

  return (
    <LinearGradient
      colors={["#FFFFFF", "#D6FFE9"]}
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          source={require("../assets/nurse_logo.png")}
          style={{ width: "50%", height: "35%", resizeMode: "contain" }}
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
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: "#00826B",
            fontWeight: "400",
          }}
        >
          Innovando tu bienestar
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("WelcomePage")}
          style={{
            width: "80%",
            marginTop: 80,
            height: "13%",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00826B",
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "300",
            }}
          >
            Comenzar
          </Text>
        </TouchableOpacity>

        <Modal visible={showModal} animationType="fade" transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: BackgroundShade,
            }}
          >
            <View
              style={{
                width: "80%",
                height: "auto",
                backgroundColor: "white",
                borderRadius: 20,
                padding: 30,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: "#00826B",
                  fontWeight: "500",
                }}
              >
                ¡Desactiva la optimización de batería!
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#00826B",
                  fontWeight: "400",
                }}
              >
                Para asegurar el correcto funcionamiento de las notificaciones
                en tiempo real, desactiva la optimización de batería para Nurse.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => AndroidOpenSettings.appDetailsSettings()}
                >
                  <Text
                    style={{
                      color: WhiteColor,
                      fontSize: 15,
                      fontWeight: "bold",
                      backgroundColor: PrimaryColor,
                      padding: 10,
                      minWidth: 100,
                      textAlign: "center",
                      borderRadius: 20,
                    }}
                  >
                    Continuar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text
                    style={{
                      color: WhiteColor,
                      fontSize: 15,
                      fontWeight: "bold",
                      backgroundColor: PrimaryColor,
                      padding: 10,
                      minWidth: 100,
                      textAlign: "center",
                      borderRadius: 20,
                    }}
                  >
                    Salir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

export default StartPage;
