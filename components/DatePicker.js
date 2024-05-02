import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal} from 'react-native';
import { useState } from 'react';
import  RNDateTimePicker  from '@react-native-community/datetimepicker';


const DatePicker = () => {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowPicker(false);
      setDate(currentDate);
    };
    
    
    const showDatePicker = () => {
      setShowPicker(true);
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={showDatePicker}
            style={{ width:"100%"}}>
            {showPicker && (
                <RNDateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
                textColor="red"
                />
            )}
                <TextInput
                    style={styles.input}
                    value={date.toLocaleDateString()} // Muestra la fecha en el campo de entrada
                    editable={false} // Deshabilita la edición directa del campo de entrada
                />
            </TouchableOpacity>
        </View> 
    )

}

const styles = StyleSheet.create({
    container: {
      
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      marginTop:10,
        width: 354,
        height: 64,
        paddingHorizontal: 10,      
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#A4D4BB",
        borderWidth:3,
        backgroundColor: "#FFFFFF",       
        color:"#00826B",
        fontSize:17
      },
      

  });

export default DatePicker


