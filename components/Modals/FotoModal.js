import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// ---------------------------------------------------------------------
import { supabase } from "../../utils/storage/supabase.js";
import { decode } from "base64-arraybuffer";

const FotoModal = ({ isVisible, onClose, onImagePicked, onChange, value }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Método para convertir una base64 a un ArrayBuffer
  // Paquete base64-arraybuffer ya se encarga de esto
  // const base64ToArrayBuffer = (base64) => {
  //   const binaryString = window.atob(base64);
  //   const len = binaryString.length;
  //   const bytes = new Uint8Array(len);
  //   for (let i = 0; i < len; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return bytes.buffer;
  // };

  // const handleImagePicked = async (selectedImage) => {
  //   const { base64 } = selectedImage;
  //   const buffer = base64ToArrayBuffer(base64);
  //   return buffer;
  // };

  const openImagePicker = async () => {
    // Pedir permiso para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    // Abrir el ImagePicker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    const selectedImage = result.assets[0];
    if (!result.canceled) {
      try {
        const { data, error } = await supabase.storage
          .from("NURSE")
          .upload(selectedImage.fileName, decode(selectedImage.base64), {
            contentType: "image/png",
          });
        if (error) console.log("Error uploading image: ", error);
        if (data) {
          const imageUrl =
            "https://jnyudpxchlukyoxinfai.supabase.co/storage/v1/object/public/NURSE/" +
            data.path;
          setSelectedImage(imageUrl);
          onImagePicked(imageUrl);
          onChange(imageUrl);
          value = imageUrl;
        }
      } catch (error) {
        console.log("Error uploading image: ", error);
      }
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.image} />
            </View>
          )} */}
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.selectButton}
          >
            <Text style={styles.selectButtonText}>Seleccionar imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  selectButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FotoModal;
