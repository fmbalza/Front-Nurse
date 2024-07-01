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
import AddMedication from "../pages/Medico/PerfilPaciente/AddMedication";
import Consulta from "../pages/Medico/PerfilPaciente/consulta";
import PerfilPaciente from "../pages/Medico/PerfilPaciente/PerfilPaciente";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilPaciente" component={PerfilPaciente} />
      <Stack.Screen name="AddMedication" component={AddMedication} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Menu" id="MedicoTabs">
      <Tab.Screen
        name="Mis Eventos"
        component={Menu}
        options={{
          // headerShown: false,
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

      {/*             
            <Tab.Screen name="MisPacientes" component={MisPacientes}
             options={{
                tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-injury-outline" size={24} color="#00826B" />), 
                tabBarActiveTintColor: '#00826B',
            }}
            /> */}

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
              name="AddMedication"
              component={AddMedication}
              options={{ title: "Finalizar Consulta" }}
            />
            <Stack.Screen
              name="Consulta"
              component={Consulta}
              options={{ title: "Informacion de la Consulta" }}
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
              name="AddMedication"
              component={AddMedication}
              options={{ title: "Finalizar Consulta" }}
            />
            <Stack.Screen
              name="Consulta"
              component={Consulta}
              options={{ title: "Informacion de la Consulta" }}
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
  return (
    // <NavigationContainer independent={true}>
    <MyTabs />
    // </NavigationContainer>
  );
}
