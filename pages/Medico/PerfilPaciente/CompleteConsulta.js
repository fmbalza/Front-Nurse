import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUpdateConsulta } from "../../../utils/hooks/medico/consultaDia";
import { useForm, Controller } from "react-hook-form";

const CompleteConsulta = ({ route }) => {
  const { idconsulta } = route.params;
  const navigation = useNavigation();
  const updateConsultaMutation = useUpdateConsulta(idconsulta);
  const [showModal, setShowModal] = useState(false);
  // const [formData, setFormData] = useState({
  //   ocupacion: "",
  //   motivosConsulta: "",
  //   antecedentePersonales: "",
  //   examenFisico: "",
  //   impresionDiagnostica: "",
  //   planManejo: "",
  // });
  const [formData, setFormData] = useState({
    motivosConsulta: "",
    antecedentePersonales: "",
    examenFisico: "",
    impresionDiagnostica: "",
    planManejo: "",
  });
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const handleConfirmSave = async (values) => {
    const examen = {
      //   examen: `
      //   Ocupación: ${formData.ocupacion}
      //   Motivos de Consulta: ${formData.motivosConsulta}
      //   Antecedentes Personales: ${formData.antecedentePersonales}
      //   Examen Físico: ${formData.examenFisico}
      //   Impresión Diagnóstica: ${formData.impresionDiagnostica}
      //   Plan de Manejo: ${formData.planManejo}
      // `,
      examen: `
      Motivos de Consulta: ${formData.motivosConsulta}
      Antecedentes Personales: ${formData.antecedentePersonales}
      Examen Físico: ${formData.examenFisico}
      Impresión Diagnóstica: ${formData.impresionDiagnostica}
      Plan de Manejo: ${formData.planManejo}
    `,
      estado: `1`,
    };
    // console.log(examen);
    await updateConsultaMutation.mutate({ idconsulta, data: examen });
    setShowModal(false);
  };

  const handleSave = () => {
    // Lógica para guardar la información de la consulta
    setShowModal(true);
  };

  const handleCancelSave = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (updateConsultaMutation.isSuccess) {
      // navigation.navigate("Consulta", { idconsulta }); // Going too soon is problematic
      navigation.goBack(); // So we go back instead, which is more reliable
    }
  }, [updateConsultaMutation.isSuccess]);

  return (
    <View style={{ flex: 1 }}>
      {updateConsultaMutation.isPending || updateConsultaMutation.isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Consulta</Text>

          {/* <TextInput
          style={styles.textArea}
          placeholder="Ocupación"
          value={formData.ocupacion}
          onChangeText={(text) => setFormData({ ...formData, ocupacion: text })}
          multiline
        /> */}
          <TextInput
            style={styles.textArea}
            placeholder="Motivos de Consulta"
            value={formData.motivosConsulta}
            onChangeText={(text) =>
              setFormData({ ...formData, motivosConsulta: text })
            }
            multiline
          />
          <TextInput
            style={styles.textArea}
            placeholder="Antecedentes Personales"
            value={formData.antecedentePersonales}
            onChangeText={(text) =>
              setFormData({ ...formData, antecedentePersonales: text })
            }
            multiline
          />
          <TextInput
            style={styles.textArea}
            placeholder="Examen Físico"
            value={formData.examenFisico}
            onChangeText={(text) =>
              setFormData({ ...formData, examenFisico: text })
            }
            multiline
          />
          <TextInput
            style={styles.textArea}
            placeholder="Impresión Diagnóstica"
            value={formData.impresionDiagnostica}
            onChangeText={(text) =>
              setFormData({ ...formData, impresionDiagnostica: text })
            }
            multiline
          />
          <TextInput
            style={styles.textArea}
            placeholder="Plan de Manejo"
            value={formData.planManejo}
            onChangeText={(text) =>
              setFormData({ ...formData, planManejo: text })
            }
            multiline
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.buttonText}>Subir Imágenes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                ¿Está seguro que desea guardar los cambios?
              </Text>
              <Text style={styles.modalText}>
                Tras realizar esta operación no podrá editar la información de
                la consulta.
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleConfirmSave()}
                >
                  <Text style={styles.modalButtonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCancelSave}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginVertical: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginVertical: 8,
    height: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    flexGrow: 1,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default CompleteConsulta;
