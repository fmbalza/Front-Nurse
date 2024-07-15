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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUpdateConsulta } from "../../../utils/hooks/medico/consultaDia";
// import { useForm, Controller } from "react-hook-form";
import ImageViewer from "../../../components/ImageViewer.js";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../utils/storage/supabase.js";
import { decode } from "base64-arraybuffer";

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
  const [addedImages, setAddedImages] = useState([]);
  // const [selectedImage, setSelectedImage] = useState([]);
  const [isLoadingManually, setManualLoading] = useState(false);
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
      url: addedImages,
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

  const openImagePicker = async () => {
    // Pedir permiso para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    // Abrir el ImagePicker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [16, 9],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      // setSelectedImage((prev) => [...prev, selectedImage.uri]);

      try {
        setManualLoading(true);
        const rnd = Math.floor(Math.random() * 1000000);
        const { data, error } = await supabase.storage
          .from("NURSE")
          .upload(
            `${rnd}${selectedImage.fileName}`,
            decode(selectedImage.base64),
            {
              contentType: "image/png",
            }
          );
        if (error) console.log("Error uploading image: ", error);
        if (data) {
          const imageUrl =
            process.env.EXPO_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/NURSE/" +
            data.path;
          //   console.log(imageUrl);
          //   setSelectedImage(imageUrl);
          //   setUrl(imageUrl);
          setAddedImages((prev) => [...prev, imageUrl]);
        }
      } catch (error) {
        console.log("Error uploading image: ", error);
      }
      setManualLoading(false);
      // onClose();
    }
  };

  handleRemoveImage = (index) => {
    setAddedImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (updateConsultaMutation.isSuccess) {
      // navigation.navigate("Consulta", { idconsulta }); // Going too soon is problematic
      navigation.goBack(); // So we go back instead, which is more reliable
    }
  }, [updateConsultaMutation.isSuccess]);

  // useEffect(() => {
  //   console.log(addedImages);
  //   // console.log(selectedImage);
  // }, [addedImages]);

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

          <View style={{ height: 50 }} />
          <Text style={styles.label}>Adjuntos:</Text>
          {addedImages.length > 0 ? (
            <View style={{ flexDirection: "row", gap: 10 }}>
              {addedImages.map((image, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ImageViewer imageUri={image} />
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ff3b30",
                      padding: 5,
                      marginTop: 5,
                      borderRadius: 4,
                      justifyContent: "center",
                    }}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Text style={{ color: "#fff" }}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#ccc" }}>No se han subido imágenes</Text>
              </View>
            </>
          )}

          {/* {selectedImage && (
            <View>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200 }}
              />
              <ImageViewer imageUri={selectedImage} />
            </View>
          )} */}

          <View style={{ height: 50 }} />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={openImagePicker}
          >
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
                  style={
                    isLoadingManually
                      ? styles.modalButtonDis
                      : styles.modalButton
                  }
                  onPress={() => handleConfirmSave()}
                  disabled={isLoadingManually}
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
    marginVertical: 12,
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
  modalButtonDis: {
    backgroundColor: "#797979",
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
