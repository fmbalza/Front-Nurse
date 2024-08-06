import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { SignUpStyles } from "../../styles/globalStyles";
import GenderPicker from "../../components/GenderPicker";
import SpecialtyPicker from "../../components/SpecialtyPicker";
import FotoModal from "../../components/Modals/FotoModal";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { useRegisterMedico } from "../../utils/hooks/medico/auth.js";
import { useEspecialidades } from "../../utils/hooks/medico/especialidades";
import { MaskedTextInput } from "react-native-mask-text";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import CustomAlert from "../../components/Modals/CustomAlert.js";
import {
  PrimaryColor,
  SecondaryColor,
  ThirdColor,
  BackgroundShade,
  WhiteColor,
  BlackColor,
} from "../../styles/globalStyles";

const MedicoSignUp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const specialties = [];
  const [alertVisible, setAlertVisible] = useState(false);
  // const [showText, setShowText] = useState(false);
  // const [text, setText] = useState('');

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerMutation = useRegisterMedico();

  useEffect(() => {
    if (
      registerMutation.data &&
      registerMutation.data !== "Medico creado exitosamente"
    ) {
      showAlert();
    }
  }, [registerMutation.data]);

  const { isPending, isError, data, error } = useEspecialidades();

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00826B" />
      </View>
    );
  }

  if (data) {
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
    // console.log("Aqui en MedicoSignUp.js: ", values);
    registerMutation.mutate(values);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleImagePicked = (imageUri) => {
    // weird/bad fran practice/implementation...
    setSelectedImageUri(imageUri);
    // console.log(selectedImageUri);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={["#FFFFFF", "#D6FFE9"]}
          style={{
            flexGrow: 1,
            paddingBottom: 150,
          }}
        >
          <CustomAlert
            visible={alertVisible}
            message={
              registerMutation.data == "Medico ya existe"
                ? "La cédula o el correo ya están registrados en el sistema"
                : registerMutation.data
            }
            onClose={hideAlert}
          />

          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "left",
                width: "100%",
                height: 150,
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: "bold",
                  color: "#00826B",
                  marginLeft: 20,
                }}
              >
                Formulario Médico
              </Text>
            </View>
            <Image
              source={require("../../assets/nurse_logo.png")}
              style={{ width: 60, height: 69, left: "40%", top: "-12%" }}
            ></Image>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                height: "70%",
                top: -30,
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
              <View>
                {errors.no_medico && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      Este campo es requerido
                  </Text>
                )}
              </View>

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
              <View>
                {errors.ap_medico && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      Este campo es requerido
                  </Text>
                )}
              </View>

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
                rules={{ required: true, minLength: 8, maxLength: 16 }}
                defaultValue={""}
              />
              <View>
                {errors.contrasena && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      
                    {errors.contrasena.type === "required" &&
                      "Este campo es requerido"}
                    {errors.contrasena.type === "minLength" &&
                      "La contraseña debe tener al menos 8 caracteres"}
                    {errors.contrasena.type === "maxLength" &&
                      "La contraseña debe tener menos de 16 caracteres"}
                  </Text>
                )}
              </View>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MaskedTextInput
                    style={SignUpStyles.inputs}
                    placeholderTextColor="#00826B"
                    placeholder="Cédula Ej: 29.560.310"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={(text, rawText) => onChange(rawText)}
                    mask={"99.999.999"}
                    value={value}
                  />
                )}
                name="cedula_medico"
                rules={{ required: true, minLength: 8, maxLength: 8 }}
                defaultValue={""}
              />
              <View>
                {errors.cedula_medico && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      
                    {errors.cedula_medico.type === "required" &&
                      "Este campo es requerido"}
                    {errors.cedula_medico.type === "minLength" &&
                      "La cédula debe tener 8 dígitos"}
                  </Text>
                )}
              </View>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MaskedTextInput
                    style={SignUpStyles.inputs}
                    placeholderTextColor="#00826B"
                    placeholder="Teléfono Ej: +58 123-1234567"
                    onBlur={onBlur}
                    onChangeText={(text, rawText) => onChange(rawText)}
                    mask={"+99 999-9999999"}
                    value={value}
                    keyboardType="numeric"
                  />
                )}
                name="telefono"
                rules={{
                  required: true,
                  minLength: 11,
                }}
                defaultValue={""}
              />
              <View>
                {errors.telefono && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      
                    {errors.telefono.type === "required" &&
                      "Este campo es requerido"}
                    {errors.telefono.type === "minLength" &&
                      "El teléfono esta incompleto"}
                  </Text>
                )}
              </View>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={SignUpStyles.inputs}
                    placeholderTextColor="#00826B"
                    placeholder="Correo Electrónico"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                defaultValue={""}
              />
              <View>
                {errors.email && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      
                    {errors.email.type === "required" &&
                      "Este campo es requerido"}
                    {errors.email.type === "pattern" && "Correo inválido"}
                  </Text>
                )}
              </View>

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
              <View>
                {errors.genero && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      Este campo es requerido
                  </Text>
                )}
              </View>

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
              <View>
                {errors.id_especialidad && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      Este campo es requerido
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={openModal}
                style={SignUpStyles.btnCert}
              >
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
        </LinearGradient>
      </ScrollView>
      {registerMutation.isPending && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: BackgroundShade,
          }}
        >
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      )}
    </View>
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
  errorMessage: {
    color: "red",
    fontSize: 14,
  },
});

export default MedicoSignUp;
