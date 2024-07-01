import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//pages
import BuscarDoctor from "../pages/Paciente/Home/BuscarDoctor";
import MenuPaciente from "../pages/Paciente/Home/MenuPaciente";
import MisDoctores from "../pages/Paciente/Home/MisDoctores";
import PerfilPaciente from "../pages/Paciente/Home/PerfilPaciente.js";
import WelcomePage from "../pages/WelcomePage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="MenuPaciente" id="PacienteTabs">
      <Tab.Screen
        name="MenuPaciente"
        component={MenuPaciente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
        }}
      />
      <Tab.Screen
        name="MisDoctores"
        component={MisDoctores}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-injury-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
        }}
      />
      <Tab.Screen
        name="BuscarDoctor"
        component={BuscarDoctor}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-search-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilPaciente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
        }}
      />
    </Tab.Navigator>
  );
}

export default function MedicoNavigation() {
  return (
    // <NavigationContainer>
    <MyTabs />
    // </NavigationContainer>
  );
}
