import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Switch} from 'react-native';
import {SignUpStyles} from '../../styles/globalStyles'
import { useState } from 'react';
import DatePicker from '../../components/DatePicker';
import GenderPicker from '../../components/GenderPicker';
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
           height:1300
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
            height:300,
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
                        fontWeight:'700',
                        marginLeft:30
                    }}>
                    Ingrese los siguientes datos
                </Text>
        </View>
     

            <View
               style={{
                
                alignItems:"center",
                width:'100%',
                height:'70%'
                }}
                >
            <TextInput
                style={SignUpStyles.inputs}
               
                placeholderTextColor="#00826B"
                placeholder="Nombre"
              
            />

<TextInput
                style={SignUpStyles.inputs}
               
                placeholderTextColor="#00826B"
                placeholder="Apellido"
              
            />

<TextInput
               style={SignUpStyles.inputs}
               
                placeholderTextColor="#00826B"
                placeholder="Cedula"
                keyboardType="numeric"
              
            />

<TextInput
               style={SignUpStyles.inputs}
               
                placeholderTextColor="#00826B"
                placeholder="Telefono"
                keyboardType="numeric"
              
            />

            <View style={styles.componentt}>
            <GenderPicker/>
            </View>
             
            <View style={styles.componentt}>
            <DatePicker/>
            </View>

          

            <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    marginBottom: 15,
  }}>
      <Text style={{fontSize:20, color:'#00826B'}}>Familiar</Text>
      <Switch
        value={isFamiliar}
        onValueChange={handleSwitchToggle}
        trackColor={{ false: '#767577', true: '#A4D4BB' }}
        thumbColor={isFamiliar ? '#00826B' : '#A4D4BB'}
        ios_backgroundColor="#3e3e3e"
        style={styles.switch}
      />
    </View>

    <Text style={{ marginLeft:20,marginRight:20,fontSize:15, color:'#00826B'}}>Activar la funcionalidad de "Familiar" te permitiria poder acceder a los registros de tratamientos en uso de los usuarios que te lo permitan. En caso de tener un miembro mayor de tu familia en la aplicacion Nurse, te permitira ver su tratamiento en tiempo real, y hacerle seguimiento </Text>
          
             

             <TouchableOpacity
                onPress={() => navigation.navigate("WelcomePage")}
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