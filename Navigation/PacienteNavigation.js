import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//pages
import BuscarDoctor from "../pages/Paciente/Home/BuscarDoctor";
import MenuPaciente from "../pages/Paciente/Home/MenuPaciente";
import MisDoctores from "../pages/Paciente/Home/MisDoctores";
import PerfilPaciente from "../pages/Paciente/Home/PerfilPaciente.js";
import DetallesConsulta from "../pages/Medico/PerfilPaciente/DetallesConsulta.js";
// import WelcomePage from "../pages/WelcomePage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="MenuPaciente" id="PacienteTabs">
      <Tab.Screen
        name="MenuPaciente"
        // component={MenuPaciente}
        options={{
          title: "Mis Eventos",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="Mis Eventos"
              component={MenuPaciente}
              options={{ title: "Mis Eventos" }}
            />
            <Stack.Screen
              name="Consulta"
              component={DetallesConsulta}
              options={{ title: "Informacion de la Consulta" }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="MisDoctores"
        component={MisDoctores}
        l
        options={{
          title: "Mis Doctores",
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
          title: "Buscar Doctor",
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
