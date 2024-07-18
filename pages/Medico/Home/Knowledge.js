import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Medicamentos from "./Medicamentos.js";
import Tratamientos from "./Tratamientos.js";

const Tab = createMaterialTopTabNavigator();

const Knowledge = () => {
  return (
    // <View>
    <Tab.Navigator>
      <Tab.Screen name="Medicamentos" component={Medicamentos} />
      <Tab.Screen name="Tratamientos" component={Tratamientos} />
    </Tab.Navigator>
    // </View>
  );
};

export default Knowledge;

const styles = StyleSheet.create({});
