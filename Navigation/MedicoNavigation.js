import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

//pages
import Menu from '../pages/Madico/Home/Menu';
import MisPacientes from '../pages/Madico/Home/MisPacientes'; 
import BuscarPaciente from '../pages/Madico/Home/BuscarPaciente'; 
import Perfil from '../pages/Madico/Home/Perfil'; 






const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName='Menu'>
            <Tab.Screen name="Menu" component={Menu}/>
            <Tab.Screen name="MisPacientes" component={MisPacientes}/>
            <Tab.Screen name="BuscarPaciente" component={BuscarPaciente}/>
            <Tab.Screen name="Perfil" component={Perfil}/>
        </Tab.Navigator>
    );
}

// function MyStack() {
//     return (
//       <Stack.Navigator initialRouteName='StartPage'>
//         <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown:false }}/>
//         <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false

//         }}/>
//         <Stack.Screen name="PacienteSignUp" component={PacienteSignUp} options={{headerTintColor:'#FFFFFF',  headerBackTitleVisible: false,headerStyle:{backgroundColor:'#006150'} , headerTitleStyle:{display: 'none'}}}/>
//         <Stack.Screen name="MedicoSignUp" component={MedicoSignUp} options={{headerStyle:{backgroundColor:'#006150'} ,headerTintColor:'#FFFFFF',  headerBackTitleVisible: false,  headerTitleStyle:{display: 'none'} , headerTitleStyle:{display: 'none'}}}/>
//         <Stack.Screen name="MedicoFoto" component={MedicoFoto} options={{headerStyle:{backgroundColor:'#006150'} ,headerTintColor:'#FFFFFF',  headerBackTitleVisible: false,  headerTitleStyle:{display: 'none'} , headerTitleStyle:{display: 'none'}}}/>
//       </Stack.Navigator>
//     );
//   }

export default function MedicoNavigation() {
    return(
        <NavigationContainer independent={true}>
            <MyTabs/>
        </NavigationContainer>
    );
}