import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//pages
import Menu from "../pages/Medico/Home/Menu";
import MisPacientes from "../pages/Medico/Home/MisPacientes";
import BuscarPaciente from "../pages/Medico/Home/BuscarPaciente";
import PerfilMedico from "../pages/Medico/Home/PerfilMedico";
import CompleteConsulta from "../pages/Medico/PerfilPaciente/CompleteConsulta";
import PerfilPaciente from "../pages/Medico/PerfilPaciente/PerfilPaciente";
import AssignMedicTreatment from "../pages/Medico/PerfilPaciente/AssignMedicTreatment";
import DetallesConsulta from "../pages/Medico/PerfilPaciente/DetallesConsulta";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Menu" id="MedicoTabs">
      <Tab.Screen
        name="Menu"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
          title: "Mis Eventos",
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="Mis Eventos"
              component={Menu}
              options={{ title: "Mis Eventos" }}
            />
            <Stack.Screen
              name="Consulta"
              component={DetallesConsulta}
              options={{ title: "Informacion de la Consulta" }}
            />
            <Stack.Screen
              name="AssignMedicTreatment"
              component={AssignMedicTreatment}
              options={{ title: "Asignar Tratamiento" }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="TabMisPacientes"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-injury-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
          title: "Mis Pacientes",
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("TabMisPacientes");
          },
        })}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="MisPacientes"
              component={MisPacientes}
              // options={{ headerShown: false }}
              options={{ title: "Mis Pacientes" }}
            />
            <Stack.Screen
              name="PerfilPaciente"
              component={PerfilPaciente}
              options={{ title: "Perfil Paciente" }}
            />
            <Stack.Screen
              name="CompleteConsulta"
              component={CompleteConsulta}
              options={{ title: "Finalizar Consulta" }}
            />
            <Stack.Screen
              name="Consulta"
              component={DetallesConsulta}
              options={{ title: "Informacion de la Consulta" }}
            />
            <Stack.Screen
              name="AssignMedicTreatment"
              component={AssignMedicTreatment}
              options={{ title: "Asignar Tratamiento" }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="TabBuscarPaciente"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-injury-outline"
              size={24}
              color="#00826B"
            />
          ),
          tabBarActiveTintColor: "#00826B",
          title: "Buscar Paciente",
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("TabBuscarPaciente");
          },
        })}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="StackBuscarPaciente"
              component={BuscarPaciente}
              // options={{ headerShown: false }}
              options={{ title: "Buscar Paciente" }}
            />
            <Stack.Screen
              name="PerfilPaciente"
              component={PerfilPaciente}
              options={{ title: "Perfil Paciente" }}
            />
            <Stack.Screen
              name="CompleteConsulta"
              component={CompleteConsulta}
              options={{ title: "Finalizar Consulta" }}
            />
            <Stack.Screen
              name="Consulta"
              component={DetallesConsulta}
              options={{ title: "Informacion de la Consulta" }}
            />
            <Stack.Screen
              name="AssignMedicTreatment"
              component={AssignMedicTreatment}
              options={{ title: "Asignar Tratamiento" }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Perfil"
        component={PerfilMedico}
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
  return <MyTabs />;
}
