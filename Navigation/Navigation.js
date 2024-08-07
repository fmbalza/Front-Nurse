import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//pages
import StartPage from "../pages/StartPage";
import MedicoSignUp from "../pages/Medico/MedicoSignUp";
import PacienteSignUp from "../pages/Paciente/PacienteSignUp";
import WelcomePage from "../pages/WelcomePage";
import HomeMedico from "../pages/Medico/Home/HomeMedico";
import PacienteLogin from "../pages/Paciente/PacienteLogin";
import MedicoLogin from "../pages/Medico/MedicoLogIn";
import HomePaciente from "../pages/Paciente/Home/HomePaciente";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="StartPage" id="MainStack">
      <Stack.Screen
        name="StartPage"
        component={StartPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{
          headerTintColor: "#006150",
          headerBackTitleVisible: false,
          headerTitleStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="PacienteLogin"
        component={PacienteLogin}
        options={{
          headerTintColor: "#006150",
          headerBackTitleVisible: false,
          headerTitleStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="MedicoLogin"
        component={MedicoLogin}
        options={{
          headerTintColor: "#006150",
          headerBackTitleVisible: false,
          headerTitleStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="PacienteSignUp"
        component={PacienteSignUp}
        options={{
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#006150" },
          headerTitleStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="MedicoSignUp"
        component={MedicoSignUp}
        options={{
          headerStyle: { backgroundColor: "#006150" },
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false,
          headerTitleStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="HomeMedico"
        component={HomeMedico}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomePaciente"
        component={HomePaciente}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
