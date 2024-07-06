import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useGetMedicamento } from "../../utils/hooks/medico/medicamento";
import { FlashList } from "@shopify/flash-list";

export default function PickMedicamento({ onChange, onClose }) {
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetMedicamento();
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);

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

  if (isLoading || isFetching || isPending) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
            style={styles.input}
          />

          <FlashList
            data={filteredMeds}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMed(item);
                    onChange(item);
                  }}
                >
                  <Text style={styles.dataTitle}>
                    {item?.cp_medicamento} - {item?.pr_medicamento} (
                    {item?.mg_medicamento})
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
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },
  listItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#A4D4BB",
    borderRadius: 10,
    backgroundColor: "#A4D4BB",
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
