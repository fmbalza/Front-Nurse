import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../utils/storage/auth";
import CertifyMedicoModal from "../../../components/Modals/CertifyMedicoModal";

const Testing = () => {
  const navigation = useNavigation();
  const { logout, user, certified } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const doLogOut = () => {
    // Aquí se debe de hacer el logout
    logout();
    navigation.getParent("MainStack").navigate("StartPage", { logout: true });
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.photo}>
            <Image
              source={{ uri: user.foto_perfil }}
              style={{ width: 100, height: 100, borderRadius: 25 }}
            />
          </View>
          <Text style={styles.text}>
            {user.no_medico} {user.ap_medico}
          </Text>
          <Text style={styles.text}>{user.cedula_medico}</Text>
          <Text style={styles.text}>{user.genero}</Text>
          <Text style={styles.text}>{user.telefono}</Text>
          <Text style={styles.text}>{user.email}</Text>

          <TouchableOpacity
            onPress={doLogOut}
            style={styles.button}
            titleStyle={styles.buttonText}
          >
            <Text>Cerrar Sesion</Text>
          </TouchableOpacity>

          {!certified && (
            <>
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={styles.buttonCR}
                titleStyle={styles.buttonText}
              >
                <Text>Completar Registro</Text>
              </TouchableOpacity>
              <CertifyMedicoModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#FF5B5B", // Color de fondo del botón
    paddingVertical: 12, // Espacio vertical dentro del botón
    paddingHorizontal: 20, // Espacio horizontal dentro del botón
    borderRadius: 8, // Redondeo de las esquinas
    elevation: 2, // Sombra del botón (solo para Android)
    shadowColor: "rgba(0, 0, 0, 0.25)", // Color de la sombra (solo para iOS)
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (solo para iOS)
    shadowOpacity: 0.25, // Opacidad de la sombra (solo para iOS)
    shadowRadius: 3.84, // Radio de la sombra (solo para iOS)
  },
  buttonCR: {
    backgroundColor: "#03fc7f", // Color de fondo del botón
    paddingVertical: 12, // Espacio vertical dentro del botón
    paddingHorizontal: 20, // Espacio horizontal dentro del botón
    borderRadius: 8, // Redondeo de las esquinas
    elevation: 2, // Sombra del botón (solo para Android)
    shadowColor: "rgba(0, 0, 0, 0.25)", // Color de la sombra (solo para iOS)
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (solo para iOS)
    shadowOpacity: 0.25, // Opacidad de la sombra (solo para iOS)
    shadowRadius: 3.84, // Radio de la sombra (solo para iOS)
  },
  buttonText: {
    color: "#FFFFFF", // Color del texto del botón
    fontWeight: "bold", // Grosor de la fuente del texto
    fontSize: 16, // Tamaño de la fuente del texto
  },
});

export default Testing;
