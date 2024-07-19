import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import {
  useGetMedicamento,
  useCreateMedicamento,
  useUpdateMedicamento,
  useGetFunciones,
  useGetMedicamentoByID,
} from "../../../utils/hooks/medico/medicamento.js";
import { FlashList } from "@shopify/flash-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import useAuthStore from "../../../utils/storage/auth.js";

const CreateMedicamento = ({ closeModal }) => {
  const { user } = useAuthStore();
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetFunciones();
  const createMed = useCreateMedicamento();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm();

  const handleCreate = (data) => {
    const request = {
      ...data,
      origen: user.cedula_medico,
    };
    // console.log(request);
    // reset();
    createMed.mutate(request);
  };

  useEffect(() => {
    if (createMed.isSuccess) {
      reset();
      closeModal();
    }
  }, [createMed.isSuccess]);

  return (
    <View style={styles.modal_container}>
      <View style={styles.actual_modal}>
        {isFetching || isLoading || isPending ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#00826B" />
            </View>
          </>
        ) : (
          <>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Nombre del medicamento (componente principal)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="cp_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Presentacion"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="pr_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Dosis en miligramos"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  inputMode="numeric"
                />
              )}
              name="mg_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Indicaciones"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="in_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            {data && Array.isArray(data) && data.length > 0 && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderWidth: 3,
                      borderColor: "#A4D4BB",
                      borderRadius: 15,
                      width: "100%",
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={onChange}
                      value={value}
                      items={data.map((fn) => ({
                        label: fn.no_funcion,
                        value: fn.id_funcion,
                      }))}
                      placeholder={{
                        label: "Seleccione una funcion",
                        value: null,
                      }}
                      style={{
                        inputAndroid: {
                          fontSize: 18,
                          paddingHorizontal: 10,
                          paddingVertical: 8,
                          borderWidth: 1,
                          borderColor: "#00826B",
                          borderRadius: 10,
                          color: "#00826B",
                        },
                      }}
                    />
                  </View>
                )}
                name="fn_medicamento"
                rules={{ required: true }}
                defaultValue={""}
              />
            )}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00826B",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={handleSubmit((data) => handleCreate(data))}
              >
                <Text style={{ color: "#fff" }}>Crear Medicamento</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#FF0000",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={() => closeModal()}
              >
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
const UpdateMedicamento = ({ closeModal, medicamento }) => {
  const { user } = useAuthStore();
  // const medicamento = useGetMedicamentoByID(id_medicamento);
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetFunciones();
  const updateMed = useUpdateMedicamento();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (medicamento) {
      setValue("cp_medicamento", medicamento.cp_medicamento);
      setValue("pr_medicamento", medicamento.pr_medicamento);
      setValue("mg_medicamento", medicamento.mg_medicamento.toString());
      setValue("in_medicamento", medicamento.in_medicamento);
    }
  }, []);

  const handleUpdate = (data) => {
    const request = {
      ...data,
    };

    const params = {
      id_medicamento: medicamento.id_medicamento,
      request: request,
    };
    // console.log(params);
    updateMed.mutate(params);
  };

  useEffect(() => {
    if (updateMed.isSuccess) {
      reset();
      closeModal();
    }
  }, [updateMed.isSuccess]);

  return (
    <View style={styles.modal_container}>
      <View style={styles.actual_modal}>
        {isFetching || isLoading || isPending ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#00826B" />
            </View>
          </>
        ) : (
          <>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Nombre del medicamento (componente principal)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="cp_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Presentacion"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="pr_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Dosis en miligramos"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  inputMode="numeric"
                />
              )}
              name="mg_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Indicaciones"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="in_medicamento"
              rules={{ required: true }}
              defaultValue={""}
            />

            {data && Array.isArray(data) && data.length > 0 && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderWidth: 3,
                      borderColor: "#A4D4BB",
                      borderRadius: 15,
                      width: "100%",
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={onChange}
                      value={value}
                      items={data.map((fn) => ({
                        label: fn.no_funcion,
                        value: fn.id_funcion,
                      }))}
                      placeholder={{
                        label: "Seleccione una funcion",
                        value: null,
                      }}
                      style={{
                        inputAndroid: {
                          fontSize: 18,
                          paddingHorizontal: 10,
                          paddingVertical: 8,
                          borderWidth: 1,
                          borderColor: "#00826B",
                          borderRadius: 10,
                          color: "#00826B",
                        },
                      }}
                    />
                  </View>
                )}
                name="fn_medicamento"
                rules={{ required: true }}
                defaultValue={""}
              />
            )}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00826B",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={handleSubmit((data) => handleUpdate(data))}
              >
                <Text style={{ color: "#fff" }}>Actualizar Medicamento</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#FF0000",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={() => closeModal()}
              >
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const Medicamentos = () => {
  const { user } = useAuthStore();
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetMedicamento();

  const [filteredMeds, setFilteredMeds] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleSearch = (text) => {
    if (text === "") {
      setFilteredMeds(data);
    } else {
      setFilteredMeds(
        data.filter((med) =>
          med.cp_medicamento.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredMeds(data);
  }, [data]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {filteredMeds && (
        <View style={styles.modal}>
          <TextInput
            placeholder="Buscar Medicamento"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={{
              height: 60,
              borderWidth: 2,
              paddingLeft: 20,
              margin: 5,
              borderColor: "#FAFAFA",
              backgroundColor: "white",
              borderRadius: 7,
              elevation: 3,
            }}
          />

          {isFetching || isLoading || isPending ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#00826B" />
            </View>
          ) : (
            <FlashList
              data={filteredMeds}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <TouchableOpacity
                    onPress={() => {
                      // console.log(item);
                      setSelectedMed(item);
                      setShowModal(true);
                    }}
                  >
                    <Text style={styles.dataTitle}>
                      {item?.cp_medicamento} - {item?.pr_medicamento} (
                      {item?.mg_medicamento} mg)
                    </Text>
                    {/* <Text style={styles.dataText}>
                      {item?.fn_medicamento?.no_funcion}:{" "}
                      {item?.fn_medicamento?.de_funcion}
                    </Text> */}
                  </TouchableOpacity>
                  {item.origen == user.cedula_medico && (
                    <TouchableOpacity
                      style={{ position: "absolute", right: 10, top: 10 }}
                      onPress={() => {
                        // console.log("Update med");
                        setSelectedMed(item);
                        setShowUpdateModal(true);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="pencil"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              estimatedItemSize={200}
              keyExtractor={(item) => item.id_medicamento.toString()}
              ItemSeparatorComponent={() => (
                <View style={{ height: 0.5, width: "100%" }} />
              )}
            />
          )}
        </View>
      )}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modal_container}>
          <View style={styles.actual_modal}>
            <View style={{ alignItems: "flex-start", width: "100%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  marginBottom: 5,
                }}
              >
                {selectedMed?.cp_medicamento}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Presentacion: </Text>
                <Text>{selectedMed?.pr_medicamento}. </Text>
                <Text>{selectedMed?.mg_medicamento} mg</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Indicaciones: </Text>
                <Text>{selectedMed?.in_medicamento}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Funcion: </Text>
                <Text>{selectedMed?.fn_medicamento?.no_funcion}. </Text>
                <Text>{selectedMed?.fn_medicamento?.de_funcion}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#00826B",
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={() => {
                setShowModal(false);
                setSelectedMed(null);
              }}
            >
              <Text style={{ color: "#fff" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showCreateModal} transparent={true} animationType="slide">
        <CreateMedicamento
          closeModal={() => {
            setShowCreateModal(false);
            // console.log("Close modal");
          }}
        />
      </Modal>

      <Modal visible={showUpdateModal} transparent={true} animationType="slide">
        <UpdateMedicamento
          closeModal={() => {
            setShowUpdateModal(false);
            // console.log("Close modal");
          }}
          medicamento={selectedMed}
        />
      </Modal>

      <Pressable
        onPress={() => {
          console.log("Add new med");
          setShowCreateModal(true);
        }}
        style={{
          position: "absolute",
          bottom: "4%",
          right: "4%",

          backgroundColor: "#00826B",
          borderRadius: 50,
          padding: 15,
          elevation: 5,
        }}
      >
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default Medicamentos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    padding: 10,
  },
  modal: {
    flex: 1,
    width: "100%",
    // height: "80%",
    // backgroundColor: "#fff",
    padding: 20,
    // borderRadius: 20,
  },
  actual_modal: {
    width: "90%",
    height: "auto",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  listItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    // borderColor: "#A4D4BB",
    borderRadius: 10,
    borderColor: "#D6FFE9",
    backgroundColor: "#D6FFE9",
    elevation: 5,
    height: "auto",
    // minHeight: 80,
    margin: 5,
  },
  dataTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },
  dataText: {
    // fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    width: "100%",
    height: 64,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#A4D4BB",
    borderWidth: 3,
    backgroundColor: "#FFFFFF",
    color: "#00826B",
    fontSize: 17,
    marginBottom: 10,
  },
});
