import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
  Image
} from "react-native";
import { useState, useEffect } from "react";
import {
  useCreateTratamiento,
  useGetTratamiento,
  useUpdateTratamiento,
  useGetCategorias,
} from "../../../utils/hooks/medico/tratamiento.js";
import { FlashList } from "@shopify/flash-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import useAuthStore from "../../../utils/storage/auth.js";

const CreateTratamiento = ({ closeModal }) => {
  const { user } = useAuthStore();
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetCategorias();
  const createTreat = useCreateTratamiento();

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
    createTreat.mutate(request);
  };

  useEffect(() => {
    if (createTreat.isSuccess) {
      reset();
      closeModal();
    }
  }, [createTreat.isSuccess]);

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
                  placeholder="Nombre del tratamiento"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="nombre"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Descripcion"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  multiline={true}
                />
              )}
              name="descripcion"
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
                        label: fn.de_categoria,
                        value: fn.id_categoria,
                      }))}
                      placeholder={{
                        label: "Seleccione una categoria",
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
                name="categoria"
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
                <Text style={{ color: "#fff" }}>Crear Tratamiento</Text>
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
const UpdateTratamiento = ({ closeModal, tratamiento }) => {
  // const { user } = useAuthStore();
  // const medicamento = useGetMedicamentoByID(id_medicamento);
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetCategorias();
  const updateTreat = useUpdateTratamiento();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    // console.log(tratamiento);
    if (tratamiento) {
      setValue("no_tratamiento", tratamiento.no_tratamiento);
      setValue("de_tratamiento", tratamiento.de_tratamiento);
    }
  }, []);

  const handleUpdate = (data) => {
    const request = {
      ...data,
    };

    const params = {
      id_tratamiento: tratamiento.id_tratamiento,
      request: request,
    };
    // console.log(params);
    updateTreat.mutate(params);
  };

  useEffect(() => {
    if (updateTreat.isSuccess) {
      reset();
      closeModal();
    }
  }, [updateTreat.isSuccess]);

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
                  placeholder="Nombre del tratamiento"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                />
              )}
              name="no_tratamiento"
              rules={{ required: true }}
              defaultValue={""}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Descripcion"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  multiline={true}
                />
              )}
              name="de_tratamiento"
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
                        label: fn.de_categoria,
                        value: fn.id_categoria,
                      }))}
                      placeholder={{
                        label: "Seleccione una categoria",
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
                name="id_categoria"
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
                <Text style={{ color: "#fff" }}>Actualizar Tratamiento</Text>
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

const Tratamientos = () => {
  const { user } = useAuthStore();
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetTratamiento();

  const [filteredTreats, setFilteredTreats] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTreat, setSelectedTreat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleSearch = (text) => {
    if (text === "") {
      setFilteredTreats(data);
    } else {
      setFilteredTreats(
        data.filter((treat) =>
          treat.no_tratamiento.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredTreats(data);
  }, [data]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {filteredTreats && (
        <View style={styles.modal}>
          <TextInput
            placeholder="Buscar Tratamiento"
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
              data={filteredTreats}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <TouchableOpacity
                    onPress={() => {
                      // console.log(item);
                      setSelectedTreat(item);
                      setShowModal(true);
                    }}
                  >
                    <View style={styles.terapiaContainer}>

                    {/* {item?.id_categoria?.de_categoria === 'Terapia Quirúrgica' && (
                          <Image source={require('../../../assets/Cirugia.png')} style={styles.terapiaImage} />
                        )}
                        {item?.id_categoria?.de_categoria === 'Terapia Psicológica' && (
                          <Image source={require('../../../assets/Psicologia.png')} style={styles.terapiaImage} />
                        )}
                        {item?.id_categoria?.de_categoria === 'Terapia Alternativa y Complementaria' && (
                          <Image source={require('../../../assets/Alternativa.png')} style={styles.terapiaImage} />
                        )}
                         {item?.id_categoria?.de_categoria === 'Terapia de Rehabilitación' && (
                          <Image source={require('../../../assets/Rehabilitacion.png')} style={styles.terapiaImage} />
                        )}
                         {item?.id_categoria?.de_categoria === 'Definido por el medico' && (
                          <Image source={require('../../../assets/Definido.png')} style={styles.terapiaImage} />
                        )} */}

                      <Text style={styles.dataTitle}>{item?.no_tratamiento} 
                        {"\n"} 
                        <Text style={styles.dataDescription}>{item?.id_categoria?.de_categoria}</Text>

                      </Text>

                    

                      
                    

                    </View>
                   
                  </TouchableOpacity>
                  {item.origen == user.cedula_medico && (
                    <TouchableOpacity
                      style={{ position: "absolute", right: 10, top: 10 }}
                      onPress={() => {
                        // console.log("Update med");
                        setSelectedTreat(item);
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
              keyExtractor={(item) => item.id_tratamiento.toString()}
              ItemSeparatorComponent={() => (
                <View style={{ height: 0.5, width: "100%" }} />
              )}
              ListFooterComponent={() => <View style={{ height: 70 }} />}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
      <Modal visible={showModal} transparent={true} animationType="none">
        <View style={styles.modal_container}>
          <View style={styles.actual_modal}>
            <View style={{ alignItems: "flex-start", width: "90%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  marginBottom: 5,
                }}
              >
                {selectedTreat?.no_tratamiento}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Descripcion: </Text>
                <Text>{selectedTreat?.de_tratamiento} </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Categoria: </Text>
                <Text>{selectedTreat?.id_categoria?.de_categoria}</Text>
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
                setSelectedTreat(null);
              }}
            >
              <Text style={{ color: "#fff" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showCreateModal} transparent={true} animationType="none">
        <CreateTratamiento
          closeModal={() => {
            setShowCreateModal(false);
            // console.log("Close modal");
          }}
        />
      </Modal>

      <Modal visible={showUpdateModal} transparent={true} animationType="none">
        <UpdateTratamiento
          closeModal={() => {
            setShowUpdateModal(false);
            // console.log("Close modal");
          }}
          tratamiento={selectedTreat}
        />
      </Modal>

      <Pressable
        onPress={() => {
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

export default Tratamientos;

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
  
    borderWidth: 1,
    // borderColor: "#A4D4BB",
    borderRadius: 10,
    borderColor: "#D6FFE9",
    backgroundColor: "#D6FFE9",
    elevation: 5,
    height: 100,
    // minHeight: 80,
    margin: 5,
  },
  dataTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },
  dataDescription:{
    fontWeight: "bold",
    fontWeight:"300",
    fontSize: 13,
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
  terapiaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
   height:"100%"

  },
  terapiaImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },

});
