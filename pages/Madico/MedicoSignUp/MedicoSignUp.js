import React,  { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import {SignUpStyles} from '../../../styles/globalStyles'
import { useNavigation } from '@react-navigation/native';
import GenderPicker from '../../../components/GenderPicker';
import SpecialtyPicker from '../../../components/SpecialtyPicker';
import FotoModal from '../../../components/Modals/FotoModal';

const MedicoSignUp = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
  
    const openModal = () => {
      setIsModalVisible(true);
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    const handleImagePicked = (imageUri) => {
      setSelectedImageUri(imageUri);
    };
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
                placeholder="Contraseña"
              
              
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

<TextInput
               style={SignUpStyles.inputs}
               
                placeholderTextColor="#00826B"
                placeholder="Correo"
              
              
            />

            <View style={styles.componentt}>
            <GenderPicker/>
            </View>
             
            <View style={styles.componentt}>
            <SpecialtyPicker/>
            </View>
          
            
            <TouchableOpacity onPress={openModal}
                
                   style={SignUpStyles.btnCert}>
                    <Text
                    style={{
                        color:'white',
                        fontSize:20,
                        fontWeight:'300'
                    }}>
                        Subir Foto de perfil
                    </Text>


                </TouchableOpacity>
                
      {selectedImageUri && (
        <Image source={{ uri: selectedImageUri }} style={{ width: 300, height: 300 }} />
      )}

      <FotoModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onImagePicked={handleImagePicked}
      />

             <TouchableOpacity
                onPress={() => navigation.navigate("HomeMedico")}
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

export default MedicoSignUp