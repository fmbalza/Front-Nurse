import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

//pages
import StartPage from '../pages/StartPage'
import MedicoSignUp from '../pages/Madico/MedicoSignUp/MedicoSignUp';
import PacienteSignUp from '../pages/Paciente/PacienteSignUp';
import WelcomePage from '../pages/WelcomePage';
import MedicoFoto from '../pages/Madico/MedicoSignUp/MedicoFoto';
import MedicoValidation from '../pages/Madico/MedicoSignUp/MedicoValidation'


const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//     return (
//         <Tab.Navigator initialRouteName='StartPage'>
//             <Tab.Screen name="StartPage" component={StartPage}/>
//         </Tab.Navigator>
//     );
// }

function MyStack() {
    return (
      <Stack.Navigator initialRouteName='StartPage'>
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown:false}}/>
        <Stack.Screen name="MedicoSignUp" component={MedicoSignUp} options={{headerShown:false}}/>
        <Stack.Screen name="PacienteSignUp" component={PacienteSignUp} options={{headerShown:false}}/>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
        <Stack.Screen name="MedicoFoto" component={MedicoFoto} options={{headerShown:false}}/>
        <Stack.Screen name="MedicoValidation" component={MedicoValidation} options={{headerShown:false}}/>
      </Stack.Navigator>
    );
  }

export default function Navigation() {
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    );
}