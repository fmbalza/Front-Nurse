import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { PrimaryColor } from "../styles/globalStyles";

const ImageViewer = ({ imageUri }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Image
          source={{ uri: imageUri }}
          style={styles.previewImage}
          onLoad={handleLoad}
        />
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator
          size="small"
          color={PrimaryColor}
          style={styles.loadingIndicator}
        />
      )}
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.fullImage}
            onLoad={handleLoad}
          />
          {loading && (
            <ActivityIndicator
              size="large"
              color={PrimaryColor}
              style={styles.loadingIndicator}
            />
          )}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  previewImage: {
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
});
