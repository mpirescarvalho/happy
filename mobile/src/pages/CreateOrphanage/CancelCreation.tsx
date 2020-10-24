import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function OrphanageCreated() {
  const navigation = useNavigation();

  function handleNegativeButton() {
    navigation.goBack();
  }

  function handlePositiveButton() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'OrphanagesMap' }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="close" size={32} color="#FF669D" />
      </View>

      <Text style={styles.title}>Cancelar cadastro</Text>

      <Text style={styles.paragraph}>
        Tem certeza que quer{'\n'}
        cancelar esse cadastro?
      </Text>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonOutlineContainer}>
          <RectButton
            style={[styles.button, styles.buttonOutline]}
            onPress={handleNegativeButton}
          >
            <Text style={styles.buttonText}>Não</Text>
          </RectButton>
        </View>

        <RectButton style={styles.button} onPress={handlePositiveButton}>
          <Text style={styles.buttonText}>Sim</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF669D',
  },

  iconContainer: {
    backgroundColor: '#fff',
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 40,
    marginTop: 24,
  },

  paragraph: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    marginTop: 24,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },

  button: {
    backgroundColor: '#D6487B',
    borderWidth: 1,
    borderColor: '#D6487B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 128,
  },

  buttonOutlineContainer: {
    borderWidth: 1,
    borderColor: '#D6487B',
    borderRadius: 20,
    marginEnd: 8,
  },

  buttonOutline: {
    backgroundColor: '#0000',
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
  },
});
