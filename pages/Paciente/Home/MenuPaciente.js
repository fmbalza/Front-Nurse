import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useGetConsultasById } from "../../../utils/hooks/paciente/consultas";
import moment from "moment";
import "moment/locale/es";
import Swiper from "react-native-swiper";
import {
  timedNotificationV1,
  timedNotificationV2,
} from "../../../utils/notifications/notifications";
import {
  useGetRecordatoriosByPaciente,
  useSetReminderAsDone,
  useSetReminderAsSkipped,
} from "../../../utils/hooks/paciente/horarios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

const estado = ["Omitido", "Completado", "Pendiente"];
const { width } = Dimensions.get("window");

const MenuPaciente = () => {
  const navigation = useNavigation();
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false);

  const { isPending, isError, data, error } = useGetConsultasById();
  const recordatorios = useGetRecordatoriosByPaciente();
  const setReminderAsDone = useSetReminderAsDone();
  const setReminderAsSkipped = useSetReminderAsSkipped();
  moment.locale("es");

  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");
    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");
        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const handleConsultas = async (data) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const pendingConsultas = data.filter((item) => {
      // console.log(
      //   "Item: ",
      //   item.estado === 2 && new Date(item.fecha) > new Date()
      // );
      return item.estado === 2 && new Date(item.fecha) > new Date();
    });

    pendingConsultas.forEach((item) => {
      timedNotificationV1(item.fecha, item.id_consulta);
    });
  };

  const handleRecordatorios = async (data) => {
    // await Notifications.cancelAllScheduledNotificationsAsync();

    const pendingRecordatorios = recordatorios.data.filter((item) => {
      return item.estado === 2 && new Date(item.fecha) > new Date();
    });

    // console.log(pendingRecordatorios.length);

    pendingRecordatorios.forEach((item) => {
      timedNotificationV2(item.fecha, item);
    });
  };

  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      handleConsultas(data);
    } else {
      cancelAllNotifications();
    }
  }, [data]);

  useEffect(() => {
    if (Array.isArray(recordatorios.data) && recordatorios.data.length > 0) {
      handleRecordatorios(recordatorios.data);
    }
  }, [recordatorios.data]);

  if (isPending || isError) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00826B" />
      </View>
    );
  }

  // if (Array.isArray(data) && data.length > 0) {
  //   const fechas = data.map((consulta) => consulta.fecha);
  // }

  // useEffect(() => {
  //   console.log(recordatorios.data);
  // }, [recordatorios.data]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}></View>
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={(ind) => {
              if (ind === 1 || isManualChange) {
                setIsManualChange(false);
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, "week").toDate());
                setIsManualChange(true);
                swiper.current.scrollTo(1, false);
              }, 100);
            }}
          >
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: "#111",
                            borderColor: "#111",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>{value.toLocaleDateString()}</Text>
          <View style={styles.placeholder}>
            <View style={styles.placeholderInset}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {typeof data === "string" || !Array.isArray(data) ? (
                  <View style={styles.noEventsContainer}>
                    <Text style={styles.noEventsText}>{data}</Text>
                  </View>
                ) : (
                  <>
                    {data
                      .filter((item) => {
                        const itemDate = new Date(item.fecha);
                        const selected = new Date(value);
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
                            if (item.estado !== 2) {
                              // console.log(item);
                              navigation.navigate("Consulta", {
                                id_consulta: item.id_consulta,
                                paciente: item.cd_paciente,
                              });
                            }
                          }}
                        >
                          <View>
                            <Text style={styles.eventTitle}>
                              Consulta {index + 1} - {estado[item.estado]}
                            </Text>
                            <Text>
                              Medico: {item.cd_medico.no_medico} 
                              {item.cd_medico.ap_medico}
                            </Text>
                            <Text>Descripcion: {item.de_consulta}</Text>
                            <Text>
                              Fecha: {new Date(item.fecha).toLocaleString()}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </>
                )}
                {typeof recordatorios.data === "string" ||
                !Array.isArray(recordatorios.data) ? (
                  <View style={styles.noEventsContainer}>
                    <Text style={styles.noEventsText}>
                      {recordatorios.data}
                    </Text>
                  </View>
                ) : (
                  <>
                    {recordatorios.data
                      .filter((item) => {
                        const itemDate = new Date(item.fecha);
                        const selected = new Date(value);
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
                            console.log(item);
                          }}
                        >
                          <View>
                            <Text style={styles.eventTitle}>
                              {item.id_horario?.id_medicamento
                                ?.cp_medicamento ||
                                item.id_horario?.id_tratamiento
                                  ?.no_tratamiento}{" "}
                              - {estado[item.estado]}
                            </Text>
                            <Text>
                              Fecha: {new Date(item.fecha).toLocaleString()}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row", gap: 20 }}>
                            <TouchableOpacity
                              style={{
                                justifyContent: "flex-end",
                              }}
                              onPress={() => {
                                // console.log("done");
                                setReminderAsDone.mutate(item.id_recordatorio);
                              }}
                            >
                              {/* <Text style={styles.btnText}>Completar</Text> */}
                              <MaterialCommunityIcons
                                name="check"
                                size={24}
                                color="black"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                justifyContent: "flex-end",
                              }}
                              onPress={() => {
                                // console.log("skip");
                                setReminderAsSkipped.mutate(
                                  item.id_recordatorio
                                );
                              }}
                            >
                              {/* <Text style={styles.btnText}>Omitir</Text> */}
                              <MaterialCommunityIcons
                                name="skip-next"
                                size={24}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  item: {
    flex: 1,
    height: 50,
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
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 10,
    fontWeight: "500",
    color: "#737373",
  },
  itemDate: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
  },
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
    borderStyle: "dashed",
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
  eventContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default MenuPaciente;
