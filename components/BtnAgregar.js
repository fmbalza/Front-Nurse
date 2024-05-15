import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BtnAgregar = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isFollowing ? styles.followingButton : styles.followButton,
      ]}
      onPress={handleFollow}
    >
      <Text
        style={[
          styles.buttonText,
          isFollowing ? styles.followingText : styles.followText,
        ]}
      >
        {isFollowing ? 'Remover' : 'Agregar'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width:'40%'
  },
  followButton: {
    backgroundColor: '#00826B',
    borderColor: '#00826B',
    borderWidth: 1,
  },
  followingButton: {
    backgroundColor: '#fff',
    borderColor: '#dbdbdb',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  followText: {
    color: '#fff',
  },
  followingText: {
    color: '#262626',
  },
});

export default BtnAgregar;