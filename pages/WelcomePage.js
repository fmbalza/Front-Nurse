import * as React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StartPage = () => {
    const navigation = useNavigation();
    return(
            

        <LinearGradient
        colors={['#FFFFFF', '#D6FFE9']}
        style={{
           height:900
            }} 
        >
        
        <View   
            style={{
            justifyContent:"center",
       
            marginTop:50,
            marginLeft:10
            }} 
        >
            <Text
                style={{
                    fontSize:52,
                    textAlign: "left",
                    
                    color:'#00826B',
                    fontWeight:'700'
                }}>
                Bienvenido a Nurse
            </Text>

            <Text
                style={{
                    fontSize:32,
                    textAlign: "left",
                    
                    color:'#00826B',
                    fontWeight:'800'
                }}>
                Cuentanos de ti
            </Text>

                <TouchableOpacity
                onPress={() => navigation.navigate("MedicoLogin")}
                   style={{
                    width:"90%",
                    marginTop:120,
                    height:"17%",
                    borderRadius:70,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:'#00826B',
                    elevation: 5,
                    marginLeft:15
                    
                }}>
                    <Text
                    style={{
                        color:'white',
                        fontSize:30,
                        fontWeight:'300'
                    }}>
                        Medico
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => navigation.navigate("PacienteLogin")}
                   style={{
                    width:"90%",
                    marginTop:40,
                    height:"17%",
                    borderRadius:70,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:'#00826B',
                    elevation: 5,
                    marginLeft:15
                    
                }}>
                    <Text
                    style={{
                        color:'white',
                        fontSize:30,
                        fontWeight:'300'
                    }}>
                        Paciente
                    </Text>
                </TouchableOpacity>
      
               
               
           

               

                

        </View>
        </LinearGradient>
    );

}

export default StartPage