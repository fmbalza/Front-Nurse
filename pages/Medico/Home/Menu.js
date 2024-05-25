import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
//---------------------------------------------------------------------
// import { FlashList} from "@shopify/flash-list"; //el componente calendario de abajo depende de esta libreria
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";

const { width } = Dimensions.get("window");

export default function Example() {
  const [date, setDate] = useState("12/12/2023");
  const today = toDateId(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(
    toDateId(new Date())
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  const handlePreviousMonth = useCallback(() => {
    // console.log(currentCalendarMonth);

    setCurrentCalendarMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() - 1);
      return toDateId(date);
    });
  }, [currentCalendarMonth]);

  const handleNextMonth = useCallback(() => {
    // console.log(currentCalendarMonth);

    setCurrentCalendarMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + 1);
      return toDateId(date);
    });
  }, [currentCalendarMonth]);

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Mis Consultas</Text>
          </View>
          <Button title="previous" onPress={handlePreviousMonth} />
          <Button title="next" onPress={handleNextMonth} />
          <View style={styles.picker}>
            <Calendar
              calendarActiveDateRanges={[
                { startId: selectedDate, endId: selectedDate },
              ]}
              calendarMonthId={currentCalendarMonth}
              onCalendarDayPress={setSelectedDate}
              calendarFormatLocale="es"
            />
          </View>

          <View
            style={{
              marginTop: 150,
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 24,
            }}
          >
            {selectedDate && <Text style={styles.subtitle}>{date}</Text>}
            <View style={styles.placeholder}>
              <View style={styles.placeholderInset}>
                {[1, 2, 3].map((index) => (
                  <TouchableOpacity key={index} style={styles.eventContainer}>
                    <Text style={styles.eventTitle}>Consulta {index}</Text>
                    <Text style={styles.eventTime}>{index}:00 AM</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 150,
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
    borderStyle: "dashed",
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
});
