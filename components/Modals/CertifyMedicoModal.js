import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
// import { useForm, Controller } from "react-hook-form";
import { useRequestCertificado } from "../../utils/hooks/medico/auth";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../utils/storage/supabase.js";
import { decode } from "base64-arraybuffer";

const CertifyMedicoModal = ({ visible, onClose }) => {
  const requestCertificadoMutation = useRequestCertificado();
  const [isLoadingManually, setManualLoading] = useState(false);

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
          requestCertificadoMutation.mutate({ url: imageUrl });
        }
      } catch (error) {
        console.log("Error uploading image: ", error);
      }
      setManualLoading(false);
      onClose();
    }
  };

  if (isLoadingManually)
    return (
      <Modal visible={true} animationType="slide" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      </Modal>
    );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>-- Verificacion de Cuenta --</Text>
          <Text style={styles.text}>
            Para poder completar tu registro, necesitamos que subas una imagen
            de tu certificado médico o cualquier documento que acredite tu
            profesión. Una vez que subas tu certificado, nuestro equipo lo
            revisará y te notificará por correo si tu certificado fue aprobado.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => openImagePicker()}
              disabled={isLoadingManually}
            >
              <Text style={styles.buttonText}>Subir Certificado</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
              disabled={isLoadingManually}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#00826B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
  },
});

export default CertifyMedicoModal;
