import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//pages
import Menu from '../pages/Madico/Home/Menu';
import MisPacientes from '../pages/Madico/Home/MisPacientes'; 
import BuscarPaciente from '../pages/Madico/Home/BuscarPaciente'; 
import Perfil from '../pages/Madico/Home/Perfil';
import Testing from '../pages/Madico/Home/testing' 



import PerfilPaciente from '../pages/Madico/PerfilPaciente/PerfilPaciente';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilPaciente" component={PerfilPaciente} />
    </Stack.Navigator>
  );
};


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName='Menu'>
            <Tab.Screen name="Menu" component={Menu} 
            options={{
                tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home-outline" size={24} color="#00826B" />), 
                tabBarActiveTintColor: '#00826B',
            }}/>

{/*             
            <Tab.Screen name="MisPacientes" component={MisPacientes}
             options={{
                tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-injury-outline" size={24} color="#00826B" />), 
                tabBarActiveTintColor: '#00826B',
            }}
            /> */}

            <Tab.Screen
                    name="MisPacientes"
                    options={{ headerShown:false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-injury-outline" size={24} color="#00826B" />
                    ),
                    tabBarActiveTintColor: '#00826B',
                    }}

                    listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate('MisPacientes');
                    },
                    })}
                >
                    {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="MisPacientes" component={MisPacientes} options={{ headerShown:false }}/>
                        <Stack.Screen name="PerfilPaciente" component={PerfilPaciente} />
                    </Stack.Navigator>
                    )}
        </Tab.Screen>




        <Tab.Screen
                    name="BuscarPaciente"
                    options={{ headerShown:false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-injury-outline" size={24} color="#00826B" />
                    ),
                    tabBarActiveTintColor: '#00826B',
                    }}

                    listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate('BuscarPaciente');
                    },
                    })}
                >
                    {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="BuscarPaciente" component={BuscarPaciente} options={{ headerShown:false }}/>
                        <Stack.Screen name="PerfilPaciente" component={PerfilPaciente} />
                    </Stack.Navigator>
                    )}
        </Tab.Screen>


         
            <Tab.Screen name="Testing" component={Testing

            }
             options={{
                tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-outline" size={24} color="#00826B" />), 
                tabBarActiveTintColor: '#00826B',
            }}
            />
               
        </Tab.Navigator>
    );
}


export default function MedicoNavigation() {
    return(
        <NavigationContainer independent={true}>
            <MyTabs/>
        </NavigationContainer>
    );
}