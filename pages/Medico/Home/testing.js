import { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../utils/storage/auth";
import CertifyMedicoModal from "../../../components/Modals/CertifyMedicoModal";
import { useState, useEffect } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useUpdateMedico } from "../../../utils/hooks/medico/auth";
import { useForm, Controller } from "react-hook-form";
import SpecialtyPicker from "../../../components/SpecialtyPicker";
import GenderPicker from "../../../components/GenderPicker";
import { useGetMe } from "../../../utils/hooks/medico/auth";
import { useEspecialidades } from "../../../utils/hooks/medico/especialidades";
const Testing = () => {
  const { isPending, isError, data, error } = useEspecialidades();
  const getMeQuery = useGetMe();
  const updateMutation = useUpdateMedico();
  const navigation = useNavigation();
  const { user, logout, certified } = useAuthStore.getState();
  const specialties = [];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const doLogOut = () => {
    // Aquí se debe de hacer el logout
    logout();
    navigation.getParent("MainStack").navigate("StartPage", { logout: true });
  };

  const [userData, setUserData] = useState({
    no_medico: user.no_medico,
    ap_medico: user.ap_medico,
    telefono: user.telefono,
    genero: user.genero,
    foto_perfil: user.foto_perfil,
    especialidad: user.id_especialidad.de_especialidad,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setUserData({
      no_medico: user.no_medico,
      ap_medico: user.ap_medico,
      telefono: user.telefono,
      genero: user.genero,
      foto_perfil: user.foto_perfil,
      especialidad: user.id_especialidad.de_especialidad,
    });
  }, [user]);

  if (getMeQuery.isError) {
    return <Text>Error:{error.message}</Text>;
  }

  if (getMeQuery.isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (data) {
    // [{ label: "Cardiologia", value: "1", color: "00826B" }]
    const format = data.map((specialty) => {
      return {
        label: specialty.de_especialidad,
        value: specialty.id_especialidad.toString(),
        color: "#00826B",
      };
    });
    specialties.push(...format);
  }

  const medicos = getMeQuery.data.map((medico) => ({
    cedula: medico.cedula_medico,
    nombre: `${medico.no_medico} ${medico.ap_medico}`,
    telefono: medico.telefono,
    genero: medico.genero,
    foto_perfil: medico.foto_perfil,
    especialidad: medico.especialidad.de_especialidad,
  }));

  const handleUpdate = (values) => {
    const updatedData = {
      no_medico: values.no_medico || userData.no_medico,
      ap_medico: values.ap_medico || userData.ap_medico,
      telefono: values.telefono || userData.telefono,
      genero: values.genero || userData.genero,
      foto_perfil: values.foto_perfil || userData.foto_perfil,
      id_especialidad: values.id_especialidad || userData.especialidad,
    };
    console.log(updatedData);
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
      {medicos.map((medico, index) => (
        <View key={index} style={styles.medicoContainer}>
          <View style={styles.header}>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: medico.foto_perfil }}
                style={styles.photo}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{medico.nombre}</Text>
              <Text style={styles.cedula}>C.I: {user.cedula_medico}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Especialiadad: {medico.especialidad}
            </Text>
            <Text style={styles.infoText}>Género: {medico.genero}</Text>
            <Text style={styles.infoText}>Teléfono: {medico.telefono}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        onPress={doLogOut}
        style={styles.logoutButton}
        titleStyle={styles.logoutButtonText}
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
              name="no_medico"
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
              name="ap_medico"
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

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.componentt}>
                  <GenderPicker onGenderChange={onChange} value={value} />
                </View>
              )}
              name="genero"
              rules={{ required: false }}
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.componentt}>
                  <SpecialtyPicker
                    onSpecialtyChange={onChange}
                    value={value}
                    specialties={specialties || []}
                  />
                </View>
              )}
              name="id_especialidad"
              rules={{ required: true }}
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
    width: 270,
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
