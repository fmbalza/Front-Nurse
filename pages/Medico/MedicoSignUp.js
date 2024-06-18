import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SignUpStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import GenderPicker from "../../components/GenderPicker";
import SpecialtyPicker from "../../components/SpecialtyPicker";
import FotoModal from "../../components/Modals/FotoModal";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { useRegisterMedico } from "../../utils/hooks/medico/auth.js";
import { useEspecialidades } from "../../utils/hooks/medico/especialidades";
// import { doRegister } from "../../utils/api/paciente/auth.js";
import { MaskedTextInput } from "react-native-mask-text";

const MedicoSignUp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const specialties = [];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerMutation = useRegisterMedico();
  const { isPending, isError, data, error } = useEspecialidades();

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  if (isPending) {
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

  const handleRegister = (values) => {
    console.log(values);
    registerMutation.mutate(values);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleImagePicked = (imageUri) => {
    setSelectedImageUri(imageUri);
    // console.log(selectedImageUri);
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={["#FFFFFF", "#D6FFE9"]}
        style={{
          height: 1300,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",

              backgroundColor: "#006150",
              width: "100%",
              height: 300,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 10,
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                fontSize: 45,
                textAlign: "left",
                color: "#FFFFFF",
                fontWeight: "700",
                marginLeft: 30,
              }}
            >
              Ingrese los siguientes datos
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              width: "100%",
              height: "70%",
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={SignUpStyles.inputs}
                  placeholderTextColor="#00826B"
                  placeholder="Nombre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="no_medico"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors.no_medico && <Text style={{ color: 'red' }}>Nombre requerido</Text> */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={SignUpStyles.inputs}
                  placeholderTextColor="#00826B"
                  placeholder="Apellido"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="ap_medico"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors.ap_medico && <Text style={{ color: 'red' }}>Apellido requerido</Text> */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={SignUpStyles.inputs}
                  placeholderTextColor="#00826B"
                  placeholder="Contraseña"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="contrasena"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors. && <Text style={{ color: 'red' }}> requerido</Text> */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <MaskedTextInput
                  style={SignUpStyles.inputs}
                  placeholderTextColor="#00826B"
                  placeholder="Cedula Ej: 29.560.310"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(text, rawText) => onChange(rawText)}
                  mask={"99.999.999"}
                  value={value}
                />
              )}
              name="cedula_medico"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors. && <Text style={{ color: 'red' }}> requerido</Text> */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                // <TextInput
                //   style={SignUpStyles.inputs}
                //   placeholderTextColor="#00826B"
                //   placeholder="Ej: 0123-1234567"
                //   onBlur={onBlur}
                //   onChangeText={onChange}
                //   value={value}
                //   keyboardType="numeric"
                // />
                <MaskedTextInput
                  style={SignUpStyles.inputs}
                  placeholderTextColor="#00826B"
                  placeholder="Telefonon Ej: +58 123-1234567"
                  onBlur={onBlur}
                  onChangeText={(text, rawText) => onChange(rawText)}
                  mask={"+99 999-9999999"}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="telefono"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors. && <Text style={{ color: 'red' }}> requerido</Text> */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={SignUpStyles.inputs}
                  placeholderTextColor="#00826B"
                  placeholder="Correo"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors. && <Text style={{ color: 'red' }}> requerido</Text> */}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.componentt}>
                  <GenderPicker onGenderChange={onChange} value={value} />
                </View>
              )}
              name="genero"
              rules={{ required: true }}
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

            <TouchableOpacity onPress={openModal} style={SignUpStyles.btnCert}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "300",
                }}
              >
                Subir Foto de perfil
              </Text>
            </TouchableOpacity>

            {/* no funciona como deberia */}
            {/* {selectedImageUri && (
              <Image
                source={{ uri: selectedImageUri }}
                style={{ width: 300, height: 300 }}
              />
            )} */}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <FotoModal
                  isVisible={isModalVisible}
                  onClose={closeModal}
                  onImagePicked={handleImagePicked}
                  onChange={onChange}
                  value={value}
                />
              )}
              name="foto_perfil"
            />

            <TouchableOpacity
              onPress={handleSubmit((data) => handleRegister(data))}
              style={SignUpStyles.btnAceptar}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "300",
                }}
              >
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {registerMutation.isPending && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentt: {
    marginTop: 10,
  },
  input: {
    width: 352,
    height: 64,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#A4D4BB",
    borderWidth: 3,
    backgroundColor: "#FFFFFF",
    color: "#00826B",
    fontSize: 17,
  },
});

export default MedicoSignUp;
