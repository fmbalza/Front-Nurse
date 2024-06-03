import React, {useState}from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import BtnAgregar from '../../../components/BtnAgregar';
import AgendarModal from '../../../components/Modals/AgendarModal';
import { useNavigation } from '@react-navigation/native';
import { useGetPaciente, useGetPacienteConsulta } from '../../../utils/hooks/medico/paciente';
import AgregarTratModal from '../../../components/Modals/AgregarTratModal';

  const PerfilPaciente = ({ route }) => {
  const { cedula } = route.params
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const { isPending, isError, data, error } = useGetPaciente();
  const pacienteConsultaQuery = useGetPacienteConsulta(cedula);


  const toggleModal = () => {
    setModal(!modal);
  };
  



  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveEvent = (date, time) => {
    setEventDate(date);
    setEventTime(time);
  };

  if (isError) {
    return <Text>Error:{error.message}</Text>;
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }




  const pacientes = data.filter(paciente => paciente.cedula_paciente === cedula).map(paciente => ({
    cedula: paciente.cedula_paciente,
    nombre: `${paciente.no_paciente} ${paciente.ap_paciente}`,
    telefono: paciente.telefono,
    genero: paciente.genero,
    familiar: paciente.familiar,
    fechaNacimiento: paciente.fecha_nacimiento
  }));

 
  if (pacienteConsultaQuery.isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (pacienteConsultaQuery.isError) {

    return <Text>Error:{error.message}</Text>;
  }


  console.log("Tipo de variable: ", typeof pacienteConsultaQuery.data )
    
  const consultas = typeof pacienteConsultaQuery.data === 'string'
  ? pacienteConsultaQuery.data
  : pacienteConsultaQuery.data.map(consulta => ({
      nombrePaciente: ` ${consulta.cd_paciente.no_paciente} ${consulta.cd_paciente.ap_paciente}`,
      nombreMedico: ` ${consulta.cd_medico.no_medico} ${consulta.cd_medico.ap_medico}`,
      fecha: consulta.fecha,
      estado: consulta.estado,
      descripcion: consulta.de_consulta
    }));

    console.log(consultas)
  


  


   
 


  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
      <View style={styles.detailsContainer}>

      <View style={styles.photo}></View>
      {pacientes.map((paciente, index) => (
        <View key={index} style={styles.pacienteContainer}>
          <Text style={styles.label}>Cédula: {paciente.cedula}</Text>
         
          <Text style={styles.label}>Nombre: {paciente.nombre}</Text>
         
          <Text style={styles.label}>Teléfono: {paciente.telefono}</Text>
         
          <Text style={styles.label}>Género: {paciente.genero}</Text>
         
          <Text style={styles.label}>Familiar: {paciente.familiar}</Text>
         
          <Text style={styles.label}>Fecha de Nacimiento: {paciente.fechaNacimiento}</Text>
        
        </View>
      ))}

      
          
          <View style={{ alignItems:'flex-end', top:10, zIndex:9}}>
          <BtnAgregar/>
          </View>
      </View>
      </View>
    <ScrollView verical
    style={{height:1000}}>
      <View style={styles.cardsContainer}>
      <View>
        {typeof consultas === 'string' || consultas.every(consulta => consulta.estado !== 1) ? <Text></Text> :<Text>Consultas Pendientes: </Text>}
      

         {typeof consultas === 'string' || consultas.every(consulta => consulta.estado !== 1)
              ? <Text></Text>
              : consultas.filter(consulta => consulta.estado === 1).map((consulta, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={toggleModal}>
                  <Text style={styles.cardTitle}>    Consulta{index + 1}: </Text>
                  <Text style={styles.label}>    Paciente: {consulta.nombrePaciente}</Text>
                  <Text style={styles.label}>    Medico: {consulta.nombreMedico}</Text>
                  <Text style={styles.label}>    Fecha: {consulta.fecha}</Text>
                  <Text style={styles.label}>    Estado: {consulta.estado}</Text>
                  <Text style={styles.label}>    Descripcion: {consulta.descripcion}</Text>

                  <AgregarTratModal visible={modal} onClose={toggleModal} />
                </TouchableOpacity>
              ))}
      
    </View>
<View style={{marginTop:10}}>
      <Text>Consultas: </Text>
      {typeof consultas === 'string'
              ? <Text>No hay consultas</Text>
              : consultas.filter(consulta => consulta.estado === 2).map((consulta, index) => (
                <TouchableOpacity key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>    Consulta{index + 1}{(index + 1) === 1 ? " (De primera)" : ""}: </Text>
                  <Text style={styles.label}>    Paciente: {consulta.nombrePaciente}</Text>
                  <Text style={styles.label}>    Medico: {consulta.nombreMedico}</Text>
                  <Text style={styles.label}>    Fecha: {consulta.fecha}</Text>
                  <Text style={styles.label}>    Estado: {consulta.estado}</Text>
                  <Text style={styles.label}>    Descripcion: {consulta.descripcion}</Text>
                </TouchableOpacity>
              ))}
      </View>
        </View>

    </ScrollView>
    <TouchableOpacity style={styles.agendar}  onPress={handleOpenModal}>
    <AgendarModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
      />
      {eventDate && eventTime && (
        <View>
          <Text>Event Date: {eventDate}</Text>
          <Text>Event Time: {eventTime}</Text>
        </View>
      )}
      <Text style={{color:'#FFFFFF'}}>
        Agendar Consulta
      </Text>
    </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#00826B',
  },
  detailsContainer: {
    marginLeft: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00826B',
  },
  cedula: {
    fontSize: 14,
  },
  cardsContainer: {
    flexDirection: 'column',
    marginTop:20,
    height:1000
  },
  card: {
    width: 350,
    height: 150,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'left',
    marginTop: 10
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  agendar:{
    width: 100,
    height: 50,
    backgroundColor: '#00826B',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:250

  }
});

export default PerfilPaciente;