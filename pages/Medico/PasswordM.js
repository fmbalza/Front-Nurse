import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function PasswordM() {
  return (
    <View>
      <Text>PasswordM</Text>
    </View>
  );
}

// const PasswordM = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleForgotPassword = () => {
//     // Aquí puedes agregar la lógica para enviar un correo electrónico de restablecimiento de contraseña
//     setMessage('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
//       <Text style={styles.subtitle}>Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Correo electrónico"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
//         <Text style={styles.buttonText}>Restablecer contraseña</Text>
//       </TouchableOpacity>
//       {message !== '' && (
//         <Text style={styles.message}>{message}</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   message: {
//     marginTop: 20,
//     color: '#007AFF',
//   },
// });

// export default PasswordM;
