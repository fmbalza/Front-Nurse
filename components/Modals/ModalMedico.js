import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import userAccountFigure from "../../assets/user-account-figure.png";
import { MaskedText } from "react-native-mask-text";

const ModalMedico = ({ visible, medico, onClose }) => {
  const handlePress = () => {
    const url = `whatsapp://send?phone=${medico.medico.telefono}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("No se pudo abrir la aplicación de WhatsApp");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.row}>
            <View style={styles.photoContainer}>
              <Image
                source={
                  medico.medico.foto
                    ? { uri: medico.medico.foto }
                    : userAccountFigure
                }
                style={styles.photo}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{medico.medico.nombre}</Text>
              <Text style={styles.specialty}>{medico.medico.especialidad}</Text>
              <View style={styles.contactInfo}>
                <View style={styles.contactItem}>
                  <MaterialCommunityIcons name="phone" size={20} color="#333" />
                  <MaskedText
                    style={styles.contactText}
                    mask={"+99 999-9999999"}
                  >
                    {medico.medico.telefono}
                  </MaskedText>
                </View>
                <View style={styles.contactItem}>
                  <MaterialCommunityIcons name="email" size={20} color="#333" />
                  <Text style={styles.contactText}>{medico.medico.email}</Text>
                </View>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.whatsappButton]}
                  onPress={handlePress}
                >
                  <MaterialCommunityIcons
                    name="whatsapp"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.buttonText}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.closeButton]}
                  onPress={onClose}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    // backgroundColor: "#ccc",
    bottom: "17%",
    borderRadius: 100,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 100,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  specialty: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  contactInfo: {
    marginVertical: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  contactText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  whatsappButton: {
    backgroundColor: "#00826B",
  },
  closeButton: {
    backgroundColor: "#E53935",
  },
});

export default ModalMedico;
