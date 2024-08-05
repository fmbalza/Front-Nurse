import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
  Image
} from "react-native";
import { SignUpStyles } from "../../styles/globalStyles";
import DatePicker from "../../components/DatePicker";
import GenderPicker from "../../components/GenderPicker";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { useRegisterPaciente } from "../../utils/hooks/paciente/auth.js";
import { MaskedTextInput } from "react-native-mask-text";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import {
  PrimaryColor,
  SecondaryColor,
  ThirdColor,
  BackgroundShade,
  WhiteColor,
  BlackColor,
} from "../../styles/globalStyles";
import CustomAlert from "../../components/Modals/CustomAlert.js";

const PacienteSignUp = () => {
  // const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState('');

  const loadFiveSeconds = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

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

  const registerMutation = useRegisterPaciente();

  const handleRegister = (values) => {
    // console.log(values);
    registerMutation.mutate(values);
  };

  useEffect(() => {
    if (
      registerMutation.data &&
      registerMutation.data == "Paciente ya existe"
    ) {
      showAlert();
    }
  }, [registerMutation.data]);

  const handleFocus = () => {
    setShowText(true);
  };

  const handleBlur = () => {
    setShowText(false);
  };

  const handleChangeText = (newText) => {
    setText(newText);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={["#FFFFFF", "#D6FFE9"]} style={{ flexGrow: 1 }}>
          {/* <Button title="Cargar 5 segundos" onPress={loadFiveSeconds} /> */}
          <CustomAlert
            visible={alertVisible}
            message="La cedula ingresada ya esta registrada en el sistema"
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
                Formulario Paciente
              </Text>
            </View>
            <Image source={require("../../assets/nurse_logo.png")} 
            style={{width:60, height:69, left:"40%", top:"-15%"}
            }></Image>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                height: "70%",
                top:-70
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
                name="no_paciente"
                rules={{ required: true }}
                defaultValue={""}
              />
              <View>
                {errors.no_paciente && (
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
                name="ap_paciente"
                rules={{ required: true }}
                defaultValue={""}
              />
              <View>
                {errors.ap_paciente && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      Este campo es requerido
                  </Text>
                )}
              </View>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MaskedTextInput
                    style={SignUpStyles.inputs}
                    placeholderTextColor="#00826B"
                    placeholder="Cedula "
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={(text, rawText) => onChange(rawText)}
                    mask={"99.999.999"}
                    value={value}
                  />
                )}
                name="cedula_paciente"
                rules={{ required: true }}
                defaultValue={""}
              />
              <View>
                {errors.cedula_paciente && (
                  <Text style={styles.errorMessage}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      Este campo es requerido
                  </Text>
                )}
              </View>
              <View style={{justifyContent:'flex-start', width:'100%', marginLeft: 60, marginTop: 10}}>
                {showText && (
                    <Text style={{color:'#005848'}}>
                      Especificar el código de región {"\n"} 
                      Ej: +XY 123-1234567 
                    </Text>
                  )}
                </View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MaskedTextInput
                    style={SignUpStyles.inputs}
                    placeholderTextColor="#00826B"
                    placeholder="Telefono "
                    onBlur={handleBlur}
                    onChangeText={(text, rawText) => onChange(rawText)}
                    mask={"+99 999-9999999"}
                    value={value}
                    keyboardType="numeric"
                    onFocus={handleFocus}
                  />
                )}
                name="telefono"
                rules={{ required: true }}
                defaultValue={""}
              />
              <View>
                {errors.telefono && (
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
                    <GenderPicker onGenderChange={onChange} value={value} />
                  </View>
                )}
                name="genero"
                rules={{ required: true }}
              />
              <View>
                {errors.genero && (
                  <Text style={[styles.errorMessage, { marginTop: 10 }]}>
                    <Icon name="alert-circle-outline" color={"red"} />
                      Este campo es requerido
                  </Text>
                )}
              </View>

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.componentt}>
                    <DatePicker onDateChange={onChange} value={value} />
                  </View>
                )}
                name="fecha_nacimiento"
                defaultValue={new Date().toISOString().split("T")[0]}
                // rules={{ required: true }} // siempre tiene algo asignado por defecto
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

export default PacienteSignUp;
