// import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  // Switch,
  ActivityIndicator,
} from "react-native";
import { SignUpStyles } from "../../styles/globalStyles";
import DatePicker from "../../components/DatePicker";
import GenderPicker from "../../components/GenderPicker";
// import { useNavigation } from "@react-navigation/native";
// ---------------------------------------------------------------------
import { useForm, Controller } from "react-hook-form";
import { useRegisterPaciente } from "../../utils/hooks/paciente/auth.js";
import { MaskedTextInput } from "react-native-mask-text";
// import { doRegister } from "../../utils/api/paciente/auth.js";

const PacienteSignUp = () => {
  // const navigation = useNavigation();
  // const [isFamiliar, setIsFamiliar] = useState(false);

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

  // const handleSwitchToggle = (value) => {
  //   setIsFamiliar(value);
  // };

  return (
    <ScrollView>
      <LinearGradient
        colors={["#FFFFFF", "#D6FFE9"]}
        style={{
          height: 1000,
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
            {/* Este texto se deforma en mi telefono (•_•) */}
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
              name="no_paciente"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors.no_paciente && <Text style={{ color: 'red' }}>Nombre requerido</Text> */}

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
            {/* {errors.ap_paciente && <Text style={{ color: 'red' }}>Apellido requerido</Text> */}

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
              name="cedula_paciente"
              rules={{ required: true }}
              defaultValue={""}
            />
            {/* {errors.cedula_paciente && <Text style={{ color: 'red' }}>Cedula requerida</Text>} */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
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
            {/* {errors.telefono && <Text style={{ color: 'red' }}>Telefono requerido</Text>} */}

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
                  <DatePicker onDateChange={onChange} value={value} />
                </View>
              )}
              name="fecha_nacimiento"
              defaultValue={new Date().toISOString().split("T")[0]}
              // rules={{ required: true }} // siempre tiene algo asignado por defecto
            />

            {/* 
              Fran, el mensaje hay que moverlo a un componente que se muestre al presionar ⓘ
              un tooltip basicamente
            */}
            {/* 
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 15,
                }}
              >
                <Text style={{ fontSize: 20, color: "#00826B" }}>Familiar</Text>
                <Switch
                  value={isFamiliar}
                  onValueChange={handleSwitchToggle}
                  trackColor={{ false: "#767577", true: "#A4D4BB" }}
                  thumbColor={isFamiliar ? "#00826B" : "#A4D4BB"}
                  ios_backgroundColor="#3e3e3e"
                  style={styles.switch}
                />
              </View>

              <Text
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  fontSize: 15,
                  color: "#00826B",
                }}
              >
                Activar la funcionalidad de "Familiar" te permitiria poder acceder
                a los registros de tratamientos en uso de los usuarios que te lo
                permitan. En caso de tener un miembro mayor de tu familia en la
                aplicacion Nurse, te permitira ver su tratamiento en tiempo real,
                y hacerle seguimiento{" "}
              </Text> 
            */}

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

export default PacienteSignUp;
