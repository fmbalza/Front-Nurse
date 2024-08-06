import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//---------------------------------------------------------------------
// import { FlashList} from "@shopify/flash-list"; // el componente calendario de abajo depende de esta libreria
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import {
  useConsultasDia,
  useDeleteConsulta,
} from "../../../utils/hooks/medico/consultaDia";
import { useNavigation } from "@react-navigation/native";
import useManagedStore from "../../../utils/storage/managed";
import {
  sendPushNotificationV2,
  timedNotificationV1,
} from "../../../utils/notifications/notifications";
import { PrimaryColor } from "../../../styles/globalStyles";

const { width } = Dimensions.get("window");
const estado = ["Omitido", "Completado", "Pendiente"];
const calendarTheme = {
  itemDay: {
    active: ({}) => ({
      container: {
        backgroundColor: "#00826B",
      },
      content: {
        color: "#ffffff",
      },
    }),
  },
};

const Menu = () => {
  const navigation = useNavigation();
  const { setManaged } = useManagedStore();
  const [deletedItem, setDeletedItem] = useState(null);
  const [date, setDate] = useState("12/12/2023");
  const today = toDateId(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(
    toDateId(new Date())
  );
  const { isFetching, isPending, isError, data, error } = useConsultasDia();
  const deleteConsultaMutation = useDeleteConsulta();

  const handleNotifications = async (data) => {
    const now = new Date();
    // now.setHours(0, 0, 0, 0);

    const pendingConsultas = data.filter((item) => {
      // console.log(
      //   "Item: ",
      //   item.estado === 2 && new Date(item.fecha) > new Date()
      // );
      return item.estado === 2 && new Date(item.fecha) > now;
    });

    pendingConsultas.forEach((item) => {
      timedNotificationV1(item.fecha);
    });
  };

  useEffect(() => {
    if (
      deleteConsultaMutation.isSuccess &&
      deletedItem &&
      deleteConsultaMutation.data === "Consulta eliminada exitosamente"
    ) {
      console.log("Consulta eliminada: ", deletedItem);
      sendPushNotificationV2(
        deletedItem?.cd_paciente?.push_token,
        deletedItem?.id_consulta,
        new Date(deletedItem.fecha).toLocaleDateString(),
        new Date(deletedItem.fecha).toLocaleTimeString()
      );
    }
  }, [deleteConsultaMutation.isSuccess]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      handleNotifications(data);
    }
  }, [data, deleteConsultaMutation.isSuccess]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  const handlePreviousMonth = useCallback(() => {
    setCurrentCalendarMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() - 1);
      return toDateId(date);
    });
  }, [currentCalendarMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentCalendarMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + 1);
      return toDateId(date);
    });
  }, [currentCalendarMonth]);

  if (isPending || isError) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00826B" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* <View style={styles.header}>
              <Text style={styles.title}>Mis Eventos</Text>
            </View> */}
          <View style={styles.pickerContainer}>
            <Pressable style={styles.prevButton} onPress={handlePreviousMonth}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={29}
                color="#00826B"
              />
            </Pressable>
            <View style={styles.calendarContainer}>
              <Calendar
                calendarActiveDateRanges={[
                  { startId: selectedDate, endId: selectedDate },
                ]}
                calendarMonthId={currentCalendarMonth}
                onCalendarDayPress={setSelectedDate}
                calendarFormatLocale="es"
                theme={calendarTheme}
              />
            </View>
            <Pressable style={styles.nextButton} onPress={handleNextMonth}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={29}
                color="#00826B"
              />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 220,
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 24,
            }}
          >
            {selectedDate && (
              <Text style={styles.subtitle}>{selectedDate}</Text>
            )}
            <View style={styles.placeholder}>
              <View style={styles.placeholderInset}>
                <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ flexGrow: 1, padding: 16 }}
                >
                  {typeof data === "string" ? (
                    <View style={styles.noEventsContainer}>
                      <Text style={styles.noEventsText}>No hay eventos</Text>
                    </View>
                  ) : (
                    <>
                      {data
                        .filter((item) => {
                          // console.log("Item: ", new Date(item.fecha).getDate());
                          // console.log(
                          //   "Selected date: ",
                          //   new Date(selectedDate).getUTCDate()
                          // );
                          const itemDate = new Date(item.fecha);
                          const selected = new Date(selectedDate);
                          return (
                            itemDate.getDate() === selected.getUTCDate() &&
                            itemDate.getMonth() === selected.getUTCMonth() &&
                            itemDate.getFullYear() === selected.getUTCFullYear()
                          );
                        })
                        .map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.eventContainer}
                            onPress={() => {
                              // console.log(
                              //   "Aqui en Menu.js: ",
                              //   item?.id_consulta,
                              //   item?.fecha,
                              //   item?.estado,
                              //   item?.de_consulta,
                              //   item?.cd_paciente
                              // );
                              if (item.estado !== 2) {
                                setManaged(item?.cd_paciente);
                                navigation.navigate("Consulta", {
                                  id_consulta: item.id_consulta,
                                  paciente: item.cd_paciente,
                                });
                              }
                            }}
                          >
                            <View>
                              <Text style={styles.eventTitle}>
                                Consulta {index + 1} -{" "}
                                {item?.cd_paciente?.cedula_paciente}
                              </Text>
                              <Text key={index}>
                                {" "}
                                {new Date(item.fecha).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                 - {estado[item.estado]}
                              </Text>
                            </View>
                            {item.estado === 2 ? (
                              <Pressable
                                style={styles.deleteButton}
                                onPress={() => {
                                  // console.log("Aqui en Menu.js ", item);
                                  setDeletedItem(item);
                                  deleteConsultaMutation.mutate(
                                    item.id_consulta
                                  );
                                }}
                              >
                                <MaterialCommunityIcons
                                  name="trash-can-outline"
                                  size={24}
                                  color="#00826B"
                                />
                              </Pressable>
                            ) : null}
                          </TouchableOpacity>
                        ))}
                    </>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  deleteButton: {
    justifyContent: "flex-end",
    marginLeft: 8,
    padding: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  noEventsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  noEventsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    // marginTop: "10%",
    flex: 1,
    paddingVertical: 24,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 200,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  pickerContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: 16,
  },
  calendarContainer: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
  },
  prevButton: {
    borderRadius: 20,
    right: -40,
    top: -15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 9,
  },
  nextButton: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    left: -40,
    top: -15,
    zIndex: 9,
  },
});
export default Menu;
