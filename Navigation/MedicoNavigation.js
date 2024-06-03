import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//pages
import Menu from "../pages/Medico/Home/Menu";
import MisPacientes from "../pages/Medico/Home/MisPacientes";
import BuscarPaciente from "../pages/Medico/Home/BuscarPaciente";
import Perfil from "../pages/Medico/Home/Perfil";
import Testing from "../pages/Medico/Home/testing";
import AddMedication from "../pages/Medico/PerfilPaciente/AddMedication";

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
    <Tab.Navigator initialRouteName="Menu">
      <Tab.Screen
        name="Menu"
        component={Menu}
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
              name="StackMisPacientes"
              component={MisPacientes}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="PerfilPaciente" component={PerfilPaciente} />
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
              options={{ headerShown: false }}
            />
            <Stack.Screen name="PerfilPaciente" component={PerfilPaciente} />
            <Stack.Screen name="AddMedication" component={AddMedication} />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Testing"
        component={Testing}
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
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}
