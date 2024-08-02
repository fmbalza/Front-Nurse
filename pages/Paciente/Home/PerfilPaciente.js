import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useUpdatePaciente } from "../../../utils/hooks/paciente/paciente";
import { useForm, Controller } from "react-hook-form";
import { useGetMe } from "../../../utils/hooks/paciente/paciente";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../utils/storage/auth";
import userAccountFigure from "../../../assets/user-account-figure.png";
import { useQueryClient } from "@tanstack/react-query";
import { MaskedText } from "react-native-mask-text";
import * as Notifications from "expo-notifications";

const PerfilPaciente = () => {
  const queryClient = useQueryClient();
  const getMeQuery = useGetMe();
  const updateMutation = useUpdatePaciente();
  const { user } = useAuthStore.getState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [userData, setUserData] = useState({
    no_paciente: user?.no_paciente,
    ap_paciente: user?.ap_paciente,
    telefono: user?.telefono,
    genero: user?.genero,
    fecha_nacimiento: user?.fecha_nacimiento,
  });

  const navigation = useNavigation();
  const { logout } = useAuthStore();

  const doLogOut = async () => {
    logout();
    await Notifications.cancelAllScheduledNotificationsAsync();
    queryClient.cancelQueries();
    // queryClient.removeQueries();
    // queryClient.clear();
    // navigation.getParent("MainStack").navigate("StartPage", { logout: true });
    navigation
      .getParent("MainStack")
      .reset({ index: 0, routes: [{ name: "StartPage" }] });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setUserData({
      no_paciente: user?.no_paciente,
      ap_paciente: user?.ap_paciente,
      telefono: user?.telefono,
      genero: user?.genero,
      fecha_nacimiento: user?.fecha_nacimiento,
    });
  }, [user]);

  if (getMeQuery.isError) {
    return <Text>Error:{error.message}</Text>;
  }

  if (getMeQuery.isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00826B" />
      </View>
    );
  }

  const pacientes = getMeQuery.data.map((paciente) => ({
    cedula: paciente.cedula_paciente,
    nombre: `${paciente.no_paciente} ${paciente.ap_paciente}`,
    telefono: paciente.telefono,
    genero: paciente.genero,
    familiar: paciente.familiar,
    fechaNacimiento: paciente.fecha_nacimiento,
  }));

  // console.log(pacientes);

  const handleUpdate = (values) => {
    const updatedData = {
      no_paciente: values.no_paciente || userData.no_paciente,
      ap_paciente: values.ap_paciente || userData.ap_paciente,
      telefono: values.telefono || userData.telefono,
      genero: values.genero || userData.genero,
      fecha_nacimiento: values.fecha_nacimiento || userData.fecha_nacimiento,
    };
    console.log("Aqui en PerfilPaciente.js: ", updatedData);
    updateMutation.mutate(updatedData);

    setIsModalVisible(!isModalVisible);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();

    // Ajusta la edad si el cumpleaños aún no ha pasado este año
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <View style={styles.container}>
      {user && (
        <>
          {pacientes.map((paciente, index) => (
            <View key={index} style={styles.pacienteContainer}>
              <View style={styles.header}>
                <View style={styles.photoContainer}>
                  <Image source={userAccountFigure} style={styles.photo} />
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{paciente.nombre}</Text>
                  <Text style={styles.cedula}>
                    Cédula: 
                    <MaskedText mask="99.999.999">{paciente.cedula}</MaskedText>
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  Edad: {calculateAge(`${paciente.fechaNacimiento}`)}
                </Text>
                <Text style={styles.infoText}>Género: {paciente.genero}</Text>
                <Text style={styles.infoText}>
                  Teléfono: 
                  <MaskedText mask="+99 999-9999999">
                    {paciente.telefono}
                  </MaskedText>
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.logoutButton}
            titleStyle={styles.logoutButtonText}
            onPress={doLogOut}
          >
            <Text>Cerrar Sesion</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.editButton} onPress={toggleModal}>
        <Icon name="pencil" size={24} color="#FF5B5B" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <Text>Modifique los campos que desee cambiar</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.modalInput}
                  placeholderTextColor="#A4D4BB"
                  placeholder="Nombre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="no_paciente"
              rules={{ required: false }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.modalInput}
                  placeholderTextColor="#A4D4BB"
                  placeholder="Apellido"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="ap_paciente"
              rules={{ required: false }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.modalInput}
                  placeholderTextColor="#A4D4BB"
                  placeholder="Telefono"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="telefono"
              rules={{ required: false }}
              defaultValue={""}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={toggleModal}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSubmit((data) => handleUpdate(data))}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  componentt: {
    marginTop: 10,
    width: "%100",
  },

  editButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 25,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  photoContainer: {
    marginRight: 20,
    backgroundColor: "grey",
    borderRadius: 100,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "contain",
    backgroundColor: "#F1F1F1",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cedula: {
    fontSize: 16,
    color: "#666",
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#FF5B5B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    marginTop: 10,
    width: "100%",
    height: 64,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#A4D4BB",
    borderWidth: 3,
    backgroundColor: "#FFFFFF",
    color: "#00826B",
    fontSize: 17,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  modalButton: {
    marginLeft: 10,
  },
  modalButtonText: {
    color: "#00826B",
    fontWeight: "bold",
  },
});

export default PerfilPaciente;
