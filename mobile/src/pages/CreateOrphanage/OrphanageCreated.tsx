import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import orphanageCreatedImg from '../../images/orphanage-created.png';

export default function OrphanageCreated() {
  const navigation = useNavigation();

  function handleConfirmClick() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Image source={orphanageCreatedImg} />

      <Text style={styles.title}>Ebaaa!</Text>

      <Text style={styles.paragraph}>
        O cadastro deu certo e foi{'\n'}
        enviado ao administrador para ser{'\n'}
        aprovado. Agora é só esperar :)
      </Text>

      <RectButton style={styles.button} onPress={handleConfirmClick}>
        <Text style={styles.buttonText}>Ok</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39CC83',
  },

  title: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 40,
    marginTop: 32,
  },

  paragraph: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    marginTop: 18,
  },

  button: {
    backgroundColor: '#19C06D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 120,
    marginTop: 24,
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
  },
});
