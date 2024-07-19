import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useGetTratamiento } from "../../utils/hooks/medico/tratamiento";
import { FlashList } from "@shopify/flash-list";

export default function PickTratamiento({ onChange, onClose }) {
  const { data, error, isError, isFetching, isLoading, isPending, isSuccess } =
    useGetTratamiento();
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const handleSearch = (text) => {
    if (text === "") {
      setFilteredTreatments(data);
    } else {
      setFilteredTreatments(
        data.filter((trt) =>
          trt.no_tratamiento.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredTreatments(data);
  }, [data]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {filteredTreatments && (
        <View style={styles.modal}>
          <TextInput
            placeholder="Buscar Tratamiento"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={styles.input}
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
              data={filteredTreatments}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTreatment(item);
                      onChange(item);
                    }}
                  >
                    <Text style={styles.dataText}>
                      {item?.no_tratamiento}: {item?.de_tratamiento}
                    </Text>
                    <Text style={styles.dataTitle}>
                      {item?.id_categoria?.de_categoria}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              estimatedItemSize={200}
              keyExtractor={(item) => item.id_tratamiento.toString()}
            />
          )}
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
