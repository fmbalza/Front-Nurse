import React, { useState, useEffect } from "react";
import MedicoNavigation from "../../../Navigation/MedicoNavigation";
import ValidationModal from "../../../components/Modals/ValidationModal";
// import { View, Button } from 'react-native';
import useAuthStore from "../../../utils/storage/auth";

export default function App() {
  const { certified } = useAuthStore();

  const [modalVisible, setModalVisible] = useState(!certified);

  // useEffect(() => {
  //   console.log("certified", certified);
  // }, [certified]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <React.Fragment>
      <ValidationModal
        visible={modalVisible}
        message="This is a custom modal"
        onClose={handleCloseModal}
      />

      <MedicoNavigation />
    </React.Fragment>
  );
}
