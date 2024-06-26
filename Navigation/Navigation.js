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
import HomeMedico from '../pages/Madico/Home/HomeMedico'
import PacienteLogin from '../pages/Paciente/PacienteLogin';
import MedicoLogin from '../pages/Madico/MedicoLogIn';
import HomePaciente from '../pages/Paciente/Home/HomePaciente'


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
        <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown:false }}/>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
        <Stack.Screen name="PacienteLogin" component={PacienteLogin} options={{headerShown:false}}/>
        <Stack.Screen name="MedicoLogin" component={MedicoLogin} options={{headerShown:false}}/>
        <Stack.Screen name="PacienteSignUp" component={PacienteSignUp} options={{headerTintColor:'#FFFFFF',  headerBackTitleVisible: false,headerStyle:{backgroundColor:'#006150'} , headerTitleStyle:{display: 'none'}}}/>
        <Stack.Screen name="MedicoSignUp" component={MedicoSignUp} options={{headerStyle:{backgroundColor:'#006150'} ,headerTintColor:'#FFFFFF',  headerBackTitleVisible: false,  headerTitleStyle:{display: 'none'} , headerTitleStyle:{display: 'none'}}}/>
        <Stack.Screen name="MedicoFoto" component={MedicoFoto} options={{headerStyle:{backgroundColor:'#006150'} ,headerTintColor:'#FFFFFF',  headerBackTitleVisible: false,  headerTitleStyle:{display: 'none'} , headerTitleStyle:{display: 'none'}}}/>
        <Stack.Screen name="HomeMedico" component={HomeMedico} options={{headerShown:false}}/>
        <Stack.Screen name="HomePaciente" component={HomePaciente} options={{headerShown:false}}/>
      </Stack.Navigator>
    );
  }

export default function Navigation() {
    return(
        <NavigationContainer independent={true}>
            <MyStack/>
        </NavigationContainer>
    );
}