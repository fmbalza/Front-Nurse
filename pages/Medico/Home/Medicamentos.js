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
  useDeleteMedicamento,
  useUpdateMedicamento,
} from "../../../utils/hooks/medico/medicamento.js";
import { FlashList } from "@shopify/flash-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Medicamentos = () => {
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetMedicamento();
  const createMed = useCreateMedicamento();
  const deleteMed = useDeleteMedicamento();
  const updateMed = useUpdateMedicamento();
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  //   useEffect(() => {
  //     filteredMeds && console.log(filteredMeds);
  //   }, [filteredMeds]);

  // if (isLoading || isFetching || isPending) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {filteredMeds && (
        <View style={styles.modal}>
          {/* <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Salir</Text>
            </TouchableOpacity>
          </View> */}
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
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <FlashList
              data={filteredMeds}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item);
                      setSelectedMed(item);
                      setShowModal(true);

                      // onChange(item);
                    }}
                  >
                    <Text style={styles.dataTitle}>
                      {item?.cp_medicamento} - {item?.pr_medicamento} (
                      {item?.mg_medicamento} mg)
                    </Text>
                    <Text style={styles.dataText}>
                      {item?.fn_medicamento?.no_funcion}:{" "}
                      {item?.fn_medicamento?.de_funcion}
                    </Text>
                  </TouchableOpacity>
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

      <Pressable
        onPress={() => {
          console.log("Add new med");
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
    minHeight: 80,
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
  },
});
