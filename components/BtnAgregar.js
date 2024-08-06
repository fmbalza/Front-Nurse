import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  View,
  Button,
} from "react-native";
import {
  useAssignPaciente,
  useDeleteAsPaciente,
} from "../utils/hooks/medico/paciente";
import { useGetPacienteMedico } from "../utils/hooks/medico/paciente";
import { PrimaryColor } from "../styles/globalStyles.js";

const BtnAgregar = ({ cedula, user }) => {
  const assignPacienteMutation = useAssignPaciente();
  const removePacienteMutation = useDeleteAsPaciente();
  const pacienteMedicoQuery = useGetPacienteMedico();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      Array.isArray(pacienteMedicoQuery.data) &&
      pacienteMedicoQuery.data.length > 0
    ) {
      const pacienteEncontrado = pacienteMedicoQuery.data.find(
        (paciente) => paciente.cedula_paciente === cedula
      );
      setIsFollowing(!!pacienteEncontrado);
    } else {
      setIsFollowing(false); // Establecer el estado a "agregar"
    }
  }, [pacienteMedicoQuery.data, cedula]);

  const handleFollow = async () => {
    if (isFollowing) {
      setShowModal(true);
    } else {
      // Handle "Agregar" logic:
      try {
        await assignPacienteMutation.mutate({
          cedula_medico: user.cedula_medico,
          cedula_paciente: cedula,
        }); // Use provided cedula and query data
        setIsFollowing(true); // Update state for visual change
      } catch (error) {
        console.error("Error assigning patient:", error);
        // Handle error gracefully (e.g., display an error message)
      }
    }
  };

  const handleRemove = async () => {
    setIsFollowing(false); // Update state for visual change
    setShowModal(false);

    try {
      // console.log("Aqui en BtnAgregar.js: ", user.cedula_medico);
      // console.log("Aqui en BtnAgregar.js: ", cedula);
      await removePacienteMutation.mutate({
        cedula_medico: `${user.cedula_medico}`,
        cedula_paciente: `${cedula}`,
      });
      setIsFollowing(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error removing patient:", error);
      setIsFollowing(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          isFollowing ? styles.removeButton : styles.addButton,
        ]}
        onPress={handleFollow}
      >
        <Text
          style={[
            styles.buttonText,
            isFollowing ? styles.removeText : styles.addText,
          ]}
        >
          {isFollowing ? "Remover" : "Agregar"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText} numberOfLines={2}>
              ¿Está seguro de que quiere {"\n"}remover al usuario de sus
              pacientes?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Button
                title="Confirmar"
                onPress={handleRemove}
                color={PrimaryColor}
              />
              <Button
                title="Cancelar"
                onPress={handleCancel}
                color={PrimaryColor}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  addButton: {
    backgroundColor: "#00826B",
    borderColor: "#00826B",
    borderWidth: 1,
  },
  pendingButton: {
    backgroundColor: "#FFC107",
    borderColor: "#FFC107",
    borderWidth: 1,
  },
  removeButton: {
    backgroundColor: "#fff",
    borderColor: "#dbdbdb",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addText: {
    color: "#fff",
  },
  pendingText: {
    color: "#262626",
  },
  removeText: {
    color: "#262626",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
});

export default BtnAgregar;
