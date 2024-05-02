import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Switch} from 'react-native';
import {SignUpStyles} from '../../../styles/globalStyles'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const PacienteSignUp = () => {
    const navigation = useNavigation();
    const [isFamiliar, setIsFamiliar] = useState(false);

    const handleSwitchToggle = (value) => {
      setIsFamiliar(value);};

    return(
       <ScrollView>
         <LinearGradient
        colors={['#FFFFFF', '#D6FFE9']}
        style={{
           height:930
            }} 
        >
        
        <View   
            style={{
           
            alignItems:"center",
         
            }} 
        >
        <View
         style={{
            justifyContent:"center",
            
            backgroundColor:"#006150",
            width:"100%",
            height:260,
            borderBottomLeftRadius:40,
            borderBottomRightRadius:40,
            elevation:10,
            marginBottom:40
            }} >

                <Text
                     style={{
                        fontSize:45,
                        textAlign: "left",
                        color:'#FFFFFF',
                        fontWeight:'600',
                        marginLeft:30
                    }}>
                    Agregue una foto de perfil
                </Text>
        </View>
     

            <View
               style={{
                
                alignItems:"center",
                width:'100%',
                height:'70%'
                }}
                >

            <View
            style={{
              width:360,
              height:360,
              backgroundColor:'#006150',
              borderRadius:1100,
              alignItems:'center',
              justifyContent:'center'
            }}>

            <View
            style={{
              width:320,
              height:320,
              backgroundColor:'#FFFFFF',
              borderRadius:1100
            }}>
                
            </View>

            </View>
         
            <TouchableOpacity
        
                   style={SignUpStyles.btnCert}>
                    <Text
                    style={{
                        color:'white',
                        fontSize:20,
                        fontWeight:'300'
                    }}>
                        Cargar Foto de Perfil
                    </Text>
                </TouchableOpacity>




          

  
             

             <TouchableOpacity
                onPress={() => navigation.navigate("MedicoValidation")}
                   style={SignUpStyles.btnAceptar}>
                    <Text
                    style={{
                        color:'white',
                        fontSize:25,
                        fontWeight:'300'
                    }}>
                        Aceptar
                    </Text>
                </TouchableOpacity>
            </View>


                
      
               
        </View>
        </LinearGradient>
       </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    componentt:{
        marginTop: 10,  
    },
    input: {
        width: 352,
        height: 64,
        paddingHorizontal: 10,
        marginTop: 10,      
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#A4D4BB",
        borderWidth:3,
        backgroundColor: "#FFFFFF",       
        color:"#00826B",
        fontSize:17
      },
      

  });

export default PacienteSignUp