import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  // TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  // Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//---------------------------------------------------------------------
// import { FlashList} from "@shopify/flash-list"; //el componente calendario de abajo depende de esta libreria
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { useConsultasDia, useDeleteConsulta } from "../../../utils/hooks/medico/consultaDia";

const { width } = Dimensions.get("window");

const Menu = () => {
  const [date, setDate] = useState("12/12/2023");
  const today = toDateId(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(
    toDateId(new Date())
  );

  // useEffect(() => {
  //   console.log("Selected date: ", selectedDate);
  // }, [selectedDate]);

  const { isPending, isError, data, error } = useConsultasDia();
  const deleteConsultaMutation = useDeleteConsulta();

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

  if (isError) {
    return <Text>Error:{error.message}</Text>;
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // if (Array.isArray(data) && data.length > 0) {
  //   // console.log(data);
  //   const fechas = data.map((consulta) => consulta.fecha);
  // }

  return (
    <>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Mis Eventos</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Pressable
                style={styles.prevButton}
                onPress={handlePreviousMonth}
              >
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
                  {typeof data === "string" ? (
                    <View style={styles.noEventsContainer}>
                      <Text style={styles.noEventsText}>{data}</Text>
                    </View>
                  ) : (
                    <>
                      {data
                        .filter((item) => {
                          const itemDate = new Date(item.fecha);
                          const selected = new Date(selectedDate);
                          return (
                            itemDate.getUTCDate() === selected.getUTCDate() &&
                            itemDate.getUTCMonth() === selected.getUTCMonth() &&
                            itemDate.getUTCFullYear() ===
                              selected.getUTCFullYear()
                          );
                        })
                        .map((item, index) => (
                         <TouchableOpacity
                          key={index}
                          style={styles.eventContainer}
                        >
                          <View style={styles.eventContent}>
                            <Text style={styles.eventTitle}>
                              Consulta {index + 1}
                            </Text>
                            <Text key={index}>
                              {" "}
                              {new Date(item.fecha).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Text>
                          </View>
                          <Pressable
                            style={styles.deleteButton}
                            onPress={() => {
                              console.log(item)
                              deleteConsultaMutation.mutate(item.id_consulta);
                            }}
                          >
                            <MaterialCommunityIcons
                              name="trash-can-outline"
                              size={24}
                              color="#00826B"
                            />
                          </Pressable>
                        </TouchableOpacity>
                        ))}
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
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
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "auto",
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
    marginTop: "10%",
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 80,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    height: 1000,
  },
  itemWeekday: {
    fontSize: 10,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
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
  /** Button */
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
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
