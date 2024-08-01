import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React from "react";
import {
  PrimaryColor,
  SecondaryColor,
  ThirdColor,
  BackgroundShade,
  WhiteColor,
  BlackColor,
} from "../../styles/globalStyles";

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: ThirdColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: WhiteColor }}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
});
