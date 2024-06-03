import React, {useState} from 'react'
import MedicoNavigation from '../../../Navigation/MedicoNavigation';
import ValidationModal from '../../../components/Modals/ValidationModal';
import { View, Button } from 'react-native';

export default function App() {

  const [modalVisible, setModalVisible] = useState(true);


  const handleCloseModal = () => {
    setModalVisible(false);
  };  

  return (
    <React.Fragment>


        {/* <ValidationModal
          visible={modalVisible}
          message="This is a custom modal"
          onClose={handleCloseModal}
        /> */}

      <MedicoNavigation />
    </React.Fragment>
  );
}