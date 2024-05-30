import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View, Button } from 'react-native';

const BtnAgregar = () => {
  const [followStatus, setFollowStatus] = useState('Agregar');
  const [showModal, setShowModal] = useState(false);

  const handleFollow = () => {
    if (followStatus === 'Remover') {
      setShowModal(true);
    } else {
      setFollowStatus(followStatus === 'Agregar' ? 'Pendiente' : 'Remover');
    }
  };

  const handleRemove = () => {
    setFollowStatus('Agregar');
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          followStatus === 'Remover' ? styles.removeButton : followStatus === 'Pendiente' ? styles.pendingButton : styles.addButton,
        ]}
        onPress={handleFollow}
      >
        <Text
          style={[
            styles.buttonText,
            followStatus === 'Remover' ? styles.removeText : followStatus === 'Pendiente' ? styles.pendingText : styles.addText,
          ]}
        >
          {followStatus}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Está seguro de que quiere remover?</Text>
            <View style={styles.modalButtonContainer}>
              <Button title="Confirmar" onPress={handleRemove} />
              <Button title="Cancelar" onPress={handleCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  addButton: {
    backgroundColor: '#00826B',
    borderColor: '#00826B',
    borderWidth: 1,
  },
  pendingButton: {
    backgroundColor: '#FFC107',
    borderColor: '#FFC107',
    borderWidth: 1,
  },
  removeButton: {
    backgroundColor: '#fff',
    borderColor: '#dbdbdb',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addText: {
    color: '#fff',
  },
  pendingText: {
    color: '#262626',
  },
  removeText: {
    color: '#262626',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default BtnAgregar;